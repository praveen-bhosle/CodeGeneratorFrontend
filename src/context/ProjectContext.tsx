import { createContext } from "react";
export const ProjectContext = createContext<{id:number,fileObject:any,setFileObject:React.Dispatch<React.SetStateAction<any| null>>}|null>(null);  