import SettingSidebar from '@/components/Sidebar/SettingSidebar/SettingSidebar';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows, faUserCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import ContactSearch from './ContactSibar/ContactSearch/ContactSearch';
import Link from 'next/link';

function Contact() {
    return (
        <div className="flex relative">
            <SettingSidebar />
            <div className="w-full h-screen flex md:relative">
                {/*  */}

                <div className="w-full border-r h-screen md:flex md:w-[40%] lg:w-[30%]">
                    <div className="w-full">
                        <div className="w-full">
                            <ContactSearch />
                        </div>
                        <div className="w-full">
                            <Link
                                href={'/contact/friend'}
                                className="flex h-14 px-2  leading-[56px] hover:cursor-pointer hover:bg-text4"
                            >
                                <div className="w-7">
                                    <FontAwesomeIcon className="text-text2 text-xl" icon={faUserCheck} />
                                </div>
                                <div className="ml-3 ">
                                    <h3 className="font-medium text-base leading-[56px]">Danh sách bạn bè</h3>
                                </div>
                            </Link>

                            <Link
                                href={'/contact/group'}
                                className="flex h-14 px-2  leading-[56px]  hover:cursor-pointer hover:bg-text4"
                            >
                                <div className="w-7">
                                    <FontAwesomeIcon className="text-text2 text-xl" icon={faUsers} />
                                </div>
                                <div className="ml-3 ">
                                    <h3 className="font-medium text-base leading-[56px]">Danh sách nhóm</h3>
                                </div>
                            </Link>

                            <Link
                                href={'/contact/addfriend'}
                                className="flex h-14 px-2  leading-[56px]  hover:cursor-pointer hover:bg-text4"
                            >
                                <div className="w-7">
                                    <FontAwesomeIcon className="text-text2 text-xl" icon={faPeopleArrows} />
                                </div>
                                <div className="ml-3 ">
                                    <h3 className="font-medium text-base leading-[56px]">Lời mới kết bạn</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/*  */}

                <div className="hidden w-full pt-36 px-20 flex-grow h-screen md:block">
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
        </div>
    );
}

export default Contact;
