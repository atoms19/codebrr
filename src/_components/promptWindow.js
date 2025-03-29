import { placeholder } from "@codemirror/view";
import { button, div, form, h1, h2, input, p, state } from "dominity";

export default function PromptWindow({
    title,
    descrption,
    prompt

}){

    let inputText=state('')
    let isOpen=state(true)
    let elementRef=state()
    

        return div({class:'prompt-wrapper'},
                div({class:'prompt-container'},
                    h2(title),
                    p(descrption),
                    form(
                        input({placeholder:prompt,autofocus:''}).model(inputText),
                        button({type:'submit'},'ok').css({
                            float:'right'
                        })
                    )
                    .on("submit",(e)=>{
                        e.preventDefault()
                        let ev=new CustomEvent("promptEntry",{detail:{
                            value:inputText.value
                        }})    
                        elementRef.value.dispatchEvent(ev)
                        isOpen.value=false
                    })
                ).on("click",e=>e.stopPropagation())


        ).showIf(isOpen).on('click',()=>isOpen.value=false).giveRef(elementRef,1)




}