import { createContext } from "react";
import  type { FileBuffer } from "../types/FileBuffer";

export const FilesContext = createContext< {currentFiles : FileBuffer[] | null ,setCurrentFiles : React.Dispatch<React.SetStateAction<FileBuffer[]| null>> | null , openedFilePath : string | null  , setOpenedFilePath :  React.Dispatch<React.SetStateAction<string| null>> | null   } >  ({ currentFiles: null  , setCurrentFiles : null  , openedFilePath :  null , setOpenedFilePath : null   }) ; 