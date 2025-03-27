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


let definedStyle=HighlightStyle.define([
    { tag: tags.keyword, color: "#C678DD", fontWeight: "bold" }, // Purple keywords
    { tag: tags.comment, color: "#5C6370", fontStyle: "italic" }, // Gray comments
    { tag: tags.string, color: "#98C379" }, // Green strings
    { tag: tags.function(tags.variableName), color: "#61AFEF" }, // Blue function names
    { tag: tags.number, color: "#D19A66" }, // Orange numbers
    { tag: tags.operator, color: "#56B6C2" }, // Cyan operators
    { tag: tags.punctuation, color: "#9A9B9C" }, // Light gray punctuation
])

export function Editor(router) {
   let ref = state("");

   let fname=router?.queries?.file || 'newfile.js'

   effect(() => {
      new EditorView({

        doc:'\n'.repeat(22),
         extensions: [basicSetup, javascript({
            typescript:true
         }),
         keymap.of([indentWithTab]),
         syntaxHighlighting(definedStyle)
         
        ],
         parent: ref.value,
        
      });
   });

   return div(nav(h1(fname||'ere'), div().giveRef(ref, true)));
}
