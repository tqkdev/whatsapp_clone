'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faAngleLeft, faChalkboard, faTag, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

function HeaderChat() {
    const { toast } = useToast();
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
                        <Avatar className="w-10 h-10 my-5 mx-3 md:w-12 md:h-12 md:my-[16px] ">
                            <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="overflow-hidden">
                        <h3 className="font-medium text-base leading-[80px] whitespace-nowrap md:text-lg md:mx-5 md:leading-[80px]">
                            Quang Khải
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
