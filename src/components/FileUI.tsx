import { useContext } from 'react'
import type { File } from '../types/FileStructure'
import { FilesContext } from '../context/FilesContext'


const FileUI = ({ file , depth } : { file :File , depth : number }) => {
  const   { setOpenedFilePath , currentFiles  }  = useContext(FilesContext) ; 
  const currentFile =  currentFiles!.find( fileBuf => fileBuf.path === file.path  ) ; 
  return (
    <> 
    <div className='flex items-center border- '>
    <div className='file '  onClick={ () =>  { setOpenedFilePath!(file.path) ; console.log(file.path) }   } >
       <div style={ { marginLeft : `${depth+4}px ` }} className='basis-[15%] flex-none border-' > <img src='/file.svg' width={15} />  </div>
       <div className='basis-[80%] flex-none truncate' >{ file.name }  </div>
    </div>
    <div className=''>
    { currentFile?.buffer != currentFile?.content ? <img className='w-[35px]'  src='/dot.svg'  />  : <img className='w-[35px]'  src='/dot2.svg'  /> }
    </div>
    </div> 
    </>
  )
}

export default FileUI