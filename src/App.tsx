
import './App.css'

import { WebContainer } from "@webcontainer/api";
import { files } from "./files"; 
import { useEffect, useRef, useState } from 'react';
function App() {

const [ containerReady  ,  setContainerReady ] = useState(false) ; 
const [ url , setUrl  ] = useState('') ; 
const [ indexjscontent ,setIndexjscontent ] = useState( files['index.js'].file.contents )  ; 
const webContainerRef = useRef<WebContainer|null>(null) ; 

useEffect( () => {  
  containerStartFunction() ; 
} , []) 

const checkNode = async () => { 
  const x = await webContainerRef.current?.spawn('node',['-v']) ; 
  x?.output.pipeTo( new WritableStream ( {  write : (data) => { console.log(data)}  }) )
}


const containerStartFunction =  async () => { 
   console.log(webContainerRef.current) ; 
   if(webContainerRef.current) { return ; }
    const webcontainerInstance  = await WebContainer.boot() ;  
    webContainerRef.current = webcontainerInstance ; 
    checkNode() ; 
    console.log(webcontainerInstance) ; 
    const files_ = await webcontainerInstance.fs.readdir('.') ; 
    console.log(files_) ; 
    const initStatus = await initialiseProject();
    if(initStatus!==0){ 
      console.log("failed in initialising project.") ; 
      return ; 
    }
    console.log(initStatus) ; 
    const status =  await installDependencies();
    if(status!==0) { 
      console.log("failed in downloading dependencies.") ; 
      return ; 
    }
    const files = await webcontainerInstance.fs.readdir('/src') ; 
    console.log(files) ; 
    updateApp();
    updateStyles() ; 
    startProject() ; 
}

async function initialiseProject( ) {
   console.log("intialising the project.") ; 
    const webcontainerInstance = webContainerRef.current ; 
    if(!webcontainerInstance) { 
      return ; 
    }
    const installProcess = await webcontainerInstance.spawn('yarn' , ['create' , 'vite', '.' , '--template' , 'react-ts']) ; 
    installProcess.output.pipeTo( new WritableStream( { write(data) { console.log(data)  } } ) ) ; 
    return  installProcess.exit ; 
}

async function  installDependencies() {  
  const webcontainerInstance = webContainerRef.current ; 
  const process = await webcontainerInstance?.spawn( 'yarn',['install']); 
  return  process?.exit; 
}

async function  updateApp() {
    const webcontainerInstance = webContainerRef.current ; 
    webcontainerInstance?.fs.writeFile('/src/App.js' , 
      `import React, { useState } from 'react' ; 
       import './App.css' ;
       function App() {
        const [todos, setTodos] = useState([]);
        const [input, setInput] = useState('');
       
        const handleAddTodo = () => {
          if (!input.trim()) return;
          setTodos([...todos, input]);
          setInput('');
        };
       
        const handleDelete = (indexToDelete) => {
          setTodos(todos.filter((_, i) => i !== indexToDelete));
        };
       
        return (
          <div className="App">
            <h1>Todo List</h1>
            <div className="input-group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter a task"
              />
              <button onClick={handleAddTodo}>Add</button>
            </div>
            <ul>
              {todos.map((todo, index) => (
                <li key={index}>
                  {todo}
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        );
       }        
      export default App;`)  ; 
}

async function updateStyles() {

  const webcontainerInstance = webContainerRef.current ; 

  webcontainerInstance?.fs.writeFile('/src/App.css' , `.App {
  text-align: center;
  margin-top: 50px;
  font-family: Arial, sans-serif;
}

.input-group {
  margin-bottom: 20px;
}

input {
  padding: 10px;
  width: 250px;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

li button {
  margin-left: 20px;
  color: white;
  background-color: red;
  border: none;
  padding: 5px 10px;
}
`) ;  
  
}

async function startProject() {
    const webcontainerInstance = webContainerRef.current ; 
    if(!webcontainerInstance) { return  ; } 
    await webcontainerInstance.spawn('yarn',['dev']) ; 
    webcontainerInstance.on('server-ready' , (_,url) => { 
      setContainerReady(true) ; 
      setUrl(url) ; 
    })
}
  return (
    
    <div className='flex w-[100vw] h-[100vh] border-black border-2'>  
    <div className='flex-1/3 border-2'> 
      <textarea  className='w-max p-2' value={indexjscontent} onChange={ (e) => { setIndexjscontent(e.target.value); console.log("textarea updated.")  }}   /> 
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


/*

useEffect( () => { 
  console.log("running use effect.")
 updateIndexJs() 
} , [ indexjscontent]) 

async function   updateIndexJs() {
  console.log("updating index.js")
  const webcontainerInstance = webContainerRef.current ; 
  if(!webcontainerInstance) return ; 
  const content = webcontainerInstance.fs.readFile('index.js' , "utf-8" ) ; 
  console.log(content) 
  await webcontainerInstance.fs.writeFile('/index.js' ,  indexjscontent) ;  
}



import './App.css'

import { WebContainer } from "@webcontainer/api";
import { files } from "./files"; 
import { useEffect, useRef, useState } from 'react';
function App() {

const [ containerReady  ,  setContainerReady ] = useState(false) ; 
const [ url , setUrl  ] = useState('') ; 
const [ indexjscontent ,setIndexjscontent ] = useState( files['index.js'].file.contents )  ; 
const webContainerRef = useRef<WebContainer|null>(null) ; 

useEffect( () => {  
  containerStartFunction() ; 
} , []) 

useEffect( () => { 
  console.log("running use effect.")
 updateIndexJs() 
} , [ indexjscontent]) 

async function   updateIndexJs() {
  console.log("updating index.js")
  const webcontainerInstance = webContainerRef.current ; 
  if(!webcontainerInstance) return ; 
  const content = webcontainerInstance.fs.readFile('index.js' , "utf-8" ) ; 
  console.log(content) 
  await webcontainerInstance.fs.writeFile('/index.js' ,  indexjscontent) ; 
}


const containerStartFunction =  async () => { 
    const webcontainerInstance  = await WebContainer.boot() ; 
    webContainerRef.current = webcontainerInstance ; 
    await webcontainerInstance.mount(files) ; 
    const packagejson = await webcontainerInstance.fs.readFile( 
        "index.js", 
        "utf-8" 
    )
    console.log(packagejson) 
    const exitCode = await installDependencies() ; 
    if(exitCode!==0) { 
        console.log("error while doing npm install") 
    }
    startDevServer() ; 
}

async function installDependencies ( ) {
    const webcontainerInstance = webContainerRef.current ; 
    if(!webcontainerInstance) { 
      return ; 
    }
    const installProcess = await webcontainerInstance.spawn('npm' , ['install']) ; 
    installProcess.output.pipeTo(new WritableStream({ write(data) { console.log(data)} }))
    return  installProcess.exit ; 
}

async function startDevServer() {
    const webcontainerInstance = webContainerRef.current ; 
    if(!webcontainerInstance) { return  ; } 
    await webcontainerInstance.spawn('npm',['run','start']) ; 
    webcontainerInstance.on('server-ready' , (_,url) => { 
      setContainerReady(true) ; 
      setUrl(url) ; 
    })
}
  return (
    <> 



    <div>  
    <div> <textarea  style = {{ width : 'max-content' , height: '500px'  , padding : '10px'}} value={indexjscontent} onChange={ (e) => { setIndexjscontent(e.target.value); console.log("textarea updated.")  }}   />  </div>
      { containerReady ?
        <div> 
        <iframe src={url}> </iframe>
        </div>  : 
        <div>
          Loading....
        </div>
      }  
    </div>
    </>
  )
}

export default App

*/ 
