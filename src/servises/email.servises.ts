import axios from "axios";
import { IEmail } from "../pages/home/types";

class EmailServises{
    private URL = 'http://localhost:3000/emails';

    async getEmail(){
       const {data} = await axios.get<IEmail[]>(this.URL);
       return data;
    }
    async sendEmail(body:string){
        const {data} = await axios.post(this.URL, body);
        console.log(body);
        console.log(data);
        
        return data;
     }
}

export const emailServises = new EmailServises();