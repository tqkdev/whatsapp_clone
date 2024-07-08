import Sidebar from '@/components/Sidebar/Sidebar';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex relative">
            <Sidebar />
            <div className="hidden pt-36 px-20 flex-grow h-screen md:block">
                <div>
                    <h1 className="text-center text-3xl">Chào mừng đến với Whatsapp!!!</h1>
                </div>
                <div className="flex justify-center py-10">
                    <Image
                        src="https://res.cloudinary.com/dyoctwffi/image/upload/v1720002952/ORGAVIVE/bg-appchat_wac5fq.png"
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                </div>
            </div>
        </div>
    );
}
