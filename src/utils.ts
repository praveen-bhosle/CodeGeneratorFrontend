export type file = { 
    filepath : string , 
    content : string 
}

export type instructionsType = { 
    setup : string , 
    addDependencies : string 
    installDependencies : string , 
    files : file[] , 
    start : string 
}

export function getCommand(commandString:string) { 
    if(!commandString) return ; 
    const commands = commandString.split(' ') ; 
    return {  initial :  commands[0]  , rest : commands.slice(1) }
}

export function getCommands(commandString:string) { 
    if(!commandString) { return ; }    
    return commandString.split('&&').map( str => str.trim())  ; 
 }
