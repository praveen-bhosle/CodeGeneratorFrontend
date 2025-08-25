import CodeEditor from "./CodeEditor"
import FileTree from "./FileTree"

const IDE = () => {
  return (
    <div className="flex"> 

        <FileTree  />  
        <CodeEditor   /> 
    </div>
  )
}

export default IDE