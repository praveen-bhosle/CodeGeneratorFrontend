import type { WebContainer } from "@webcontainer/api";
//import { getCommand, getCommands,  } from "./utils";
import type { File } from "../types/FileStructure";

export async function writeFile( file :File  , webcontainerInstance : WebContainer ) { 
  console.log("Writing to file " + file.filepath)
  await webcontainerInstance.fs.writeFile(file.filepath,file.content) ; 
}

export async function updateFiles( files :File[] , webcontainerInstance : WebContainer) {
  for(let  i = 0 ; i<files.length ; i++) { 
    writeFile(files[i],webcontainerInstance) ; 
  }    
}

export async function installPackages(webcontainerInstance : WebContainer) {
  await webcontainerInstance.spawn('yarn' , ['install']) ; 
}

export async function  terminalStart() {
  
}


/*
 export async function executeCommand(commandString:string , webcontainerInstance : WebContainer) {    
  const commands = getCommands(commandString) ; 
  if(!commands) return ; 
  for(let  i = 0 ; i<commands.length  ; i++ ) { 
      console.log("running command " + commands[i]) ; 
      if(!commands[i]) { return  ; }
      let  x = getCommand(commands[i]) ;
      if(!x) return ;
      console.log(x.initial) ; 
      console.log(x.rest) ;  
      let process ;
      if(!x.rest) { 
        process = await webcontainerInstance.spawn(x.initial,x.rest) ;
      }
      else { 
      process = await webcontainerInstance.spawn(x.initial,x.rest) ;  
      }
      process.output.pipeTo( new WritableStream( { write(data) { console.log(data) }}))  
      const exitcode = await process.exit ;  
      if(exitcode!==0) throw new Error("error while running the command " +  commands[i] ) ;  
  } 
}
  */