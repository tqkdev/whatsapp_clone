'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { socket } from '@/Socket/socket';
import useDebounce from '@/hook/useDebounce';
import { useRouter } from 'next/navigation';
interface ListSearchProps {
    searchValue: string;
    setIsFocused: (isFocused: boolean) => void;
}

function ListSearch(props: ListSearchProps) {
    // const ListSearch: React.FC<ListSearchProps> = ({ searchValue, setIsFocused }) => {
    const router = useRouter();
    const [listuser, setListuser] = useState([]);
    const currentUserId = localStorage.getItem('userID');
    const currentUsername = localStorage.getItem('username');
    // const currentUserId = '7ejWpZ6IM3ElQy6Hm3WH';
    // const currentUsername = 'Quang Khai';
    const searchValue = props.searchValue;
    const debounce = useDebounce(searchValue, 700);
    const setIsFocused = props.setIsFocused;

    useEffect(() => {
        if (!debounce.trim()) {
            setListuser([]);
            return;
        }

        async function fetchListuser() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/searchuser?username=${debounce}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include', // Gửi kèm cookie
                    },
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Đã xảy ra lỗi');
                }

                setListuser(result.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchListuser();
    }, [debounce]);

    const handleSetinfo = async (user2Id: string, username2: string) => {
        const datares = {
            user1Id: currentUserId,
            user2Id: user2Id,
            username1: currentUsername,
            username2: username2,
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Gửi kèm cookie
            body: JSON.stringify(datares),
        });

        const data = await response.json();
        // Hàm xử lý sự kiện Socket.IO
        const handleNewConversation = (newConversation: any) => {
            console.log('New conversation:', newConversation);
        };

        // Lắng nghe sự kiện 'newConversation' chỉ một lần
        socket.once('newConversation', handleNewConversation);
        setIsFocused(false);
        router.push(`/conversation/${data.data.id}`);
    };

    // Cleanup listener to avoid multiple event bindings
    useEffect(() => {
        return () => {
            socket.off('newConversation');
        };
    }, []);
    return (
        <div className=" absolute h-screen flex flex-col z-[-1] top-[-4px] w-full left-0  ">
            <div className="w-full mt-[125px] bg-transparent"></div>
            <div className="overflow-y-auto  flex-grow bg-white">
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
            </div>
        </div>
    );
}

export default ListSearch;
