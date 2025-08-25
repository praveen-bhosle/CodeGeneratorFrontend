import { WebContainer } from "@webcontainer/api";
import { useEffect, useRef, useState } from 'react';
import {  updateFiles} from '../utils/webcontainerutils';
import CodeEditor from './CodeEditor';
import PreviewContainer from './PreviewContainer';
import type { File } from "../types/FileStructure";

const MainContainer = ( { files  } : { files : File[] }) => {
const [ containerReady  ,  setContainerReady] = useState(false) ; 
const [ url , setUrl ] = useState('') ; 
const webContainerRef = useRef<WebContainer|null>(null) ;  
const [view,setView] = useState('preview') ; 

useEffect( () => {  
    if(files) { containerStartFunction(files) } 
} , [files]) 

const containerStartFunction =  async (files : File[]) => { 
    const webcontainerInstance  = webContainerRef.current ? webContainerRef.current : await WebContainer.boot() ;  
    webcontainerInstance.on('server-ready' , (_,url) => { 
      console.log("container is ready setting iframe url.")
      console.log(url); 
      setContainerReady(true) ; 
      setUrl(url) ; 
    })
    webContainerRef.current = webcontainerInstance ; 
    await updateFiles(files,webcontainerInstance) ; 
    await webcontainerInstance.spawn('yarn' , ['install']) ; 
    await webcontainerInstance.spawn('yarn' , ['dev'])  ; 
    //await webcontainerInstance.spawn('jsh')  ;
}

  return (  
    <div>
        {containerReady ? <div> Loading </div>   : 
          <div> 
          <div className=''> <button onClick={ () =>  {  if(view==='preview') return ;  setView('preview') } }>Preview</button>  
                             <button onClick={ () =>  {  if(view==='code') return ;     setView('code')    } }>Code</button>
          </div>  
          { view ==='preview' ?  <PreviewContainer url={url} /> :  <CodeEditor/> }
          </div>
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