'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { socket } from '@/Socket/socket';

function SidebarSearch() {
    // const [listuser, setListuser] = useState([]);
    // const currentUserId = 'GoEHjfhEWMDIy90swKZC';

    // useEffect(() => {
    //     async function fetchListuser() {
    //         try {
    //             const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });

    //             const result = await response.json();

    //             if (!response.ok) {
    //                 throw new Error(result.message || 'Đã xảy ra lỗi');
    //             }

    //             setListuser(result.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }

    //     fetchListuser();
    // }, []);

    // const handleSetinfo = async (user2Id: string, username2: string) => {
    //     const datares = {
    //         user1Id: currentUserId,
    //         user2Id: user2Id,
    //         username1: 'user1',
    //         username2: username2,
    //     };

    //     console.log(datares);

    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversation`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         credentials: 'include', // Gửi kèm cookie
    //         body: JSON.stringify(datares),
    //     });

    //     const data = await response.json();

    //     // Hàm xử lý sự kiện Socket.IO
    //     const handleNewConversation = (newConversation: any) => {
    //         console.log('New conversation:', newConversation);
    //     };

    //     // Lắng nghe sự kiện 'newConversation' chỉ một lần
    //     socket.once('newConversation', handleNewConversation);
    // };

    // // Cleanup listener to avoid multiple event bindings
    // useEffect(() => {
    //     return () => {
    //         socket.off('newConversation');
    //     };
    // }, []);

    return (
        <div className="border-t relative">
            <form className=" mx-1 my-3 h-10">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative h-10">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full h-10 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg"
                        placeholder="Search conversation"
                        required
                    />
                </div>
            </form>
            <div className=" w-full h-10 absolute  left-0">
                {/* <div>
                    {listuser?.map((user: any) => (
                        <div
                            key={user.id}
                            onClick={() => handleSetinfo(user.id, user.username)}
                            className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100"
                        >
                            <div className="px-2">
                                <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
                                    <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="w-full overflow-hidden">
                                <h3 className="font-medium text-lg leading-[70px] mx-2">{user.username}</h3>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}

export default SidebarSearch;
