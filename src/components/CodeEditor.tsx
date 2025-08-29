import { javascript } from "@codemirror/lang-javascript";
import type { WebContainer } from "@webcontainer/api";
import { basicSetup, EditorView } from "codemirror";
import { useContext, useEffect, useRef } from "react";
import { CurrentFilePathContext } from "../context/CurrentFilePathContext";

const CodeEditor = ({ webcontainerInstance  } : {webcontainerInstance : WebContainer }) => {

const editorRef = useRef<HTMLDivElement>(null) ; 
const editorViewRef = useRef<EditorView>(null) ; 

const { currentFilePath } = useContext(CurrentFilePathContext) ; 

const readFile = async (filepath : string ) =>  { 
 const text  =  await  webcontainerInstance.fs.readFile(filepath,'utf-8') ; 
 return text ; 
}



const fillEditor = async () =>  { 
const editorContainer = editorRef.current! ; 
const view  = new EditorView( { 
    doc: await readFile(currentFilePath) , 
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
      })
    ] , 
})
editorViewRef.current = view ;
}

useEffect( ( ) => {
  fillEditor() ; 
  return () => editorViewRef.current!.destroy() ;
} , [currentFilePath])

  return (
    <div ref={editorRef} className="text-xs h-screen overflow-y-auto"> 
    </div>
  )

}

export default CodeEditor  