import { Sender, type Message } from "../types/Message"

const Chat = ({ msgs } : { msgs : Message[] }) => {
  return (
    <div className="border-[2px] border-white p-2 flex max-w-[50%]"> 
      { 
         msgs.map( (msg,index) =>  { 
          let condition = msg.sentBy === Sender.USER ;
          return  ( 
            <div key={index} style={ { justifyItems : condition ? 'left'  : 'right' , color : condition ? '#212121' : '#766AC8' }}> 
            {msg.content}
            </div>
          )
         })
      }
    </div>
  )
}

export default Chat