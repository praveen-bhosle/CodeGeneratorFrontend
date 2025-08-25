import type { File } from "./FileStructure"
import type { Message } from "./Message"

export type Project =  { 
    id: number , 
    title : string , 
    messages : Message[] , 
    files : File[]
}