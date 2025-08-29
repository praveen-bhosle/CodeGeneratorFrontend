import { createContext } from "react";

export const CurrentFilePathContext = createContext<{currentFilePath : string , setCurrentFilePath :  null | React.Dispatch<React.SetStateAction<string>> }>({currentFilePath: '' , setCurrentFilePath : null }) ; 