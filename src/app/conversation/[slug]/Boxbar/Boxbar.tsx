'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
    faAddressCard,
    faBolt,
    faEllipsis,
    faFaceSmile,
    faImage,
    faPaperclip,
    faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Boxbar() {
    const { toast } = useToast();
    return (
        <div className="h-full py-1 text-center md:text-left md:mx-4">
            <Label htmlFor="picture">
                <FontAwesomeIcon
                    className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                    icon={faImage}
                />
            </Label>
            <Input className="hidden" id="picture" type="file" />

            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faFaceSmile}
                onClick={() => {
                    toast({
                        description: 'Chức năng đang cập nhật!',
                    });
                }}
            />

            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faPaperclip}
                onClick={() => {
                    toast({
                        description: 'Chức năng đang cập nhật!',
                    });
                }}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faAddressCard}
                onClick={() => {
                    toast({
                        description: 'Chức năng đang cập nhật!',
                    });
                }}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faPenToSquare}
                onClick={() => {
                    toast({
                        description: 'Chức năng đang cập nhật!',
                    });
                }}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faBolt}
                onClick={() => {
                    toast({
                        description: 'Chức năng đang cập nhật!',
                    });
                }}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faEllipsis}
                onClick={() => {
                    toast({
                        description: 'Chức năng đang cập nhật!',
                    });
                }}
            />
        </div>
    );
}

export default Boxbar;
