'use client';
import {
    faAddressCard,
    faArrowUp,
    faBolt,
    faEllipsis,
    faFaceSmile,
    faFileImage,
    faImage,
    faPaperclip,
    faPenToSquare,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

function InputBox() {
    const { toast } = useToast();
    const param = useParams();
    const [message, setMessage] = useState('');
    const [image, setImage] = useState<File | null>(null); // Thêm trạng thái để lưu trữ hình ảnh
    const conversationId = param.slug;
    const { currentUserId } = useSelector((state: RootState) => state.user);

    const handleSendMessage = async () => {
        if (!message.trim() && !image) return;

        const formData = new FormData();
        formData.append('senderId', currentUserId || '');
        formData.append('content', message);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/messagesImage/${conversationId}`,
                {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                },
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to send message');
            }

            setMessage('');
            setImage(null); // Reset image after sending
        } catch (error) {
            console.error('Error sending message:', error);
            toast({
                title: 'Error',
                description: 'Failed to send message',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-24 max-h-56 relative">
            <div className="w-full h-10 border-b-blue-600">
                {image && (
                    <div className="flex justify-between  w-full absolute top-[-28px] bg-[#d1d5db]">
                        <div className="flex ">
                            <div className="pl-5">
                                <FontAwesomeIcon className="text-text2" icon={faFileImage} />
                            </div>
                            <p className="py-1 ml-1 text-sm font-medium">{image.name}</p>
                        </div>

                        <div onClick={() => setImage(null)} className="pr-5 hover:cursor-pointer">
                            <FontAwesomeIcon className="text-text2" icon={faXmark} />
                        </div>
                    </div>
                )}

                <div className="h-full py-1 text-center md:text-left md:mx-4">
                    <Label htmlFor="picture">
                        <FontAwesomeIcon
                            className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4"
                            icon={faImage}
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
            </div>
            <div className="p-2 border-t border-gray-300 flex">
                <input
                    className="p-2 w-full max-h-40 overflow-hidden border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <div
                    onClick={handleSendMessage}
                    className="group w-10 h-10 text-center py-[7px] rounded-[50%] hover:cursor-pointer"
                >
                    <FontAwesomeIcon className="text-sky-400 group-hover:text-sky-600" icon={faArrowUp} />
                </div>
            </div>
        </div>
    );
}
export default InputBox;
