import { EditorView } from "codemirror";
import { basicSetup } from "codemirror";
import { useEffect, useRef } from "react";
import {javascript } from "@codemirror/lang-javascript" 

const CodeEditor = ( filePath : string   ) => { 
const editorRef = useRef<HTMLDivElement>(null) ; 

const readFile = () =>  { 
    
}

useEffect( ( ) => {
const editorContainer = editorRef.current! ; 
const view  = new EditorView( { 
    doc: "console.log(\"hello\") \nfunction a() {console.log(\"hi\") } " , 
    parent : editorContainer  , 
    extensions : [basicSetup, javascript({typescript:true}) ] 
})
return () => view.destroy() 
}  ,[] ) 
return <div ref={editorRef}> </div>
}

export default CodeEditor ; 