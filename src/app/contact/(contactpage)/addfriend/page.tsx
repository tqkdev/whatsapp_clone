import SettingSidebar from '@/components/Sidebar/SettingSidebar/SettingSidebar';
import ContactSibar from '../../ContactSibar/ContactSibar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import RequestFriend from './RequestFriend/RequestFriend';

function Group() {
    return (
        <div className="flex relative">
            <SettingSidebar />

            <div className="w-full h-screen flex md:relative">
                <ContactSibar activePage="addfriend" />
                <div className="w-full h-full relative">
                    <div className="flex flex-col h-full">
                        <div className="px-5  border-b">
                            <div className="flex h-16 leading-[64px] ">
                                <div className="w-7 mr-3 block md:hidden">
                                    <Link href={'/contact'} className="h-6 ">
                                        <FontAwesomeIcon className="text-xl text-text1" icon={faAngleLeft} />
                                    </Link>
                                </div>
                                <div className="w-7">
                                    <FontAwesomeIcon className="text-text2 text-xl" icon={faPeopleArrows} />
                                </div>
                                <div className="ml-3 h-full ">
                                    <h3 className="font-medium text-base leading-[64px] ">Lời mời kết bạn</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-text5 p-5 font-medium text-sm flex-1 overflow-y-auto ">
                            <p className="pb-5 ">Lời mời đã nhận</p>
                            {/*  */}
                            <RequestFriend />
                            {/*  */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Group;
