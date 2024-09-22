'use client';
import { faAngleLeft, faCamera, faPen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearUser, setcurrentUserGender, setUsername } from '@/app/redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { infoUser } from '@/schemaValidations/auth.schema';

function HeaderSidebar() {
    const { currentUserId, currentUserGender } = useSelector((state: RootState) => state.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const [isOpenProfile, setIsOpenProfile] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const [infoUser, setInfoUser] = useState<infoUser | null>(null);
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState(currentUserGender);

    async function handleLogout() {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/logout`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Gửi kèm cookie
                method: 'POSt',
            });

            router.push('/login');

            // Xóa dữ liệu người dùng khỏi Redux store
            dispatch(clearUser());
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        async function handleFetchInfo() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/${currentUserId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Gửi kèm cookie
                });

                const result = await response.json();
                setInfoUser(result.data);

                if (!response.ok) {
                    throw new Error(result.message || 'Đã xảy ra lỗi');
                }
            } catch (err) {
                console.log(err);
            }
        }
        handleFetchInfo();
    }, [currentUserId, isFetch]);

    // Hàm xử lý khi người dùng chọn avatar
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            // Gọi hàm để cập nhật avatar
            handleUpdateAvatar(file);
        }
    };

    const handleUpdateAvatar = async (file: any) => {
        const formData = new FormData();
        if (file) {
            formData.append('avatar', file);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users/avatar/${currentUserId}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to send message');
            }
            setIsFetch(!isFetch);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    function handleupdateInfo() {
        const dataUpdate = {
            username: name ? name : infoUser?.username,
            dateOfBirth: dateOfBirth ? dateOfBirth : infoUser?.dateOfBirth,
            gender: gender ? gender : infoUser?.gender,
        };
        async function FetchUpdateInfo() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/profile/${currentUserId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include', // Gửi kèm cookie
                        method: 'PUT',
                        body: JSON.stringify(dataUpdate),
                    },
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Đã xảy ra lỗi');
                }
            } catch (err) {
                console.log(err);
            }
        }
        FetchUpdateInfo();
        dispatch(setUsername(dataUpdate.username || ''));
        dispatch(setcurrentUserGender(dataUpdate.gender || 'khac'));
        setIsOpenProfile(false);
        setIsFetch(!isFetch);
    }

    return (
        <div className="h-12 flex justify-between ">
            <div className=" flex h-12 w-[60%] ml-2">
                <div className="mx-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="w-12 h-12 md:w-10 md:h-10 md:my-1">
                                <AvatarImage src={infoUser?.avatarUrl} />
                                <AvatarFallback>{infoUser?.username}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="ml-[70px] w-[250px]">
                            <DropdownMenuLabel className="h-9 text-base">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            {/*  */}
                            <div className="w-full cursor-pointer h-9 text-sm ">
                                <Dialog>
                                    <DialogTrigger className="justify-start" asChild>
                                        <Button
                                            onClick={() => setIsOpenProfile(false)}
                                            className="w-full font-normal px-2"
                                            variant="ghost"
                                        >
                                            Hồ sơ của bạn
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-white overflow-hidden">
                                        <DialogHeader>
                                            <DialogTitle>Thông tin tài khoản</DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                        <DropdownMenuSeparator />

                                        {/* avatar */}
                                        <div className="flex h-16 leading-[64px]">
                                            <div className="flex relative">
                                                <Avatar className="w-16 h-16 ">
                                                    <AvatarImage src={infoUser?.avatarUrl} />
                                                    <AvatarFallback>{infoUser?.username}</AvatarFallback>
                                                </Avatar>

                                                <div className="bg-text5 w-7 h-7 absolute bottom-0 right-0 rounded-[50%] hover:cursor-pointer hover:bg-text4">
                                                    <div className="grid w-full max-w-sm items-center gap-1.5 ">
                                                        <Label htmlFor="picture">
                                                            <FontAwesomeIcon
                                                                className="text-text2 text-sm absolute left-0 top-0 translate-x-1/2 translate-y-1/2"
                                                                icon={faCamera}
                                                            />
                                                        </Label>
                                                        <Input
                                                            className="hidden"
                                                            id="picture"
                                                            type="file"
                                                            accept="image/*" // Chỉ chấp nhận file ảnh
                                                            onChange={handleFileChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex ml-4">
                                                <h3 className="text-lg font-medium leading-[64px]">
                                                    {infoUser?.username}
                                                </h3>
                                                <div
                                                    className="hover:cursor-pointer"
                                                    onClick={() => setIsOpenProfile(true)}
                                                >
                                                    <FontAwesomeIcon className="text-sm ml-2 text-text2" icon={faPen} />
                                                </div>
                                            </div>
                                        </div>

                                        <DropdownMenuSeparator className="h-[2px]" />
                                        {/* thoong tin */}
                                        <div className="grid gap-2">
                                            <h3 className="text-base font-medium ">Thông tin cá nhân</h3>
                                            <div>
                                                <div className="flex mt-2 h-6">
                                                    <p className="w-[100px] text-sm text-text2">Giới tính</p>
                                                    <p className="flex-1 text-sm text-text1">{infoUser?.gender}</p>
                                                </div>
                                                <div className="flex mt-2 h-6">
                                                    <p className="w-[100px] text-sm text-text2">Ngày sinh</p>
                                                    <p className="flex-1 text-sm text-text1">{infoUser?.dateOfBirth}</p>
                                                </div>
                                                <div className="flex mt-2 h-6">
                                                    <p className="w-[100px] text-sm text-text2">Email</p>
                                                    <p className="flex-1 text-sm text-text1">{infoUser?.email}</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-text2">
                                                Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem được số này
                                            </p>
                                        </div>
                                        <DropdownMenuSeparator className="h-[2px]" />

                                        {/* cap nhat */}
                                        <div className="w-full my-[-10px]">
                                            <Button
                                                onClick={() => setIsOpenProfile(true)}
                                                variant="ghost"
                                                className="w-full text-center leading-[40px]"
                                            >
                                                <div className="flex">
                                                    <div>
                                                        <FontAwesomeIcon className="text-sm text-text2" icon={faPen} />
                                                    </div>
                                                    <h4 className="text-base font-medium ml-2 leading-[40px]">
                                                        Cập nhật
                                                    </h4>
                                                </div>
                                            </Button>
                                        </div>

                                        <div
                                            className={`bg-white absolute w-full h-full top-0 right-0 transition-transform duration-500 ${
                                                isOpenProfile ? 'translate-x-0' : 'translate-x-full'
                                            }`}
                                        >
                                            <div className="px-5 py-1">
                                                {/*  */}
                                                <div className="flex h-10 leading-[40px] ">
                                                    <div
                                                        onClick={() => setIsOpenProfile(false)}
                                                        className="w-7 my-1  hover:cursor-pointer"
                                                    >
                                                        <div className="h-6 mt-[-2px]">
                                                            <FontAwesomeIcon
                                                                className="text-lg text-text3 hover:text-text1"
                                                                icon={faAngleLeft}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="ml-2 h-full leading-[40px]">
                                                        <h3 className="font-medium text-base leading-[40px] ">
                                                            Cập nhật thông tin cá nhân
                                                        </h3>
                                                    </div>
                                                </div>
                                                {/*  */}
                                                <div className="border-2 "></div>
                                                <div className="my-2">
                                                    <h4 className="text-sm">Tên hiển thị</h4>
                                                    <input
                                                        className="w-full my-2 h-9 px-3 border border-text3 rounded-sm"
                                                        placeholder={infoUser?.username}
                                                        type="text"
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>

                                                <div className="my-2 mt-5">
                                                    <h4 className="text-sm">Thông tin cá nhân</h4>

                                                    <div className="flex gap-10 mt-1">
                                                        {/* Option for Male */}
                                                        <div className="inline-flex items-center">
                                                            <label
                                                                className="relative flex items-center cursor-pointer"
                                                                htmlFor="male"
                                                            >
                                                                <input
                                                                    name="gender"
                                                                    type="radio"
                                                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                                                                    id="male"
                                                                    checked={gender === 'nam'} // So sánh giá trị với state gender
                                                                    onChange={() => setGender('nam')} // Cập nhật state khi chọn Nam
                                                                />
                                                                <span className="absolute bg-blue-800 w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                                            </label>
                                                            <label
                                                                className="ml-2 text-slate-600 cursor-pointer text-sm"
                                                                htmlFor="male"
                                                            >
                                                                Nam
                                                            </label>
                                                        </div>

                                                        {/* Option for Female */}
                                                        <div className="inline-flex items-center">
                                                            <label
                                                                className="relative flex items-center cursor-pointer"
                                                                htmlFor="female"
                                                            >
                                                                <input
                                                                    name="gender"
                                                                    type="radio"
                                                                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                                                                    id="female"
                                                                    checked={gender === 'nu'} // So sánh giá trị với state gender
                                                                    onChange={() => setGender('nu')} // Cập nhật state khi chọn Nữ
                                                                />
                                                                <span className="absolute bg-blue-800 w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                                            </label>
                                                            <label
                                                                className="ml-2 text-slate-600 cursor-pointer text-sm"
                                                                htmlFor="female"
                                                            >
                                                                Nữ
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/*  */}
                                                    <div className="mt-5">
                                                        <div className="my-2">
                                                            <h4 className="text-sm">Ngày sinh</h4>
                                                            <div className="flex justify-between">
                                                                <input
                                                                    className="w-full my-2 h-9 px-3 border border-text3 rounded-sm"
                                                                    placeholder={infoUser?.dateOfBirth}
                                                                    type="text"
                                                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/*  */}

                                                    <div className="flex float-end absolute bottom-5 right-5">
                                                        <Button
                                                            className="mr-3 bg-text5 hover:bg-text4 text-black"
                                                            type="submit"
                                                            onClick={() => setIsOpenProfile(false)}
                                                        >
                                                            Hủy
                                                        </Button>
                                                        <Button
                                                            className="bg-[#abcdff] hover:bg-[#68a3fb]"
                                                            type="submit"
                                                            onClick={() => handleupdateInfo()}
                                                        >
                                                            Cập nhật
                                                        </Button>
                                                    </div>

                                                    {/*  */}
                                                </div>
                                            </div>
                                        </div>

                                        {/*  */}
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {/*  */}
                            <div className="w-full cursor-pointer h-9 text-sm">
                                <Dialog>
                                    <DialogTrigger className="justify-start" asChild>
                                        <Button className="w-full font-normal px-2" variant="ghost">
                                            Cài đặt
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-white overflow-hidden">
                                        <DialogHeader>
                                            <DialogTitle>Đang cập nhật...</DialogTitle>
                                            <DialogDescription></DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {/*  */}

                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer h-9 text-sm">
                                Đăng xuất
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="leading-[48px] h-12 font-medium">
                    <h2 className="leading-[48px]">{infoUser?.username}</h2>
                </div>
            </div>
            <div className="bg-inherit w-[40%] flex justify-end">
                <div className="h-[34px] w-[50%] my-[7px] md:w-[70%] md:h-8 md:my-2">
                    <FontAwesomeIcon
                        className="text-lg float-end mr-1 text-text2 p-2 hover:cursor-pointer hover:text-text1 "
                        icon={faRightFromBracket}
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </div>
    );
}

export default HeaderSidebar;
