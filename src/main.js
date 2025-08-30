import PromptWindow from "./_components/promptWindow";
import { Editor } from "./editor";
import "./style.css";
import "/fileplus.svg";

import {
   button,
   div,
   DominityRouter,
   h1,
   img,
   li,
   p,
   state,
   ul
} from "dominity";

export let recents = state([
   {
      fname: "linkedlist.c",
      date: "19-02-2025"
   },
   {
      fname: "arraySort.py",
      date: "19-02-2025"
   },
   {
      fname: "nig.ts",
      date: "19-02-2025"
   }
]);

function Home(r) {
   return div(
      h1("hello codebrr"),
      p("code brr is an execturion platform for various programming languages"),
      button("new file", img({ src: "fileplus.svg" })).on("click", () => {
         let file = "";

         PromptWindow({
            title: "File Name",
            descrption: "enter the name of the file along with its extension",
            prompt: "example.js"
         }).on("promptEntry", (e) => {
            file = e.detail.value;
            r.routeTo("/editor?file=" + file);

            recents.value = [
               {
                  fname: file,
                  date: new Intl.DateTimeFormat("en-GB")
                     .format(new Date())
                     .replaceAll("/", "-")
               },
               ...recents.value
            ];
         });
      }),
      history()
   );
}

function history() {
   return div(
      h1("Recents-----"),
      ul().forEvery(recents, (recent) => {
         return router.Link(
            { href: "/editor?file=" + recent.fname },
            li({ class: "recent-item" }, div(recent.fname), div(recent.date))
         );
      })
   );
}

let router = new DominityRouter();
router.setRoutes({
   "/": {
      getComponent: Home
   },
   "/editor": {
      getComponent: Editor
   }
});
router.start(document.body);
//Home()
