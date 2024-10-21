import { useQuery } from "@tanstack/react-query";
import styles from "./EmailList.module.scss";
import { emailServises } from "../../servises/email.servises";
import parse from 'html-react-parser'

export function EmailList(){
   const {data} = useQuery({
     queryKey:['emails list'],
     queryFn: ()=>emailServises.getEmail(),
   });

     console.log(data);
     
     return(
          <div>
        <div className={styles.list}>
          
          
         {data?.map(email =>(
          <div>
            <div key={email.email}><b>Почта: </b> {email.email}</div>
            <div key={email.title}><b>Тема: </b>{email.title}</div>
            <div className={styles.line}></div>
          <div key={email.text}>{parse(email.text)}</div>
          </div>
         ))}

         
         </div>
         <div>1 2 3</div>
         </div>
     )
}