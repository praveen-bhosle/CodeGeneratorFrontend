import CodeEditor from "./CodeEditor";
import FileTree from "./FileTree";
import type { WebContainer } from "@webcontainer/api";
import { FilesContext } from "../context/FilesContext";
import { useState } from "react";
import type { FileBuffer } from "../types/FileBuffer";

const IDE = (  { webcontainerInstance } : { webcontainerInstance : WebContainer  }) => {    
const [ currentFiles , setCurrentFiles ] = useState<FileBuffer[]|null>([]) ; 
const [openedFilePath , setOpenedFilePath] = useState<string|null>("/index.html") ; 
return  ( 
<div className="flex border-white border- h-[93vh]"> 
    <FilesContext value = {{ currentFiles ,setCurrentFiles , openedFilePath , setOpenedFilePath  }} >
        <FileTree webcontainerInstance={ webcontainerInstance }  /> 
        <CodeEditor  webcontainerInstance={webcontainerInstance} /> 
    </FilesContext> 
</div>
) 
}

export default IDE ; 