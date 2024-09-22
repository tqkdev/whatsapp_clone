'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { UserRequest } from '@/schemaValidations/auth.schema';
import Loading from '@/components/Loading/Loading';

function RequestFriend() {
    const [infoSearchUsers, setinfoSearchUsers] = useState<UserRequest[]>([]);
    const [reload, setReload] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);
    const { currentUserId, currentUserName } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        async function fetchMessages() {
            setIsLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/friend-requests/${currentUserId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                    },
                );

                if (!response.ok) {
                    throw new Error('Error occurred');
                }

                const result = await response.json();
                setinfoSearchUsers(result.data);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
            }
        }

        fetchMessages();
    }, [currentUserId, reload]);

    function handleAcceptFriend(sendername: string, senderId: string, requestId: string) {
        const dataRequest = {
            Idreceiver: currentUserId, // người nhận = user hiện tại đang dùng
            participant: [
                {
                    id: currentUserId,
                    username: currentUserName,
                },
                {
                    id: senderId,
                    username: sendername,
                },
            ],
        };

        async function acceptFriendRequest() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/friend-requests/accept/${requestId}`,
                    {
                        body: JSON.stringify(dataRequest),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        method: 'POST',
                        credentials: 'include', // Gửi kèm cookie
                    },
                );

                const result = await response.json();
                setReload(!reload);

                if (!response.ok) {
                    throw new Error(result.message || 'Đã xảy ra lỗi');
                }
            } catch (err) {
                console.log(err);
            }
        }
        acceptFriendRequest();
    }

    return (
        <div className=" px-3 rounded flex justify-between flex-wrap relative">
            {IsLoading && <Loading />}
            {infoSearchUsers?.map((infoSearchUser: any) => (
                <div
                    key={infoSearchUser.requestId}
                    className="w-full sm:w-[45%] bg-white p-4 rounded-lg cursor-pointer m-2"
                >
                    <div className="flex p-1">
                        <div>
                            {/*  */}

                            <Dialog>
                                <DialogTrigger className="justify-start" asChild>
                                    <Button className="px-0 font-normal h-12 hover:bg-transparent" variant="ghost">
                                        <Avatar className="w-12 h-12 ">
                                            <AvatarImage src={infoSearchUser.senderInfo.userInfo.avatarUrl} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
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
                                                <AvatarImage src={infoSearchUser.senderInfo.userInfo.avatarUrl} />
                                                <AvatarFallback>
                                                    {infoSearchUser.senderInfo.userInfo.username}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="flex ml-4">
                                            <h3 className="text-lg font-medium leading-[64px]">
                                                {infoSearchUser.senderInfo.userInfo.username}
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
                                                    {infoSearchUser.senderInfo.userInfo.gender}
                                                </p>
                                            </div>
                                            <div className="flex mt-2 h-6">
                                                <p className="w-[100px] text-sm text-text2">Ngày sinh</p>
                                                <p className="flex-1 text-sm text-text1">
                                                    &#8226;&#8226;/&#8226;&#8226;/&#8226;&#8226;&#8226;&#8226;
                                                </p>
                                            </div>
                                            <div className="flex mt-2 h-6">
                                                <p className="w-[100px] text-sm text-text2">Email</p>
                                                <p className="flex-1 text-sm text-text1">
                                                    &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/*  */}
                                </DialogContent>
                            </Dialog>

                            {/*  */}
                        </div>
                        <div className="ml-4 ">
                            <h3 className="font-semibold text-base mt-1">
                                {infoSearchUser.senderInfo.userInfo.username}
                            </h3>
                            <p className="font-semibold text-[12px] text-text3 ">10p trước</p>
                        </div>
                    </div>
                    <div className="my-3 p-3 bg-text5 rounded border text-text1">
                        <p>Xin chào, mình là {infoSearchUser.senderInfo.userInfo.username}. Kết bạn với mình nhé!</p>
                    </div>
                    <div className="flex justify-between">
                        <Button className="w-[45%]" variant="outline">
                            Từ chối
                        </Button>
                        <Button
                            onClick={() =>
                                handleAcceptFriend(
                                    infoSearchUser.senderInfo.userInfo.username,
                                    infoSearchUser.senderId,
                                    infoSearchUser.requestId,
                                )
                            }
                            className="w-[45%] bg-[#e5efff] text-[#005ae0] hover:bg-[#c7e0ff]"
                            variant="outline"
                        >
                            Đồng ý
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RequestFriend;
