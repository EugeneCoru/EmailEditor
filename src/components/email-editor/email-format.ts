export type TStyle = 'bold' | 'italic' | 'underline';
export type TType = {
    email:string,
    title: string,
    text: string
}


export const applyFormat = (type: TStyle, selectText:string) =>{
    console.log(selectText);
    
    let formatText = selectText;
   switch (type) {
    case 'bold':
        formatText = "<b>"+ selectText+"</b>"
        break;
    case 'italic':
        formatText = "<i>"+ selectText+"</i>"
        break;  
    case 'underline':
        formatText = "<u>"+ selectText+"</u>"
        break;  
   
    default:
        formatText=selectText;
   }

   return formatText;
}