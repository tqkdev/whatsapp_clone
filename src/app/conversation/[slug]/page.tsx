import Boxbar from './Boxbar/Boxbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import HeaderChat from './HeaderChat/HeaderChat';
import ChatBox from './ChatBox/ChatBox';
import InputBox from './InputBox/InputBox';
import SettingSidebar from '@/components/Sidebar/SettingSidebar/SettingSidebar';

function Conversation() {
    return (
        <div className="flex relative">
            <div className="hidden flex-coloverflow-y-auto md:flex h-screen">
                <SettingSidebar />
            </div>

            <div className="flex w-full">
                <Sidebar />

                <div className="w-full z-10 h-screen flex flex-col absolute md:relative">
                    <HeaderChat />
                    <ChatBox />

                    <div className="w-full z-10 bg-white">
                        <InputBox />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversation;
