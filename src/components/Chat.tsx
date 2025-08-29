import { useState } from "react";
import { type Message } from "../types/Message"
import TextareaAutoSize from 'react-textarea-autosize' ; 

const Chat = ({ msgs } : { msgs : Message[] }) => {
  const [question , setQuestion] = useState('') ; 
  return (
    <div className="p-2 bg-[#101010] h-full "> 
      { 
         msgs.map( (msg,index) =>  { 
          let condition = index %2 ==0 ;
          if(condition)
          return  ( 
            <div className="flex justify-end"> 
              <div className="bg-[#262626] p-4 text-white rounded-md text-sm"> { msg.content }  </div>
            </div>
          )
          else {
            return ( 
            <div className="text-[#EDEDED] text-sm py-4"> 
            { msg.content}
            </div> )
          }
         })
      } 
      <div className="fixed w-[470px] bottom-3 border-1 border-white rounded-sm  ">
      <TextareaAutoSize minRows={1} className='w-full p-2 outline-none'  placeholder='Feel free to ask anything.' value={question} onChange={ (e) => setQuestion(e.target.value)    } /> 
      <div className="flex justify-end p-2"> 
      { question && <div className="w-[30px] bg-blue-400 "> <img className="w-[35px] block"  src = { '/submit.svg' } />   </div> }
      </div>
      </div>
    </div>
  )
}

export default Chat