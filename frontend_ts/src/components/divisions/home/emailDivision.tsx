import { Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { IEmailData } from "../../../interfaces/Interfaces";
import EmailService from "../../../services/services";
import Loader from "../../components/Loader/Loader";


const EmailDivision = () =>{

    const defaultEmail = {email: "", content: ""}
    const defaultResponse = {status: "", message: ""}
    
    const [emailData, setEmailData] = useState<IEmailData>(defaultEmail);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [responseData, setResponseData] = useState(defaultResponse);

    async function sendEmailData(){
        setIsLoading(true);
        const response = await EmailService.sendEmail(emailData);
        setIsLoading(false)
        if (response.data){
            setResponseData(response.data)
            setTimeout(()=>{
                setResponseData(defaultResponse);
                setEmailData(defaultEmail)
            }, 10000)
        }
    }
    return (
        <>
            <div className="mt-10 items-center p-5 bg-gradient-to-r from-st88-background via-st88-secondary to-st88-background">
                <div className="flex justify-center items-center">
                    <div className="w-[400px] border-2 bg-gradient-to-b from-st88-background via-st88-third to-st88-background p-5 text-center text-st88-secondary lg:text-2xl border-st88-secondary flex flex-col items-center gap-4" >
                        <div className="text-white border-b-2 border-st88-secondary">
                            Напишите нам:
                        </div>
                        <Input  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmailData({...emailData, email: event.target.value})} 
                                value={emailData.email}
                                variant="standard" label="Ваш Email" type="email" color="white"/>
                        <div className="relative w-full min-w-[200px]">
                            <textarea onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setEmailData({...emailData, content: event.target.value})}
                                value={emailData.content}
                                className="peer h-full min-h-[100px] w-full resize-none border-b border-white bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-st88-white focus:border-st88-white focus:outline-0 disabled:resize-none disabled:border-0"
                                placeholder=" ">
                            </textarea>
                            <label
                                className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[12px] font-normal leading-tight text-white transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-st88-third after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-white peer-focus:text-[11px] peer-focus:leading-tight peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white">
                                Сообщение
                            </label>
                        </div>
                        {isLoading && <Loader/>}
                        {responseData.message && <div className={`border-b-2 px-3 text-white text-sm lg:text-xl ${responseData.status === 'success' ? 'border-st88-main': 'border-st88-secondary'}`}>{responseData.message}</div>}
                        <div onClick={sendEmailData} 
                            className="bg-st88-secondary p-2 text-white border-2 border-white cursor-pointer hover:bg-white hover:text-st88-secondary hover:border-st88-secondary">Отправить</div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default EmailDivision;