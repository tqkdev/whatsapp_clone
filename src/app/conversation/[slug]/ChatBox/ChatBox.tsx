'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { socket } from '@/Socket/socket';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { Message } from '@/schemaValidations/auth.schema';

function ChatBox() {
    const param = useParams();
    const conversationId = param.slug;
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentUserId2, setCurrentUserId2] = useState<string>('');
    const previousSenderIdRef = useRef<string | null>(null);
    const { currentUserId } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUserId2(currentUserId ?? '');
        }
    }, [currentUserId]);

    useEffect(() => {
        // Join the conversation room
        socket.emit('joinConversation', conversationId);

        // Fetch initial messages
        async function fetchMessages() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/messages/${conversationId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || 'Error occurred');
                }

                setMessages(result.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchMessages();

        // Listen for new messages
        socket.on('newMessage', (newMessage: Message) => {
            if (newMessage.ChatId === conversationId) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });

        // Cleanup listeners on component unmount
        return () => {
            socket.off('newMessage');
        };
    }, [conversationId]);

    // Function to format created_at into a readable date string
    const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000); // Chuyển đổi timestamp Firestore thành Date
        return date.toLocaleString(); // Điều chỉnh định dạng theo nhu cầu, ví dụ: 'en-US' hoặc 'vi-VN'
    };

    return (
        <div className="bg-slate-200 w-full flex-grow z-[1] overflow-y-auto">
            <div className="flex flex-col py-5">
                {messages.map((message, index) => {
                    const showAvatar =
                        message.senderId !== previousSenderIdRef.current && message.senderId !== currentUserId2;
                    const isCurrentUser = message.senderId === currentUserId2;
                    previousSenderIdRef.current = message.senderId;

                    return (
                        <div
                            key={index}
                            className={`flex items-start my-1 mx-5 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
                        >
                            {/* Avatar */}
                            {showAvatar && !isCurrentUser && (
                                <Dialog>
                                    <DialogTrigger className="justify-start" asChild>
                                        <Button className="w-8 h-8 font-normal hover:bg-transparent" variant="ghost">
                                            <Avatar className="w-8 h-8 ml-[-20px]">
                                                <AvatarImage
                                                    src={message?.senderInfo?.userInfo?.avatarUrl}
                                                    alt={message?.senderInfo?.userInfo?.username}
                                                />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-white overflow-hidden">
                                        <DialogHeader>
                                            <DialogTitle>Thông tin tài khoản</DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <DropdownMenuSeparator />

                                        {/* avatar */}
                                        <div className="flex h-16 leading-[64px]">
                                            <div className="flex relative">
                                                <Avatar className="w-16 h-16 ">
                                                    <AvatarImage src={message?.senderInfo?.userInfo?.avatarUrl} />
                                                    <AvatarFallback>
                                                        {message?.senderInfo?.userInfo?.username}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="flex ml-4">
                                                <h3 className="text-lg font-medium leading-[64px]">
                                                    {message?.senderInfo?.userInfo?.username}
                                                </h3>
                                            </div>
                                        </div>

                                        <DropdownMenuSeparator className="h-[2px]" />
                                        {/* thoong tin */}
                                        <div className="grid gap-2">
                                            <h3 className="text-base font-medium ">Thông tin cá nhân</h3>
                                            <div>
                                                <div className="flex mt-2 h-6">
                                                    <p className="w-[100px] text-sm text-text2">Giới tính</p>
                                                    <p className="flex-1 text-sm text-text1">
                                                        {message?.senderInfo?.userInfo?.gender}
                                                    </p>
                                                </div>
                                                <div className="flex mt-2 h-6">
                                                    <p className="w-[100px] text-sm text-text2">Ngày sinh</p>
                                                    <p className="flex-1 text-sm text-text1">
                                                        &#8226;&#8226;/&#8226;&#8226;/&#8226;&#8226;&#8226;&#8226;
                                                    </p>
                                                </div>
                                                <div className="flex mt-2 h-6">
                                                    <p className="w-[100px] text-sm text-text2">Email</p>
                                                    <p className="flex-1 text-sm text-text1">
                                                        &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/*  */}
                                    </DialogContent>
                                </Dialog>
                            )}

                            {/* Tin nhắn */}
                            <div
                                className={`min-h-10 ml-1 max-w-[70%] min-w-28 p-3 rounded-2xl ${
                                    isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-300'
                                } ${!showAvatar && !isCurrentUser ? 'ml-8' : ''}`} // Thêm khoảng cách nếu không có avatar
                            >
                                {message.content && <h3 className="leading-5 break-words">{message.content}</h3>}

                                {message.imageUrl && (
                                    <div
                                        className=" bg-white mt-2" // Thêm khoảng cách nếu không có avatar
                                    >
                                        <Image
                                            src={message.imageUrl}
                                            width={300}
                                            height={300}
                                            alt="Picture of the author"
                                        />
                                    </div>
                                )}
                                <p className="text-xs mt-2">{formatDate(message.created_at)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ChatBox;
