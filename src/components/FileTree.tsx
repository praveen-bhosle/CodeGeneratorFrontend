import type { WebContainer } from "@webcontainer/api"
import { useContext, useEffect, useState } from "react";
import type { Directory } from "../types/FileStructure";
import DirUI from "./DirUI";
import FileUI from "./FileUI";
import { FilesContext } from "../context/FilesContext";

const FileTree = ({webcontainerInstance  } : { webcontainerInstance : WebContainer }) => { 
  const [dir,setDir] = useState<Directory|null>(null) ; 
  const { currentFiles } = useContext(FilesContext) ; 
  async function  getFilesInCurrentDir( path : string ) { 
    const files = await webcontainerInstance.fs.readdir(path , { withFileTypes : true }) ; 
    return files ; 
  } 
  async function dirTraversal(  dirName:string  , dirPath:string ) { 
    const mainDir : Directory = { files : [] , directories : [] , name : dirName ,   path: dirPath } ; 
    const entries = await  getFilesInCurrentDir(dirPath) ;  
    for(const entry of entries ) { 
        const name = entry.name ; 
        const path = dirPath ?  dirPath + '/' + entry.name : '/' +  entry.name ; 
        if(entry.isFile()) {  
            mainDir.files.push({name,path}) ; 
        }
        else if (entry.isDirectory()) {  
            if(name==='node_modules') continue ; 
            const  currentDir = await dirTraversal( name  , path) ;    
            mainDir.directories.push(currentDir) ; 
        }
    }
    return mainDir ; 
  }
  async function update() { 
    const currentDir = await dirTraversal('','') ; 
    setDir(currentDir) ; 
  }

  useEffect( () => {  
    update() ; 
    console.log("updating filetree") ; 
  } , [currentFiles])


  return (
    <div className="text-sm border-1 bg-[#171717] border-[#2F2F2F] px-[4px]">  
     { dir && dir.directories.map( (dir,idx) =>  <DirUI dir={dir} depth={0} key={idx}   />  ) } 
     { dir && dir.files.map((file,idx) => <FileUI file={ file } depth={0} key={idx}  /> ) }
    </div> 
  )
}

export default FileTree