'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { socket } from '@/Socket/socket';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Participant {
    id: string;
    username: string;
}

interface Conversation {
    id: string;
    participants: Participant[];
    messages: any[];
}

function SidebarListConversation() {
    // const currentUserId = localStorage.getItem('userID');
    const currentUserId = 'GoEHjfhEWMDIy90swKZC';
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversations`, {
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
            {listConversation?.map((conversation: any) => (
                <Link
                    key={conversation.id}
                    href={`/conversation/${conversation.id}`}
                    className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100"
                >
                    <div className="px-2">
                        <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
                            <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1721403257/ORGAVIVE/avt_tpgoie.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="w-full overflow-hidden">
                        <h3 className="font-medium text-lg leading-[70px] mx-2">
                            {conversation.participants
                                .filter((participant: any) => participant.id !== currentUserId)
                                .map((participant: any) => participant.username)
                                .join(', ')}
                        </h3>
                    </div>
                </Link>
            ))}
        </ScrollArea>
    );
}

export default SidebarListConversation;

// // 'use client';
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { ScrollArea } from '@/components/ui/scroll-area';
// // import Link from 'next/link';
// // import { useEffect, useState } from 'react';

// // function SidebarListConversation() {
// //     const [listConversation, setListConversation] = useState([]);

// //     useEffect(() => {
// //         async function fetchListConversation() {
// //             try {
// //                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversations`, {
// //                     headers: {
// //                         'Content-Type': 'application/json',
// //                     },
// //                     credentials: 'include', // Gửi kèm cookie
// //                 });

// //                 const result = await response.json();

// //                 if (!response.ok) {
// //                     throw new Error(result.message || 'Đã xảy ra lỗi');
// //                 }

// //                 setListConversation(result.data);
// //             } catch (err) {
// //                 console.log(err);
// //             }
// //         }

// //         fetchListConversation();
// //     }, []);
// //     const currentUserId = 'GoEHjfhEWMDIy90swKZC';

// //     return (
// //         <ScrollArea>
// //             <Link href={'/conversation/abc'} className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </Link>
// //             {listConversation?.map((conversation: any) => (
// //                 <Link
// //                     key={conversation.id}
// //                     href={`/conversation/${conversation.id}`}
// //                     className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100"
// //                 >
// //                     <div className="px-2 ">
// //                         <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                             <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                             <AvatarFallback>CN</AvatarFallback>
// //                         </Avatar>
// //                     </div>
// //                     <div className="w-full  overflow-hidden">
// //                         <h3 className="font-medium text-lg leading-[70px] mx-2">
// //                             {conversation.participants
// //                                 .filter((participant: any) => participant.id !== currentUserId)
// //                                 .map((participant: any) => participant.username)
// //                                 .join(', ')}
// //                         </h3>
// //                     </div>
// //                 </Link>
// //             ))}
// //             {/* <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div>
// //             <div className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100">
// //                 <div className="px-2 ">
// //                     <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
// //                         <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
// //                         <AvatarFallback>CN</AvatarFallback>
// //                     </Avatar>
// //                 </div>
// //                 <div className="w-full  overflow-hidden">
// //                     <h3 className="font-medium text-lg leading-[70px] mx-2 ">Quang Khải</h3>
// //                 </div>
// //             </div> */}
// //         </ScrollArea>
// //     );
// // }

// // export default SidebarListConversation;

// 'use client';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { socket } from '@/Socket/socket';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// interface Participant {
//     id: string;
//     username: string;
// }

// interface Conversation {
//     id: string;
//     participants: Participant[];
//     messages: any[];
// }

// function SidebarListConversation() {
//     const [listConversation, setListConversation] = useState<Conversation[]>([]);
//     const currentUserId = 'GoEHjfhEWMDIy90swKZC';

//     // useEffect(() => {
//     //     async function fetchListConversation() {
//     //         try {
//     //             const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversations`, {
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                 },
//     //                 credentials: 'include', // Gửi kèm cookie
//     //             });

//     //             const result = await response.json();

//     //             if (!response.ok) {
//     //                 throw new Error(result.message || 'Đã xảy ra lỗi');
//     //             }

//     //             setListConversation(result.data);
//     //         } catch (err) {
//     //             console.log(err);
//     //         }
//     //     }

//     //     fetchListConversation();

//     //     // Lắng nghe sự kiện 'newConversation' từ socket.io
//     //     socket.on('newConversation', (newConversation) => {
//     //         setListConversation((prevList) => [...prevList, newConversation]);
//     //     });

//     //     return () => {
//     //         socket.off('newConversation');
//     //     };
//     // }, []);

//     // useEffect(() => {
//     //     // Listen for the 'userCreated' event
//     //     socket.on('newConversation', (newConversation) => {
//     //         setListConversation((prevList) => [...prevList, newConversation]);
//     //     });

//     //     // Cleanup on unmount
//     //     return () => {
//     //         socket.off('newConversation');
//     //     };
//     // }, []);

//     useEffect(() => {
//         // Listen for the 'allConversations' event
//         socket.on('allConversations', (conversations) => {
//             setListConversation(conversations);
//         });

//         async function fetchListConversation() {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversations`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     credentials: 'include', // Gửi kèm cookie
//                 });

//                 const result = await response.json();

//                 if (!response.ok) {
//                     throw new Error(result.message || 'Đã xảy ra lỗi');
//                 }

//                 setListConversation(result.data);
//             } catch (err) {
//                 console.log(err);
//             }
//         }

//         fetchListConversation();
//         return () => {
//             socket.off('allConversations');
//         };
//     }, []);

//     return (
//         <ScrollArea>
//             {listConversation?.map((conversation: any) => (
//                 <Link
//                     key={conversation.id}
//                     href={`/conversation/${conversation.id}`}
//                     className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100"
//                 >
//                     <div className="px-2">
//                         <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
//                             <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
//                             <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                     </div>
//                     <div className="w-full overflow-hidden">
//                         <h3 className="font-medium text-lg leading-[70px] mx-2">
//                             {conversation.participants
//                                 .filter((participant: any) => participant.id !== currentUserId)
//                                 .map((participant: any) => participant.username)
//                                 .join(', ')}
//                         </h3>
//                     </div>
//                 </Link>
//             ))}
//         </ScrollArea>
//     );
// }

// export default SidebarListConversation;
