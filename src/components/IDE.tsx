import CodeEditor from "./CodeEditor2";
import FileTree from "./FileTree";
import type { WebContainer } from "@webcontainer/api";
import { CurrentFilePathContext } from "../context/CurrentFilePathContext";
import { useState } from "react";

const IDE = (  { webcontainerInstance } : { webcontainerInstance : WebContainer  }) => {    

const [ currentFilePath , setCurrentFilePath ] = useState('/index.html') ; 

return  ( 
<div className="flex border-white border-2"> 
<CurrentFilePathContext value={ {currentFilePath , setCurrentFilePath}} >
    <FileTree webcontainerInstance={ webcontainerInstance }  /> 
    <CodeEditor  webcontainerInstance={webcontainerInstance} /> 
</CurrentFilePathContext>
</div>
) 

}

export default IDE ; 