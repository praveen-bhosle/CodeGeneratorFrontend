import './App.css'

import { useEffect, useState } from 'react';
import MainContainer from './components/MainContainer';
import { instructionsType } from './utils';
import { useParams } from 'react-router-dom';
import { AxiosApiHandler } from './api/AxiosApiHandler';
import type { Project } from './types/Project';
import { processMessages } from './utils/ProcessMessages';


function App() {

const [ question , setQuestion ] = useState('') ;
const [instructions , setInstructions] = useState<instructionsType|null>(null) ; 
const { id } = useParams() ; 

useEffect( () => {  
  if(!id)  { alert('id missing') ;   return ;  } 
  if(isNaN(parseInt(id))) { alert('id is not a number') ;   return  ;  } 
  const getProjectDetails  = async () => { 
    const project:Project = await AxiosApiHandler({url:`project/${id}` , method : 'get'}).then(res=>res.data) ; 
    const { userMessages , instructions } = processMessages(project.messages) ; 
  }
  getProjectDetails(); 
},[id] ) ;

  return (
    <div> 
    <div className='flex w-[100vw] h-[100vh] border-black border-2 bg-black text-white'>  
    <div className='flex-1/3 border-2 p-2 '> 
       <textarea value = { question} onChange={ (e) => setQuestion(e.target.value)}  className='border-1 h-[200px] w-max p-2 ' />  <br/> 
       <button onClick={   async () => {  } }  className='bg-white text-black p-2 m-2' > Send </button>
    </div>
    <div className='flex-2/3'> 
      <MainContainer /> 
    </div>
    </div>
    </div>
  )

}

export default App