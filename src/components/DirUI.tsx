import { useState } from "react";
import type { Directory } from "../types/FileStructure"
import FileUI from "./FileUI";

const DirUI = ( { dir ,  depth  } :  {dir:Directory , depth: number }) => {
  const files = dir.files ; 
  const subDirs =  dir.directories ; 
  const [isOpen,setIsOpen] = useState( depth === 0  ?  true :  false) ; 

  return (
    <div> 
        <div className="file"  onClick={ () => { setIsOpen( prev => !prev  ) }}>  
            <div style={ { marginLeft : `${depth}px`}} >  { isOpen ?  <img  width={35} src={'v.svg'}/>  : <img  width={35} src={'>.svg'}/>  } </div>
            <div > {dir.name}  </div>    
        </div>
        { isOpen &&
        <div className="">
            <div> 
                { subDirs.map ( dir => <DirUI dir = {dir} depth={ depth+10 } /> ) }
            </div>  
            <div> 
                { files.map ( file => <FileUI file = {file} depth={depth+10 } />   )} 
            </div>
        </div>
        }
    </div>
  )
}

export default DirUI