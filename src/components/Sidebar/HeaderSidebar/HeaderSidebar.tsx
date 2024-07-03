'use client';
import { faEllipsisVertical, faMessage, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

function HeaderSidebar() {
    const { toast } = useToast();
    return (
        <div className="h-12 flex justify-between ">
            <div className="h-12 w-[25%] ml-2">
                <Avatar className="w-12 h-12 md:w-10 md:h-10 md:my-1">
                    <AvatarImage src="https://res.cloudinary.com/dyoctwffi/image/upload/v1691509569/ORGAVIVE/IMG_20210305_233004_ptwy9k.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className="bg-inherit w-[75%] flex justify-end">
                <div className="h-[34px] w-[50%] my-[7px] flex justify-evenly md:w-[70%] md:h-8 md:my-2">
                    <FontAwesomeIcon
                        className="text-lg text-text2 p-2 hover:cursor-pointer hover:text-text1 "
                        icon={faMessage}
                        onClick={() => {
                            toast({
                                description: 'Chức năng đang cập nhật!',
                            });
                        }}
                    />
                    <FontAwesomeIcon
                        className="text-lg text-text2 p-2 hover:cursor-pointer hover:text-text1 "
                        icon={faEllipsisVertical}
                        onClick={() => {
                            toast({
                                description: 'Chức năng đang cập nhật!',
                            });
                        }}
                    />
                    <FontAwesomeIcon
                        className="text-lg text-text2 p-2 hover:cursor-pointer hover:text-text1 "
                        icon={faRightFromBracket}
                    />
                </div>
            </div>
        </div>
    );
}

export default HeaderSidebar;
