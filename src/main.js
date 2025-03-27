import { Editor } from './editor'
import './style.css'
import "/fileplus.svg"

import { button, div, DominityRouter, h1, img, li, nav, p, state, ul} from 'dominity'

function Home(r){

  return div(
    h1("hello codebrr")
    ,p('code brr is an execturion platform for various programming languages'),
    button('new file',img({src:'fileplus.svg'})).on("click",()=>{
      let file=prompt("enter file name with extension :")

      r.routeTo('/editor?file='+file)
    })
   , history()
  )

}



function history(){
  let recents=state([{
    fname:'linkedlist.c',
    date:'19-02-2025',
  },{
    fname:'arraySort.py',
    date:'19-02-2025'
  },
  {
    fname:'nig.ts',
    date:'19-02-2025'
  }])

  return(
      div(
          h1('Recents-----'),
          ul().forEvery(recents,(recent)=>{
            return router.Link({href:'/editor?file='+recent.fname},li({class:'recent-item'},div(
              recent.fname
            ),div(recent.date)))
          })

      )


  )


}

let router=new DominityRouter() 
router.setRoutes({
  "/":{
    getComponent:Home
  },
  "/editor":{
    getComponent:Editor
  }

})
router.start(document.body)
//Home()


