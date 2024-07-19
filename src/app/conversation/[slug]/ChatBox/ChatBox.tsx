'use client';
import { socket } from '@/Socket/socket';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Message {
    ConversationId: string;
    senderId: string;
    content: string;
    created_at: string;
}

function ChatBox() {
    const param = useParams();
    const conversationId = param.slug;
    const currentUserId = localStorage.getItem('userID');
    const [messages, setMessages] = useState<Message[]>([]);

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
            console.log('Sending newMessage:', newMessage);

            if (newMessage.ConversationId === conversationId) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        });

        // Cleanup listeners on component unmount
        return () => {
            socket.off('newMessage');
        };
    }, [conversationId]);

    // Function to format created_at into a readable date string
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Điều chỉnh định dạng theo nhu cầu
    };

    return (
        <div className="bg-slate-200 w-full flex-grow z-[1] overflow-y-auto">
            <div className="flex flex-col py-5">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`min-h-10 max-w-[70%] min-w-28 mx-5 my-1 p-3 rounded-2xl ${
                            message.senderId === currentUserId
                                ? 'bg-blue-500 text-white ml-auto'
                                : 'bg-gray-300 mr-auto'
                        }`}
                    >
                        <h3 className="leading-5">{message.content}</h3>
                        <p className="text-xs mt-1">{formatDate(message.created_at)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatBox;
