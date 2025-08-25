export type File = {
    id : number , 
    filepath : string , 
    content : string  
}

export type Directory = { 
    files :File[] , 
    directories : Directory[] , 
    name : string , 
    path : string 
}