'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useToast } from '@/components/ui/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowUp, faChalkboard, faLink, faTag, faVideo } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';
import AutoResizeTextarea from './InputTextarea/InputTextarea';
import Boxbar from './Boxbar/Boxbar';

function Conversation() {
    const { toast } = useToast();
    const currentUserId = 1;
    const messages = [
        {
            ConversationID: 1,
            senderId: 1,
            recipientId: 2,
            message:
                'Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?',
            timestamp: '2024-01-01T10:00:00Z',
        },
        {
            ConversationID: 2,
            senderId: 2,
            recipientId: 1,
            message: 'oke',
            timestamp: '2024-01-01T10:05:00Z',
        },
        {
            ConversationID: 3,
            senderId: 1,
            recipientId: 2,
            message: 'What are you doing today?',
            timestamp: '2024-01-01T10:10:00Z',
        },
        {
            ConversationID: 4,
            senderId: 2,
            recipientId: 1,
            message: 'I am going to the park.',
            timestamp: '2024-01-01T10:15:00Z',
        },
        {
            ConversationID: 5,
            senderId: 1,
            recipientId: 2,
            message: 'That sounds fun!',
            timestamp: '2024-01-01T10:20:00Z',
        },
        {
            ConversationID: 6,
            senderId: 2,
            recipientId: 1,
            message: 'Do you want to join?',
            timestamp: '2024-01-01T10:25:00Z',
        },
        {
            ConversationID: 7,
            senderId: 1,
            recipientId: 2,
            message: 'Sure, I would love to.',
            timestamp: '2024-01-01T10:30:00Z',
        },
        {
            ConversationID: 8,
            senderId: 2,
            recipientId: 1,
            message: 'Great! See you at 3 PM.',
            timestamp: '2024-01-01T10:35:00Z',
        },
        { ConversationID: 9, senderId: 1, recipientId: 2, message: 'See you then!', timestamp: '2024-01-01T10:40:00Z' },
        { ConversationID: 10, senderId: 2, recipientId: 1, message: 'Bye for now.', timestamp: '2024-01-01T10:45:00Z' },
    ];

    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        // Thêm tin nhắn mới vào danh sách tin nhắn (cần có hàm xử lý ở đây)
        setNewMessage('');
    };
    return (
        <div className="w-full z-10 h-screen flex flex-col absolute md:relative">
            <div className="h-20 w-full bg-white ">
                <div className="flex justify-between">
                    <div className="mx-3 flex">
                        <div className="flex">
                            <div className="py-[21px]">
                                <Link href={'/'} className="h-6 block md:hidden">
                                    <FontAwesomeIcon className="text-2xl mt-[6px] text-text2" icon={faAngleLeft} />
                                </Link>
                            </div>
                            <Avatar className="w-10 h-10 my-5 mx-3 md:w-12 md:h-12 md:my-[16px] ">
                                <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="overflow-hidden">
                            <h3 className="font-medium text-base leading-[80px] whitespace-nowrap md:text-lg md:mx-5 md:leading-[80px]">
                                Quang Khải
                            </h3>
                        </div>
                    </div>

                    <div className="flex mr-5 h-[42px] my-[19px]">
                        <FontAwesomeIcon
                            className="text-lg text-text3 p-3 hover:cursor-pointer hover:text-text2"
                            icon={faTag}
                            onClick={() => {
                                toast({
                                    description: 'Chức năng đang cập nhật!',
                                });
                            }}
                        />
                        <FontAwesomeIcon
                            className="text-lg text-text3 p-3 hover:cursor-pointer hover:text-text2"
                            icon={faVideo}
                            onClick={() => {
                                toast({
                                    description: 'Chức năng đang cập nhật!',
                                });
                            }}
                        />
                        <FontAwesomeIcon
                            className="text-lg text-text3 p-3 hover:cursor-pointer hover:text-text2"
                            icon={faChalkboard}
                            onClick={() => {
                                toast({
                                    description: 'Chức năng đang cập nhật!',
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-slate-200 w-full flex-grow z-[1] overflow-y-auto">
                <div className="flex flex-col py-5">
                    {messages.map((message) => (
                        <div
                            key={message.ConversationID}
                            className={`min-h-10 max-w-[70%] min-w-28 mx-5 my-1 p-3 rounded-2xl ${
                                message.senderId === currentUserId
                                    ? 'bg-blue-500 text-white ml-auto'
                                    : 'bg-gray-300 mr-auto'
                            }`}
                        >
                            <h3 className="leading-5">{message.message}</h3>
                            <p className="text-xs mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full z-10 bg-white">
                <div className="min-h-24 max-h-56  ">
                    <div className="w-full h-10 border-b-blue-600">
                        <Boxbar />
                    </div>
                    <div className="p-2 border-t border-gray-300 flex">
                        <AutoResizeTextarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <div className="group w-10 h-10 text-center py-[7px] rounded-[50%] hover:cursor-pointer">
                            <FontAwesomeIcon className=" text-sky-400 group-hover:text-sky-600" icon={faArrowUp} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversation;
