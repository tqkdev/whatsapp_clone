import HeaderSidebar from './HeaderSidebar/HeaderSidebar';
import SettingSidebar from './SettingSidebar/SettingSidebar';
import SidebarListConversation from './SidebarListConversation/SidebarListConversation';
import SidebarSearch from './SidebarSearch/SidebarSearch';

function Sidebar() {
    return (
        <div className="w-full border-r h-screen flex md:w-[45%] lg:w-[35%]">
            <SettingSidebar />

            <div className="m-1 flex flex-col w-full relative">
                <div className="my-1">
                    <HeaderSidebar />
                </div>
                <div className="z-[3] ">
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
