'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faAngleLeft, faChalkboard, faTag, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
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
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import { Chat } from '@/schemaValidations/auth.schema';

function HeaderChat() {
    const { toast } = useToast();
    const param = useParams();
    const [dataChat, setDataChat] = useState<Chat | null>(null);
    const { currentUserId } = useSelector((state: RootState) => state.user);
    const conversationId = param.slug;

    useEffect(() => {
        async function fetchListConversation() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/chatid/${conversationId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    credentials: 'include', // Gửi kèm cookie
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Đã xảy ra lỗi');
                }

                setDataChat(result.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchListConversation();
    }, [conversationId]);

    // Xử lý tên nhóm
    const displayName =
        dataChat?.name ||
        dataChat?.participants
            .filter((participant) => participant.id !== currentUserId)
            .map((participant) => participant.userInfo?.username || participant.username)
            .join(', ');

    // Xử lý ảnh đại diện
    const displayAvatarUrl =
        dataChat?.avatarUrl ||
        dataChat?.participants.find((participant) => participant.id !== currentUserId)?.userInfo.avatarUrl ||
        undefined;

    return (
        <div className="h-20 w-full bg-white ">
            <div className="flex justify-between">
                <div className="mx-3 flex">
                    <div className="flex">
                        <div className="py-[21px]">
                            <Link href={'/'} className="h-6 block md:hidden">
                                <FontAwesomeIcon className="text-2xl mt-[6px] text-text2" icon={faAngleLeft} />
                            </Link>
                        </div>

                        <Dialog>
                            <DialogTrigger className="justify-start" asChild>
                                <Button className="w-full font-normal h-[80px]" variant="ghost">
                                    <Avatar className="w-10 h-10 md:w-12 md:h-12 md:my-[16px] ">
                                        <AvatarImage src={displayAvatarUrl} />
                                        <AvatarFallback>{displayName}</AvatarFallback>
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
                                            <AvatarImage src={displayAvatarUrl} />
                                            <AvatarFallback>{displayName}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex ml-4">
                                        <h3 className="text-lg font-medium leading-[64px]">{displayName}</h3>
                                    </div>
                                </div>

                                <DropdownMenuSeparator className="h-[2px]" />
                                {/* thoong tin */}
                                <div className="grid gap-2">
                                    <h3 className="text-base font-medium ">Thông tin cá nhân</h3>
                                    <div>
                                        <div className="flex mt-2 h-6">
                                            <p className="w-[100px] text-sm text-text2">Giới tính</p>
                                            <p className="flex-1 text-sm text-text1">Nam</p>
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

                        {/* aaaaaaaaaaaaaâ */}
                    </div>

                    <div className="overflow-hidden">
                        <h3 className="font-medium text-base leading-[80px] whitespace-nowrap md:text-lg md:mx-5 md:leading-[80px]">
                            {displayName}
                        </h3>
                    </div>
                </div>

                <div className="flex mr-5 h-[42px] my-[19px]">
                    <FontAwesomeIcon
                        className="text-lg text-text3 p-3 hover:cursor-pointer hover:text-text2"
                        icon={faTag}
                        onClick={() => {
                            toast({
                                description: 'Chức năng đang cập nhật!',
                            });
                        }}
                    />
                    <FontAwesomeIcon
                        className="text-lg text-text3 p-3 hover:cursor-pointer hover:text-text2"
                        icon={faVideo}
                        onClick={() => {
                            toast({
                                description: 'Chức năng đang cập nhật!',
                            });
                        }}
                    />
                    <FontAwesomeIcon
                        className="text-lg text-text3 p-3 hover:cursor-pointer hover:text-text2"
                        icon={faChalkboard}
                        onClick={() => {
                            toast({
                                description: 'Chức năng đang cập nhật!',
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default HeaderChat;
