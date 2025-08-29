import { WebContainer } from "@webcontainer/api";
import { useEffect, useRef, useState } from 'react';
import PreviewContainer from './PreviewContainer';
import Button2 from "../UIComponents/Button2";
import Button1 from "../UIComponents/Button1";
import IDE from "./IDE";

const MainContainer = ( { files , setChatHidden  , chatHidden   } : { files : any , setChatHidden : React.Dispatch<React.SetStateAction<boolean>>  , chatHidden : boolean}) => {
const [ containerReady  ,  setContainerReady] = useState(false) ; 
const [ url , setUrl ] = useState('') ; 
const webContainerRef = useRef<WebContainer|null>(null) ;  
const [view,setView] = useState('preview') ; 
const [filesMounted,setFilesMounted] = useState(false) ; 

useEffect( () => {  
    if(files) { containerStartFunction(files) } 
} , [files]) 

const containerStartFunction =  async (files : any  ) => { 
    const webcontainerInstance  = webContainerRef.current ? webContainerRef.current : await WebContainer.boot() ;  
    webContainerRef.current = webcontainerInstance ;
    console.log(files) ; 
    webcontainerInstance.on('server-ready' , (_,url) => { 
      console.log("container is ready setting iframe url.")
      console.log(url); 
      setContainerReady(true) ; 
      setUrl(url) ; 
    })
    console.log("mounting files") ; 
    await webcontainerInstance.mount(files) ;  
    console.log("files mounted") ; 
    setFilesMounted(true) ;
    //console.log("installing packages") ; 
    //await updateFiles(files,webcontainerInstance) ; 
    //await webcontainerInstance.spawn('yarn' , ['install']) ; 
    //await webcontainerInstance.spawn('yarn' , ['dev'])  ; 
    // await webcontainerInstance.spawn('jsh')  ;
}

  return (  
    <div className="border-[#2F2F2F] border-[1px] bg-[#171717] p-2  flex flex-col gap-2" >
       <div className="flex gap-2 border-white  items-center ">  
          <div>{ chatHidden ? <img className="w-[20px] cursor-pointer" src='/sidebar-open.svg' /> : <img className="w-[20px] cursor-pointer" src='/sidebar-close.svg'/> } </div>
          <div className='bg-black flex gap-2 py-[3px] px-[5px] rounded-xl '>  
            { view === 'preview' ?  <>  <Button1 text="Code" onClick = { () => { setView('code') ;  } } />   <Button2 text="Preview" /> </> :  <>  <Button2 text="Code" />  <Button1 text="Preview"  onClick={ () => { setView('preview')  }}/> </> }
          </div> 
        </div>
        { 
        filesMounted &&  <IDE webcontainerInstance={webContainerRef.current!}/>  
        }
    </div>    
  )
}
export default MainContainer 

/* 
useEffect( () => {  
    if(instructions) { containerStartFunction(instructions) } 
} , [instructions]) 
const containerStartFunction =  async (instructions : instructionsType ) => { 
    const { setup , addDependencies , installDependencies , files , start } = instructions  ;
    const webcontainerInstance  = webContainerRef.current ? webContainerRef.current : await WebContainer.boot() ;  
    webcontainerInstance.on('server-ready' , (_,url) => { 
      console.log("container is ready setting iframe url.")
      console.log(url); 
      setContainerReady(true) ; 
      setUrl(url) ; 
    })
    webContainerRef.current = webcontainerInstance ; 
    await executeCommand(setup,webcontainerInstance); 
    console.log(addDependencies) ; 
    if(!addDependencies) return ; 
    const json = JSON.parse(addDependencies) ; 
    await writeFile({ filepath : '/package.json' , content :JSON.stringify(json) } , webcontainerInstance) ; 
    await executeCommand(installDependencies,webcontainerInstance);
    await updateFiles(files,webcontainerInstance) ; 
    await executeCommand(start,webcontainerInstance) ; 
    await executeCommand('jsh',webcontainerInstance) ; 
}
*/

/*
{ containerReady ?  
  <div className="w-full h-[80%] border-2 border-white">  
  { view ==='preview' ?  <PreviewContainer url={url} /> :  <CodeEditor webcontainerInstance={webContainerRef.current!}/> }
  </div>
  : 
  <div>Loading</div> 
}
*/