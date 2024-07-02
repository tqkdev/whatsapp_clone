// import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderSidebar from './HeaderSidebar/HeaderSidebar';
import SidebarListConversation from './SidebarListConversation/SidebarListConversation';
import SidebarSearch from './SidebarSearch/SidebarSearch';
import {
    faAddressBook,
    faBriefcase,
    faCloud,
    faGear,
    faMessage,
    faSquareCheck,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    return (
        <div className="w-full h-screen flex md:w-[35%]">
            <div className="w-[80px] flex flex-col justify-between overflow-y-auto bg-sky-500">
                <div className="flex flex-col ">
                    <FontAwesomeIcon
                        className="text-2xl text-white p-5 hover:cursor-pointer bg-sky-700 hover:bg-sky-700 "
                        icon={faMessage}
                    />
                    <FontAwesomeIcon
                        className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                        icon={faAddressBook}
                    />
                    <FontAwesomeIcon
                        className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                        icon={faSquareCheck}
                    />
                </div>
                <div className="flex flex-col">
                    <FontAwesomeIcon
                        className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                        icon={faCloud}
                    />
                    <FontAwesomeIcon
                        className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                        icon={faBriefcase}
                    />
                    <FontAwesomeIcon
                        className="text-2xl text-white p-5 hover:cursor-pointer hover:bg-sky-600"
                        icon={faGear}
                    />
                </div>
            </div>
            <div className="m-1 flex flex-col w-full">
                <div className="my-1">
                    <HeaderSidebar />
                </div>
                <div>
                    <SidebarSearch />
                </div>
                <div className="flex-1 overflow-y-auto">
                    <SidebarListConversation />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
