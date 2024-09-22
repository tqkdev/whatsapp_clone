'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { User } from '@/schemaValidations/auth.schema';

function AddFriend() {
    const [isOpenAddFriend, setIsOpenAddFriend] = useState(false);
    const [email, setEmail] = useState('');
    const [infoSearchUser, setinfoSearchUser] = useState<User | null>(null);
    const [isUserFound, setIsUserFound] = useState<boolean | null>(null);

    const { currentUserId } = useSelector((state: RootState) => state.user);

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

    return (
        <Dialog>
            <DialogTrigger>
                <div
                    onClick={() => setIsOpenAddFriend(false)}
                    className="w-full h-16 hover:cursor-pointer hover:bg-sky-600 "
                >
                    <FontAwesomeIcon
                        // className="text-2xl text-white hover:cursor-pointer hover:bg-sky-600"
                        className="text-2xl text-white p-[17px] hover:cursor-pointer "
                        icon={faUserPlus}
                    />
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
                                    <h3 className="text-lg font-medium leading-[64px]">{infoSearchUser?.username}</h3>
                                </div>
                            </div>

                            <DropdownMenuSeparator className="h-[2px]" />
                            {/* thoong tin */}
                            <div className="grid gap-2">
                                <h3 className="text-base font-medium ">Thông tin cá nhân</h3>
                                <div>
                                    <div className="flex mt-2 h-6">
                                        <p className="w-[100px] text-sm text-text2">Giới tính</p>
                                        <p className="flex-1 text-sm text-text1">{infoSearchUser?.gender}</p>
                                    </div>
                                    <div className="flex mt-2 h-6">
                                        <p className="w-[100px] text-sm text-text2">Ngày sinh</p>
                                        <p className="flex-1 text-sm text-text1">{infoSearchUser?.dateOfBirth}</p>
                                    </div>
                                    <div className="flex mt-2 h-6">
                                        <p className="w-[100px] text-sm text-text2">Email</p>
                                        <p className="flex-1 text-sm text-text1">{infoSearchUser?.email}</p>
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
                                    onClick={() => handleRequestFriend(infoSearchUser?.userId || '')}
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
    );
}

export default AddFriend;
