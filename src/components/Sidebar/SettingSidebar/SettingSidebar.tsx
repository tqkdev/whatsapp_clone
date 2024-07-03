'use client';

import { useToast } from '@/components/ui/use-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressBook,
    faBriefcase,
    faCloud,
    faGear,
    faMessage,
    faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';

function SettingSidebar() {
    const { toast } = useToast();
    return (
        <div className="w-[80px] flex flex-col justify-between overflow-y-auto bg-sky-500">
            <div className="flex flex-col ">
                <FontAwesomeIcon
                    className="text-2xl text-white p-5 hover:cursor-pointer bg-sky-700 hover:bg-sky-700 "
                    icon={faMessage}
                />
                <FontAwesomeIcon
                    className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                    icon={faAddressBook}
                    onClick={() => {
                        toast({
                            description: 'Chức năng đang cập nhật!',
                        });
                    }}
                />
                <FontAwesomeIcon
                    className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                    icon={faSquareCheck}
                    onClick={() => {
                        toast({
                            description: 'Chức năng đang cập nhật!',
                        });
                    }}
                />
            </div>
            <div className="flex flex-col">
                <FontAwesomeIcon
                    className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                    icon={faCloud}
                    onClick={() => {
                        toast({
                            description: 'Chức năng đang cập nhật!',
                        });
                    }}
                />
                <FontAwesomeIcon
                    className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                    icon={faBriefcase}
                    onClick={() => {
                        toast({
                            description: 'Chức năng đang cập nhật!',
                        });
                    }}
                />
                <FontAwesomeIcon
                    className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                    icon={faGear}
                    onClick={() => {
                        toast({
                            description: 'Chức năng đang cập nhật!',
                        });
                    }}
                />
            </div>
        </div>
    );
}

export default SettingSidebar;
