'use client';
import Sidebar from '@/components/Sidebar/Sidebar';
import Image from 'next/image';

export default function Home() {
    //     e.preventDefault();

    //     const response = await fetch('http://localhost:3000/api/conversation', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ user1Id, user2Id, username1, username2 }),
    //     });

    //     const data = await response.json();

    //     // Listen for socket event
    //     socket.on('newConversation', (newConversation) => {
    //         console.log('New conversation:', newConversation);
    //     });
    // };

    return (
        <div className="flex relative">
            <Sidebar />
            <div className="hidden pt-36 px-20 flex-grow h-screen md:block">
                <div>
                    <h1 className="text-center text-3xl">Chào mừng đến với Whatsapp!!!</h1>
                </div>
                <div className="flex justify-center py-10">
                    <Image
                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1720002952/ORGAVIVE/bg-appchat_wac5fq.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                </div>
            </div>
        </div>
    );
}

// 'use client';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { useEffect, useState } from 'react';
// import { socket } from '@/Socket/socket';

// export default function Home() {
//     const [listuser, setListuser] = useState([]);
//     const currentUserId = 'GoEHjfhEWMDIy90swKZC';

//     useEffect(() => {
//         async function fetchListuser() {
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 const result = await response.json();

//                 if (!response.ok) {
//                     throw new Error(result.message || 'Đã xảy ra lỗi');
//                 }

//                 setListuser(result.data);
//             } catch (err) {
//                 console.log(err);
//             }
//         }

//         fetchListuser();
//     }, []);

//     const handleSetinfo = async (user2Id: string, username2: string) => {
//         const datares = {
//             user1Id: currentUserId,
//             user2Id: user2Id,
//             username1: 'user1',
//             username2: username2,
//         };

//         console.log(datares);

//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversation`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include', // Gửi kèm cookie
//             body: JSON.stringify(datares),
//         });

//         const data = await response.json();

//         // Hàm xử lý sự kiện Socket.IO
//         const handleNewConversation = (newConversation: any) => {
//             console.log('New conversation:', newConversation);
//         };

//         // Lắng nghe sự kiện 'newConversation' chỉ một lần
//         socket.once('newConversation', handleNewConversation);
//     };

//     // Cleanup listener to avoid multiple event bindings
//     useEffect(() => {
//         return () => {
//             socket.off('newConversation');
//         };
//     }, []);

//     return (
//         <div className="flex relative">
//             <Sidebar />
//             <div className="hidden pt-36 px-20 flex-grow h-screen md:block">
//                 <div>
//                     <h1 className="text-center text-3xl">Chào mừng đến với Whatsapp!!!</h1>
//                 </div>
//                 <div>
//                     {listuser?.map((user: any) => (
//                         <div
//                             key={user.id}
//                             onClick={() => handleSetinfo(user.id, user.username)}
//                             className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100"
//                         >
//                             <div className="px-2">
//                                 <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
//                                     <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
//                                     <AvatarFallback>CN</AvatarFallback>
//                                 </Avatar>
//                             </div>
//                             <div className="w-full overflow-hidden">
//                                 <h3 className="font-medium text-lg leading-[70px] mx-2">{user.username}</h3>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }
