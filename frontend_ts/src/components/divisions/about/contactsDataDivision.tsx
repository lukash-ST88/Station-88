import { BsFillStarFill } from "react-icons/bs";
import { FaVk } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";

const ContactsDataDivision = () => {
    return(
        <>
            <div className="flex justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-white to-st88-background">
                <div className="flex flex-col justify-center items-center gap-2 border-2 px-5 cursor-default bg-st88-background min-h-[320px] min-w-[240px]">
                    <BsFillStarFill className="text-8xl"/>
                    <div className="border-t-2 text-2xl my-4 py-2">Контакты</div>
                </div>
                <div className="grid grid-cols-1 justify-center items-center gap-2 content-center border-2 px-16 cursor-default bg-st88-background min-h-[320px] min-w-[240px]">
                        <div className="flex justify-around items-center gap-2">
                            <a href="https://vk.com/stazione_88"><FaVk className="text-6xl hover:text-blue-500 cursor-pointer"/></a>
                            <a  href="https://www.youtube.com/@station-88?si=kAq9Yg5Jcf-zm7e_"><TfiYoutube className="text-6xl hover:text-red-500 cursor-pointer"/></a>
                        </div>
                        <div className="border-t-2 my-4 py-2">
                            <div className="text-2xl">station88.rg@gmail.com</div>
                        </div>
                    </div>
            </div>
        </>
    )
};
export default ContactsDataDivision;