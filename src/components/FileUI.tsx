import type { File } from '../types/FileStructure'

const FileUI = ({ file , depth } : { file :File , depth : number }) => {
  return (
    <div className='file'>
       <div style={ { marginLeft : `${depth+4}px ` }} > <img src='file.svg' width={15}/>  </div>
       <div>{ file.name } </div>
    </div>
  )
}

export default FileUI