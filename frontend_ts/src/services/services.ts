import { IEmailData } from "../interfaces/Interfaces";
import { API_URL } from "./settings/urls";
import axios from "axios";

class EmailService {
    static sendEmail(emailData: IEmailData){
        const url = `${API_URL}/API/email/send`;
        const response = axios.post(url, emailData)
        return response
    }
};
export default EmailService;