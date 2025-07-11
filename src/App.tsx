import './App.css'
import { WebContainer } from "@webcontainer/api";
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { type instructionsType } from './utils';
import { executeCommand , updateFiles, writeFile } from './webcontainerutils';

function App() {

const [ containerReady  ,  setContainerReady] = useState(false) ; 
const [ url , setUrl  ] = useState('') ; 
const webContainerRef = useRef<WebContainer|null>(null) ;  
const [instructions , setInstructions] = useState<instructionsType|null>() ; 
const [ question , setQuestion ] = useState('') ;

useEffect( () => {  
  if(instructions) {  containerStartFunction(instructions)  ;  } 
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
}

  return (
    <div className='flex w-[100vw] h-[100vh] border-black border-2 bg-black text-white'>  
    <div className='flex-1/3 border-2 p-2 '> 
       <textarea value = { question} onChange={ (e) => setQuestion(e.target.value)}  className='border-1 h-[200px] w-max p-2 ' />  <br/> 
       <button onClick={   async () => { const res =  await axios.get(`http://localhost:5000/ask?question=${question}`) ; console.log(res.data) ; setInstructions(res.data);  } }  className='bg-white text-black p-2 m-2' > Send </button>
    </div>
    <div className='flex-2/3'> 
      { containerReady ?
        <div  className='w-full h-full' > 
        <iframe src={url}    className=' p-2 w-full h-full relative top-0 left-0'/> 
        </div>  : 
        <div>
          Loading....
        </div>
      }  
    </div>
    </div>
  )
}

export default App