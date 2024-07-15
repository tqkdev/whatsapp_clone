import Boxbar from './Boxbar/Boxbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import HeaderChat from './HeaderChat/HeaderChat';
import ChatBox from './ChatBox/ChatBox';
import InputBox from './InputBox/InputBox';

function Conversation() {
    return (
        <div className="flex relative">
            <Sidebar />
            <div className="w-full z-10 h-screen flex flex-col absolute md:relative">
                <HeaderChat />
                <ChatBox />

                <div className="w-full z-10 bg-white">
                    <div className="min-h-24 max-h-56  ">
                        <div className="w-full h-10 border-b-blue-600">
                            <Boxbar />
                        </div>
                        <InputBox />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversation;
