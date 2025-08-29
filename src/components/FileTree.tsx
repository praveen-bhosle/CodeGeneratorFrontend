import type { WebContainer } from "@webcontainer/api"
import { useEffect, useState } from "react";
import type { Directory } from "../types/FileStructure";
import DirUI from "./DirUI";
import FileUI from "./FileUI";

const FileTree = ({webcontainerInstance  } : { webcontainerInstance : WebContainer }) => { 
  const [dir,setDir] = useState<Directory|null>(null) ; 
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
  } , [])

  return (
    <div className="bg-black text-sm">  
     { dir && dir.directories.map( (dir,idx) =>  <DirUI dir={dir} depth={0} key={idx}   />  ) } 
     { dir && dir.files.map((file,idx) => <FileUI file={ file } depth={0} key={idx}  /> ) }
    </div> 
  )
}

export default FileTree