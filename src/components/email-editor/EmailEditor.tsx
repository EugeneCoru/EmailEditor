import { Bold, Eraser, Italic, Underline } from 'lucide-react';
import styles from './EmailEditor.module.scss'
import { useRef, useState } from 'react';
import { applyFormat, TStyle, TType } from './email-format';
import parse from 'html-react-parser'
import { useForm } from 'react-hook-form';
import { emailServises } from "../../servises/email.servises";

export function EmailEditor(){
  const [text, setText] = useState(`Здесь нужно ввести сообщение, так попробуй это сделать!`)
  const [sendBtn, setSendBtn] = useState(false);
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const {register,handleSubmit, reset} = useForm<TType>();


  //обновление состояний старт и энд
  const updateSelection  = ()=>{
    if(!textRef.current) return
    setSelectionStart(textRef.current.selectionStart);
    setSelectionEnd(textRef.current.selectionEnd);
  }

//работа с текстом в textarea
  const getSelectionText = (type: TStyle)=>{
    const selectText = text.substring(selectionStart, selectionEnd);//выделенный текст
    if(!selectText) return

     const before = text.substring(0,selectionStart)//текст до выделенного фрагмента
    
    const after = text.substring(selectionEnd);//текст после выделенного текста
    setText(before + applyFormat(type, selectText)+ after)

    
  }
  const textRef = useRef<HTMLTextAreaElement |  null>(null);


const onSubmit = (data)=>{
        const body = { email: data.email, title: data.title, text: text}
        if(sendBtn){
           emailServises.sendEmail(body);
           reset();
           setText('')
        }
        

                
}



  


  return(
   <div className={styles.wrapper} >
   <h1>Email Editor</h1>
   <div className={styles.preview}>{parse(text)}</div>
   <div className={styles.card}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <input  className={styles.input} type="email"   placeholder='Введите Email...'{...register('email')}/>
    <input className={styles.input} type="title"  placeholder='Тема...'{...register('title')}/>
    
    <textarea className={styles.editor} name='text' 
    spellCheck='false' 
    ref={textRef}
    onSelect={updateSelection}
    value={text}
    onChange={e => setText(e.target.value)}
    
    
    
    >{text}</textarea>
    <div className={styles.line}></div>
    <div className={styles.action}>
     
      <div className={styles.tools}>
        <button onClick={()=>setText('')}><Eraser size={17}/></button>
        <button onClick={()=>getSelectionText('bold')}><Bold size={17}/></button>
        <button onClick={()=>getSelectionText('italic')}><Italic size={17}/></button>
        <button onClick={()=>getSelectionText('underline')}><Underline size={17}/></button>
      </div>
      <button type='submit' onClick={()=> setSendBtn(true)}>Отправить</button>
      
      </div>
      </form>
      
   </div>
   
   </div>




  );
}