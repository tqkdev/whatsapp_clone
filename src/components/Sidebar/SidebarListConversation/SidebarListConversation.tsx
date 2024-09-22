'use client';
import { RootState } from '@/app/redux/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Conversation } from '@/schemaValidations/auth.schema';
import { socket } from '@/Socket/socket';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function SidebarListConversation() {
    const { currentUserId } = useSelector((state: RootState) => state.user);
    const [listConversation, setListConversation] = useState<Conversation[]>([]);

    useEffect(() => {
        if (currentUserId) {
            socket.emit('setUserId', currentUserId);
        }

        // Listen for the 'allConversations' event
        socket.on('allConversations', (conversations) => {
            setListConversation(conversations);
        });

        // Listen for the 'newConversation' event
        socket.on('newConversation', (newConversation) => {
            setListConversation((prev) => [...prev, newConversation]);
        });

        async function fetchListConversation() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/chats`, {
                    body: JSON.stringify({ userId: currentUserId }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    credentials: 'include', // Gửi kèm cookie
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Đã xảy ra lỗi');
                }

                setListConversation(result.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchListConversation();

        return () => {
            socket.off('allConversations');
            socket.off('newConversation');
        };
    }, [currentUserId]);

    return (
        <ScrollArea>
            {listConversation?.map((conversation: any) => {
                const participants = conversation.participants;

                // Ưu tiên hiển thị tên
                const displayName =
                    conversation.name ||
                    participants
                        .filter((participant: any) => participant.id !== currentUserId)
                        .map((participant: any) => participant.userInfo?.username)
                        .join(', ');

                // Ưu tiên hiển thị ảnh
                const displayAvatar =
                    conversation.avatarUrl ||
                    participants
                        .filter((participant: any) => participant.id !== currentUserId)
                        .map((participant: any) => participant.userInfo?.avatarUrl)
                        .join(', ');

                return (
                    <Link
                        key={conversation.id}
                        href={`/conversation/${conversation.id}`}
                        className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100"
                    >
                        <div className="px-2">
                            <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
                                <AvatarImage src={displayAvatar} />
                                <AvatarFallback>{displayName}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="w-full overflow-hidden">
                            <h3 className="font-medium text-lg leading-[70px] mx-2">{displayName}</h3>
                        </div>
                    </Link>
                );
            })}
        </ScrollArea>
    );
}

export default SidebarListConversation;
