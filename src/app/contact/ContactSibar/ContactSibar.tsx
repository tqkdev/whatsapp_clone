import Link from 'next/link';
import ContactSearch from './ContactSearch/ContactSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleArrows, faUserCheck, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';

function ContactSibar({ activePage }: any) {
    return (
        <div className="hidden border-r h-screen md:flex md:w-[40%] lg:w-[30%]">
            <div className="w-full">
                <div className="w-full">
                    <div className="z-[3]">
                        <ContactSearch />
                    </div>
                    <div className="z-[1]">
                        <Link
                            href={'/contact/friend'}
                            className={`flex h-14 px-2 leading-[56px] hover:cursor-pointer  ${
                                activePage === 'friend' ? 'bg-blue-50' : 'hover:bg-text4'
                            }`}
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
                            className={`flex h-14 px-2 leading-[56px] hover:cursor-pointer  ${
                                activePage === 'group' ? 'bg-blue-50' : 'hover:bg-text4'
                            }`}
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
                            className={`flex h-14 px-2 leading-[56px] hover:cursor-pointer ${
                                activePage === 'addfriend' ? 'bg-blue-50' : 'hover:bg-text4'
                            }`}
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
        </div>
    );
}

export default ContactSibar;
