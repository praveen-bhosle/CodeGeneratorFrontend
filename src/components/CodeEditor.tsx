import { javascript } from "@codemirror/lang-javascript";
import type { WebContainer } from "@webcontainer/api";
import { basicSetup, EditorView } from "codemirror";
import { useContext, useEffect, useRef, useState } from "react";
import { FilesContext } from "../context/FilesContext";
import { ProjectContext } from "../context/ProjectContext";

const CodeEditor = ({ webcontainerInstance  } : {webcontainerInstance : WebContainer }) => {

const editorRef = useRef<HTMLDivElement>(null) ; 
const editorViewRef = useRef<EditorView>(null) ; 
const { currentFiles  , setCurrentFiles , openedFilePath  } = useContext(FilesContext) ; 
const [count,setCount] = useState(0) ; 
const { fileObject ,  setFileObject  }  = useContext(ProjectContext) ; 
    
const getCurrentFile =  () => { 
  return currentFiles!?.find( file => file.path == openedFilePath) ;    
} 

const readFile1 = async () => { 
  const content  = await  webcontainerInstance.fs.readFile(openedFilePath!,'utf-8')  
  return  content ;
}

const updateFileObject = (buffer:string) => { 
  const fileArray = openedFilePath?.split('/').filter( x => x !== '' ) ; 
  let y  ;
  for( let i = 0 ; i < fileArray!.length  ; i++ ) { 
    if(i==0)  y = fileObject[fileArray![i]] ; 
    else  y = y![fileArray![i]] ;  
  }
  y['contents'] = buffer ; 
}


const resetBuffer = () => { 
  let currentFile = getCurrentFile() ; 
  currentFile =  {  ...currentFile! , buffer : currentFile?.content  } ;
  const updatedFiles =   currentFiles?.map ( ( file  )   => { 
    if( file.path == openedFilePath) return currentFile ; 
    else return file ; 
    }
  )
  setCurrentFiles!(updatedFiles!) ;
  setCount(count => count+1) ; 
}

const updateContent = () => { 
  let currentFile = getCurrentFile() ; 
  currentFile =  {  ...currentFile! , content : currentFile?.buffer  } ;
  const updatedFiles =   currentFiles?.map ( ( file  )   => { 
    if( file.path == openedFilePath) return currentFile ; 
    else return file ; 
    }
  )
  setCurrentFiles!(updatedFiles!) ;
  setCount(count => count+1); 
}




const readFile = async () =>  { 
  let currentFile = getCurrentFile() ; 
  if(!currentFile) { 
    const content = await  readFile1() ; 
    currentFile =  { path : openedFilePath! , content  , buffer : content  } ;
    setCurrentFiles!([...currentFiles!,currentFile]) ; 
  }
  return currentFile.buffer ; 
}

const fillEditor = async () =>  { 
const editorContainer = editorRef.current! ; 
const view  = new EditorView( { 
    doc: await readFile() , 
    parent : editorContainer  , 
    extensions : [ 
      basicSetup, 
      javascript({typescript:true}) ,
      EditorView.lineWrapping, 
      EditorView.theme( { 
        ".cm-gutters": {
        backgroundColor: "#1e293b", 
        color: "#94a3b8",            
        border: "none"       
      } , 
       ".cm-gutterElement" : { 
        backgroundColor : "#25262B"
       } , 
       ".cm-activeLine"  : { 
        backgroundColor : "#25262B"
       } , 
       ".cm-cursor" : { 
        borderColor : 'white'
       }
      }) ,
      EditorView.updateListener.of((update) => { 
        if(update.docChanged ) { 
          let currentFile = getCurrentFile()! ; 
          currentFile = { ...currentFile , buffer : update.state.doc.toString() } ; 
          const updatedFiles =   currentFiles?.map ( ( file  )   => { 
            if( file.path == openedFilePath) return currentFile ; 
            else return file ; 
            }
          )
          setCurrentFiles!(updatedFiles!) ; 
         }
      })  
    ] ,
} )
editorViewRef.current = view ;
}

useEffect( ( ) => {
  fillEditor() ; 
  return () => editorViewRef.current!.destroy() ;
} , [openedFilePath,count])

  return (
  <div className="text-xs h-full overflow-y-auto border-[#2F2F2F] border-1 w-full"> 
    <div className="border-[#2F2F2F] flex text-xs gap-2 p-2">    
      <div  className="" > {openedFilePath} </div>
      <div  className="cursor-pointer select-none" onClick = { () => { updateContent() }}> Save </div>  
      <div  className="cursor-pointer select-none" onClick = { () => { resetBuffer()   }}> Reset </div> 
    </div> 
    <div ref={editorRef} className=""> 
    </div>
  </div>
  )
}

export default CodeEditor 