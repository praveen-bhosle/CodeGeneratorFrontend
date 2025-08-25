import { useState } from 'react';
import TextareaAutoSize from 'react-textarea-autosize' ; 
import { AxiosApiHandler } from '../api/AxiosApiHandler';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Index = () => {
 
const [question , setQuestion] = useState('') ; 
const navigator = useNavigate() ; 
const sendMessage = async () => {  
    const res = await AxiosApiHandler({ url : `/project/create?question=${question}` ,  method : 'post' }) ; 
    if(res.success) {  
      navigator(`/~/${res.data.projectId}`) ;
      return ; 
    }
    else { 
        alert( res.data);   
    }
}
  return (
    <div> 
        <div className='bg-black text-white p-4 h-[100vh]'>  
        <TextareaAutoSize minRows={2} className='w-full p-2 border border-white rounded' placeholder='Enter ur idea' value={question} onChange={ (e) => setQuestion(e.target.value)    } /> 
        <button className='bg-white text-black p-2'  onClick =  { () =>  {sendMessage()} }> Send  </button> 
        </div>  
    </div>
  )
}

export default Index