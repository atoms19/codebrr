import { div, effect, h1, nav, state } from "dominity";

import { basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
import { keymap,EditorView } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { syntaxHighlighting } from "@codemirror/language";
import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { Compartment } from "@codemirror/state";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { recents } from "./main";


let definedStyle=HighlightStyle.define([
    { tag: tags.keyword, color: "#C678DD", fontWeight: "bold" }, // Purple keywords
    { tag: tags.comment, color: "#5C6370", fontStyle: "italic" }, // Gray comments
    { tag: tags.string, color: "#98C379" }, // Green strings
    { tag: tags.function(tags.variableName), color: "#61AFEF" }, // Blue function names
    { tag: tags.number, color: "#D19A66" }, // Orange numbers
    { tag: tags.operator, color: "#56B6C2" }, // Cyan operators
    { tag: tags.punctuation, color: "#9A9B9C" }, // Light gray punctuation
])

function chooseLang(fname){
    if(fname.endsWith('.c') || fname.endsWith('.cpp')){
        return cpp()
    }else if(fname.endsWith('.js') || fname.endsWith('.ts')){
        return javascript({
            typescript:true
        })
    }else if(fname.endsWith('.py')){
        return python()
    }

}

export function Editor(router) {
   let ref = state("");

   

   let fname=router?.queries?.file || 'newfile.js'
    let language=new Compartment 

    let sourceCode;
    let filefinder=recents.value.find(p=>p.fname==fname)
    if(filefinder) sourceCode=filefinder.code;
    else sourceCode=''

    let editor;
   effect(() => {
      editor=new EditorView({
        doc:sourceCode,
         extensions: [basicSetup,
            
        language.of(chooseLang(fname)),
         keymap.of([indentWithTab]),
         syntaxHighlighting(definedStyle)
         
        ],
         parent: ref.value,
        
      });
   });
   
   let saves=setInterval(()=>{
    if(!filefinder) clearInterval(saves)
    filefinder.code=editor.state.doc.toString()
   },5000)

   return div(nav(h1(fname||'ere'), div().giveRef(ref, true)));
}
