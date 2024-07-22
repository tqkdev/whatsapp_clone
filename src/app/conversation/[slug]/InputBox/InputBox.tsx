'use client';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

function InputBox() {
    const param = useParams();
    const [message, setMessage] = useState('');
    const conversationId = param.slug;
    // const currentUserId = localStorage.getItem('userID');
    const [currentUserId, setCurrentUserId] = useState<string>('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userId = localStorage.getItem('userID');
            setCurrentUserId(userId ?? '');
        }
    }, []);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const newMessage = {
            senderId: currentUserId,
            content: message,
            created_at: new Date().toISOString(),
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/messages/${conversationId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newMessage),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to send message');
            }

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="p-2 border-t border-gray-300 flex">
            <input
                className="p-2 w-full max-h-40 overflow-hidden border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            ></input>
            <div
                onClick={handleSendMessage}
                className="group w-10 h-10 text-center py-[7px] rounded-[50%] hover:cursor-pointer"
            >
                <FontAwesomeIcon className="text-sky-400 group-hover:text-sky-600" icon={faArrowUp} />
            </div>
        </div>
    );
}
export default InputBox;

// function InputBox() {
//     const [newMessage, setNewMessage] = useState('');
//     const textareaRef = useRef<HTMLTextAreaElement>(null);

//     useEffect(() => {
//         if (textareaRef.current) {
//             textareaRef.current.style.height = 'auto';
//             textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

//             // Ensure textarea does not exceed maximum height
//             const maxHeight = 160; // 3 rows, 32px per row
//             if (textareaRef.current.scrollHeight > maxHeight) {
//                 textareaRef.current.style.overflowY = 'auto';
//                 textareaRef.current.style.height = `${maxHeight}px`;
//             } else {
//                 textareaRef.current.style.overflowY = 'hidden';
//             }
//         }
//     }, [newMessage]);

//     const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setNewMessage(event.target.value);
//     };
//     return (
//         <div className="p-2 border-t border-gray-300 flex">
//             <textarea
//                 ref={textareaRef}
//                 className="p-2 w-full max-h-40 overflow-hidden border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
//                 rows={1}
//                 value={newMessage}
//                 onChange={handleChange}
//                 placeholder="Type your message..."
//             ></textarea>

//             <div className="group w-10 h-10 text-center py-[7px] rounded-[50%] hover:cursor-pointer">
//                 <FontAwesomeIcon className="text-sky-400 group-hover:text-sky-600" icon={faArrowUp} />
//             </div>
//         </div>
//     );
// }

// export default InputBox;
