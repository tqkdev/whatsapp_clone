'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import useDebounce from '@/hook/useDebounce';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import Link from 'next/link';
import Loading from '@/components/Loading/Loading';
interface ListSearchProps {
    searchValue: string;
}

function ListSearch(props: ListSearchProps) {
    const [listuser, setListuser] = useState([]);
    const { currentUserId } = useSelector((state: RootState) => state.user);
    const [IsLoading, setIsLoading] = useState(false);
    const searchValue = props.searchValue;
    const debounce = useDebounce(searchValue, 700);

    useEffect(() => {
        if (!debounce.trim()) {
            setListuser([]);
            return;
        }

        async function fetchListuser() {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/chats/search/${currentUserId}/${debounce}`,
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
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        fetchListuser();
    }, [debounce, currentUserId]);
    return (
        <div className="h-screen-input mt-[10px] bg-white">
            <div className="overflow-y-auto h-full flex-grow relative">
                {/*  */}
                {IsLoading && <Loading />}

                {/*  */}

                {listuser?.map((conversation: any) => {
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

                {/*  */}
            </div>
        </div>
    );
}

export default ListSearch;
