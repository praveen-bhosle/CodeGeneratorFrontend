export type File = {
    name : string , 
    path : string 
}

export type Directory = { 
    files :File[] , 
    directories : Directory[] , 
    name : string , 
    path : string 
}