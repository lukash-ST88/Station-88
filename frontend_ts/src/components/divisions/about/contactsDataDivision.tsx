import { BsFillStarFill } from "react-icons/bs";
import { FaVk } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";

const ContactsDataDivision = () => {
    return(
        <>
            <div className="flex justify-center gap-10 items-center p-5 bg-gradient-to-r from-st88-background via-white to-st88-background">
                <div className="hidden lg:flex flex-col justify-center items-center gap-2 border-2 px-5 cursor-default bg-gradient-to-b from-st88-background via-st88-third to-st88-background min-h-[320px] min-w-[240px]">
                    <BsFillStarFill className="text-8xl"/>
                    <h1 className="border-t-2 text-2xl my-4 py-2">Контакты</h1>
                </div>
                <div className="grid grid-cols-1 justify-center items-center gap-2 content-center border-2 px-4 lg:px-16 cursor-default bg-gradient-to-b from-st88-background via-st88-third to-st88-background lg:min-h-[320px] min-w-[240px] min-h-[200px]">
                        <div className="flex justify-around items-center gap-2">
                            <a href="https://vk.com/stazione_88"><FaVk className="text-6xl hover:text-blue-500 cursor-pointer"/></a>
                            <a  href="https://www.youtube.com/@station-88?si=kAq9Yg5Jcf-zm7e_"><TfiYoutube className="text-6xl hover:text-red-500 cursor-pointer"/></a>
                        </div>
                        <div className="border-t-2 my-4 py-2">
                            <div className="lg:text-2xl">station88.rg@gmail.com</div>
                        </div>
                    </div>
            </div>
        </>
    )
};
export default ContactsDataDivision;