/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import SettingSidebar from '@/components/Sidebar/SettingSidebar/SettingSidebar';
import ContactSibar from '../../ContactSibar/ContactSibar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEllipsis, faPeopleArrows, faUserCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import useDebounce from '@/hook/useDebounce';
import Loading from '@/components/Loading/Loading';

function Group() {
    const { currentUserId } = useSelector((state: RootState) => state.user);
    const [listGroups, setListGroups] = useState([]);
    const [IsLoading, setIsLoading] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const debounce = useDebounce(searchValue, 700);

    async function fetchListConversation() {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/chatsgroup/${currentUserId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Gửi kèm cookie
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Đã xảy ra lỗi');
            }

            setListGroups(result.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchListConversation();
    }, [currentUserId]);

    useEffect(() => {
        if (!debounce.trim()) {
            fetchListConversation();
            return;
        }

        async function fetchListuser() {
            setIsLoading(true);

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/searchgroups/${currentUserId}/${debounce}`,
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

                setListGroups(result.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        fetchListuser();
    }, [debounce, currentUserId]);

    return (
        <div className="flex relative">
            <SettingSidebar />

            <div className="w-full h-screen flex md:relative">
                <ContactSibar activePage="group" />
                <div className="w-full h-full relative">
                    <div className="flex flex-col h-full">
                        <div className="px-5  border-b">
                            <div className="flex h-16 leading-[64px] ">
                                <div className="w-7 mr-3 block md:hidden">
                                    <Link href={'/contact'} className="h-6 ">
                                        <FontAwesomeIcon className="text-xl text-text1" icon={faAngleLeft} />
                                    </Link>
                                </div>
                                <div className="w-7">
                                    <FontAwesomeIcon className="text-text2 text-xl" icon={faUsers} />
                                </div>
                                <div className="ml-3 h-full ">
                                    <h3 className="font-medium text-base leading-[64px] ">
                                        Danh sách nhóm và cộng đồng
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-text5 p-5 font-medium text-sm flex-1 overflow-y-auto ">
                            <p className="pb-5 ">Nhóm và cộng đồng</p>
                            <div className="bg-white px-3 rounded">
                                {/*  */}

                                <div className="pt-2 block md:flex">
                                    <div className="flex-1">
                                        <form className=" mx-1 my-3 h-10 relative">
                                            <label
                                                htmlFor="default-search"
                                                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                            >
                                                Search
                                            </label>
                                            <div className="h-10 flex ">
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
                                                    placeholder="Tìm kiếm"
                                                    required
                                                    onChange={(e) => setsearchValue(e.target.value)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className=" mx-1 my-3">
                                        <Select>
                                            <SelectTrigger className="w-[150px]">
                                                <SelectValue placeholder="Tên &#40;A-Z&#41;" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Tên &#40;A-Z&#41;</SelectItem>
                                                <SelectItem value="dark">Tên &#40;Z-A&#41;</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/*  */}
                                {IsLoading && <Loading />}
                                {/*  */}

                                <div>
                                    {listGroups?.map((listFriend: any) => (
                                        <div
                                            key={listFriend?.id}
                                            className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100"
                                        >
                                            <div className="px-2">
                                                <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
                                                    <AvatarImage src={listFriend.avatarUrl} />
                                                    <AvatarFallback>{listFriend.name}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="w-full overflow-hidden">
                                                <h3 className="font-medium text-sm leading-[70px] mx-2">
                                                    {listFriend.name}
                                                </h3>
                                            </div>

                                            <div className="mx-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger className="w-7 h-7 my-[21px] hover:bg-[#dfe2e7]">
                                                        <FontAwesomeIcon
                                                            className="font-light text-text3"
                                                            icon={faEllipsis}
                                                        />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="mr-12 w-[180px]">
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            Xem thông tin
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem className="cursor-pointer">
                                                            Chặn người này
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600 cursor-pointer">
                                                            Xóa bạn
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/*  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Group;
