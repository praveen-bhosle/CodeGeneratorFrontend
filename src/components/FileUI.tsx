import { useContext } from 'react'
import type { File } from '../types/FileStructure'
import { CurrentFilePathContext } from '../context/CurrentFilePathContext'


const FileUI = ({ file , depth } : { file :File , depth : number }) => {

  const   { setCurrentFilePath }  = useContext(CurrentFilePathContext) ;  

  return (
    <div className='file' onClick={ () =>  { setCurrentFilePath!(file.path) ; console.log(file.path) }   } >
       <div style={ { marginLeft : `${depth+4}px ` }} > <img src='/file.svg' width={15} />  </div>
       <div>{ file.name } </div>
    </div>
  )
}

export default FileUI