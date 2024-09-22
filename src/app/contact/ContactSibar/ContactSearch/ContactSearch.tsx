'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

import ListSearch from './listSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faFileImage, faUserPlus, faUsers, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { ListFriend, Participant, User } from '@/schemaValidations/auth.schema';
import Loading from '@/components/Loading/Loading';

function ContactSearch() {
    const { currentUserId, currentUserName } = useSelector((state: RootState) => state.user);
    const [isFocused, setIsFocused] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
    const [listFriends, setListFriends] = useState([]);
    const [isUserFound, setIsUserFound] = useState<boolean | null>(null);
    const [email, setEmail] = useState('');
    const [infoSearchUser, setinfoSearchUser] = useState<User | null>(null);

    const [isOpenCreateGroup, setIsOpenCreateGroup] = useState(false);
    const [image, setImage] = useState<File | null>(null); // Thêm trạng thái để lưu trữ hình ảnh
    const [nameGroup, setNameGroup] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([
        {
            id: currentUserId || '',
            username: currentUserName || '',
        },
    ]);

    async function fetchSearchUser() {
        setIsUserFound(null); // Reset trạng thái tìm thấy người dùng

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/searchuser/${email}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error occurred');
            }

            const result = await response.json();
            if (result.data) {
                setinfoSearchUser(result.data); // Giả định chỉ lấy thông tin của một người dùng đầu tiên
                setIsUserFound(true); // Người dùng tìm thấy
            } else {
                setinfoSearchUser(null);
                setIsUserFound(false); // Không tìm thấy người dùng
            }
        } catch (err) {
            console.error(err);

            setIsUserFound(false); // Đặt trạng thái không tìm thấy khi có lỗi
        }
    }
    function handleAddFriend() {
        setIsOpenAddFriend(true);
        fetchSearchUser();
    }

    function handleRequestFriend(receiverId: string) {
        const dataRequest = {
            senderId: currentUserId,
            receiverId,
        };
        async function sentRequestFriend() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/friend-requests`, {
                    body: JSON.stringify(dataRequest),
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
            } catch (err) {
                console.log(err);
            }
        }
        sentRequestFriend();
        setIsOpenAddFriend(false);
    }

    async function fetchListFriends() {
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/getallfriends/${currentUserId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Gửi kèm cookie
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Đã xảy ra lỗi');
            }

            setListFriends(result.data);
            setIsLoading(false);
            setIsOpenCreateGroup(true);
            setSelectedParticipants([
                {
                    id: currentUserId || '',
                    username: currentUserName || '',
                },
            ]);
        } catch (err) {
            console.log(err);
        }
    }

    // Hàm xử lý khi checkbox thay đổi
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, listFriend: ListFriend) => {
        const { checked } = e.target;
        // Nếu checkbox được chọn
        if (checked) {
            setSelectedParticipants((prev) => [
                ...prev,
                {
                    id: listFriend.id,
                    username: listFriend.userInfo.username,
                },
            ]);
        } else {
            // Nếu checkbox bị bỏ chọn, loại bỏ participant khỏi danh sách
            setSelectedParticipants((prev) => prev.filter((participant) => participant.id !== listFriend.id));
        }
    };

    // Hàm xử lý khi nhấn nút tạo nhóm
    function handleCreateGroup() {
        const dataCreate = {
            name: nameGroup ? nameGroup : undefined,
            participant: selectedParticipants,
            createdBy: currentUserName,
        };
        const formData = new FormData();
        formData.append('name', dataCreate.name || '');
        formData.append('createdBy', dataCreate.createdBy || '');
        formData.append('participant', JSON.stringify(dataCreate.participant));

        if (image) {
            formData.append('image', image);
        }

        async function createGroup() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/createchat`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Failed to send message');
                }
                setIsOpenCreateGroup(false);
                setNameGroup('');
                setImage(null); // Reset image after sending
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
        createGroup();
    }

    return (
        <div className="border-t relative flex flex-col">
            <form className=" mx-1 my-3 h-10 ">
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
                        onChange={(e) => setsearchValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        required
                    />
                    {isFocused ? (
                        <div
                            onClick={() => setIsFocused(false)}
                            className="mx-4 leading-10 font-medium text-base hover:cursor-pointer"
                        >
                            Đóng
                        </div>
                    ) : (
                        <div className="flex ml-1">
                            <Dialog>
                                <DialogTrigger>
                                    <div
                                        onClick={() => setIsOpenAddFriend(false)}
                                        className="text-sm w-8 h-8 hover:cursor-pointer hover:bg-text4"
                                    >
                                        <FontAwesomeIcon className="text-text1 m-2" icon={faUserPlus} />
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px] h-[300px] bg-white overflow-hidden">
                                    <DialogHeader>
                                        <DialogTitle>Thêm bạn</DialogTitle>
                                        <DialogDescription>Nhập email để thêm bạn bè.</DialogDescription>
                                    </DialogHeader>

                                    <DropdownMenuSeparator className="h-[2px]" />
                                    {/* thoong tin */}
                                    <div className="my-2">
                                        <input
                                            className="w-full my-2 h-9 px-3 border border-text3 rounded-sm"
                                            placeholder="Nhập email"
                                            type="text"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <DropdownMenuSeparator className="h-[2px]" />

                                    {/*  */}
                                    <div className="w-full my-[-10px]">
                                        <div className="flex float-end absolute bottom-5 right-5">
                                            <Button
                                                onClick={() => handleAddFriend()}
                                                className="bg-[#abcdff] hover:bg-[#68a3fb]"
                                                type="submit"
                                            >
                                                Tìm kiếm
                                            </Button>
                                        </div>
                                    </div>

                                    {isUserFound === true && (
                                        <div
                                            className={`bg-white absolute w-full h-full top-0 right-0 transition-transform duration-1000 ${
                                                isOpenAddFriend ? 'translate-x-0' : 'translate-x-full'
                                            }`}
                                        >
                                            <div className="px-5 py-5">
                                                {/*  */}

                                                {/* avatar */}
                                                <div className="flex h-16 leading-[64px]">
                                                    <div className="flex relative">
                                                        <Avatar className="w-16 h-16 ">
                                                            <AvatarImage src={infoSearchUser?.avatarUrl} />
                                                            <AvatarFallback>{infoSearchUser?.username}</AvatarFallback>
                                                        </Avatar>
                                                    </div>
                                                    <div className="flex ml-4">
                                                        <h3 className="text-lg font-medium leading-[64px]">
                                                            {infoSearchUser?.username}
                                                        </h3>
                                                    </div>
                                                </div>

                                                <DropdownMenuSeparator className="h-[2px]" />
                                                {/* thoong tin */}
                                                <div className="grid gap-2">
                                                    <h3 className="text-base font-medium ">Thông tin cá nhân</h3>
                                                    <div>
                                                        <div className="flex mt-2 h-6">
                                                            <p className="w-[100px] text-sm text-text2">Giới tính</p>
                                                            <p className="flex-1 text-sm text-text1">
                                                                {infoSearchUser?.gender}
                                                            </p>
                                                        </div>
                                                        <div className="flex mt-2 h-6">
                                                            <p className="w-[100px] text-sm text-text2">Ngày sinh</p>
                                                            <p className="flex-1 text-sm text-text1">
                                                                {infoSearchUser?.dateOfBirth}
                                                            </p>
                                                        </div>
                                                        <div className="flex mt-2 h-6">
                                                            <p className="w-[100px] text-sm text-text2">Email</p>
                                                            <p className="flex-1 text-sm text-text1">
                                                                {infoSearchUser?.email}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* button */}
                                                <div className="flex float-end absolute bottom-5 right-5">
                                                    <Button
                                                        className="mr-3 bg-text5 hover:bg-text4 text-black"
                                                        type="submit"
                                                        onClick={() => setIsOpenAddFriend(false)}
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button
                                                        onClick={() =>
                                                            handleRequestFriend(infoSearchUser?.userId || '')
                                                        }
                                                        className="bg-[#abcdff] hover:bg-[#68a3fb]"
                                                        type="submit"
                                                    >
                                                        Kết bạn
                                                    </Button>
                                                </div>

                                                {/*  */}
                                            </div>
                                        </div>
                                    )}
                                    {isUserFound === false && (
                                        <div className="absolute bottom-[70px] right-0 w-full text-center animate-fadeOut">
                                            <p className=" h-[30px] leading-[30px] bg-slate-600 text-white text-sm inline px-2 py-1 rounded-lg">
                                                Không tìm thấy người dùng
                                            </p>
                                        </div>
                                    )}

                                    {/*  */}
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger className="justify-start" asChild>
                                    <div className="text-sm w-8 h-8 mt-1  hover:cursor-pointer hover:bg-text4">
                                        <FontAwesomeIcon
                                            onClick={() => fetchListFriends()}
                                            className="text-text1 m-2"
                                            icon={faUsers}
                                        />
                                    </div>
                                </DialogTrigger>
                                {isOpenCreateGroup && (
                                    <DialogContent className="sm:max-w-[425px] h-screen bg-white">
                                        {/*  */}
                                        <div className=" flex flex-col h-screen-form">
                                            <div className="my-2">
                                                <DialogHeader>
                                                    <DialogTitle>Tạo nhóm</DialogTitle>
                                                    <DialogDescription></DialogDescription>
                                                </DialogHeader>
                                            </div>
                                            <div className="flex mt-3 py-2 relative">
                                                <div className="bg-text5 relative w-12 h-12 rounded-[50%] hover:cursor-pointer hover:bg-text4">
                                                    <Label
                                                        className=" w-12 h-12 absolute left-0 top-0 hover:cursor-pointer"
                                                        htmlFor="picture"
                                                    >
                                                        <FontAwesomeIcon
                                                            className="text-text2 text-lg absolute left-0 top-0  translate-x-[80%] translate-y-[80%] "
                                                            icon={faCamera}
                                                        />
                                                    </Label>
                                                    <Input
                                                        className="hidden"
                                                        id="picture"
                                                        type="file"
                                                        accept="image/*" // Chỉ chấp nhận hình ảnh
                                                        onChange={(e) => {
                                                            if (e.target.files) {
                                                                setImage(e.target.files[0]); // Lưu tệp hình ảnh vào trạng thái
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {image && (
                                                    <div className="flex justify-between  w-full absolute bottom-[-22px] bg-[#d1d5db]">
                                                        <div className="flex overflow-hidden">
                                                            <div className="pl-2">
                                                                <FontAwesomeIcon
                                                                    className="text-text2"
                                                                    icon={faFileImage}
                                                                />
                                                            </div>
                                                            <p className="py-1 ml-1 text-sm font-medium text-nowrap">
                                                                {image.name}
                                                            </p>
                                                        </div>

                                                        <div
                                                            onClick={() => setImage(null)}
                                                            className="px-2 hover:cursor-pointer"
                                                        >
                                                            <FontAwesomeIcon className="text-text2" icon={faXmark} />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className=" px-3 flex-1">
                                                    <input
                                                        className="w-full  px-3 my-2 h-9 border-b border-[#cdcdcd]"
                                                        placeholder="Nhập tên nhóm"
                                                        type="text"
                                                        onChange={(e) => setNameGroup(e.target.value)}
                                                    />
                                                </div>
                                            </div>

                                            <div className="bg-text5 mb-2 mt-8 relative font-medium text-sm flex-1 overflow-y-auto ">
                                                {/* QK1 */}

                                                {/*  */}
                                                {IsLoading && <Loading />}
                                                {/*  */}
                                                {listFriends?.map((listFriend: any) => (
                                                    <label
                                                        key={listFriend?.id}
                                                        className="h-[70px] border-t flex hover:cursor-pointer hover:bg-slate-100"
                                                    >
                                                        <div className="px-2 flex items-center">
                                                            <input
                                                                onChange={(e) => handleCheckboxChange(e, listFriend)}
                                                                type="checkbox"
                                                                className="mr-2 "
                                                            />
                                                            <Avatar className="w-12 h-12 my-[11px] md:w-10 md:h-10 md:my-[15px]">
                                                                <AvatarImage src={listFriend.userInfo?.avatarUrl} />
                                                                <AvatarFallback>
                                                                    {listFriend.userInfo?.username}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="w-full overflow-hidden">
                                                            <h3 className="font-medium text-sm leading-[70px] mx-2">
                                                                {listFriend.userInfo?.username}
                                                            </h3>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>

                                            {/*  */}

                                            <div className="flex my-3 justify-end">
                                                <Button
                                                    onClick={() => handleCreateGroup()}
                                                    className="bg-[#abcdff] hover:bg-[#68a3fb]"
                                                    type="submit"
                                                >
                                                    Tạo nhóm
                                                </Button>
                                            </div>
                                        </div>
                                        {/*  */}
                                    </DialogContent>
                                )}
                            </Dialog>
                        </div>
                    )}
                </div>
                {isFocused && <ListSearch searchValue={searchValue} />}
            </form>
        </div>
    );
}

export default ContactSearch;
