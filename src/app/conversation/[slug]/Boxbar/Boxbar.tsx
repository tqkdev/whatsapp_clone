import {
    faAddressCard,
    faBolt,
    faEllipsis,
    faFaceSmile,
    faImage,
    faPaperclip,
    faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Boxbar() {
    return (
        <div className="h-full py-1 text-center md:text-left md:mx-4">
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faFaceSmile}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faImage}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faPaperclip}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faAddressCard}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faPenToSquare}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faBolt}
            />
            <FontAwesomeIcon
                className="w-5 h-5 text-xl p-[6px] mx-1 md:mx-3 md:w-6 md:h-6 text-text2 hover:cursor-pointer hover:bg-text4 "
                icon={faEllipsis}
            />
        </div>
    );
}

export default Boxbar;
