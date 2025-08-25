import { Sender, type Message } from "../types/Message";

export function  processMessages( messages : Message[] ) {  
    const userMessages:Message[] = [] ; 
    const instructions:Message[] = [] ; 
    for(const msg of messages ) { 
        if( msg.sentBy === Sender.USER ) userMessages.push(msg) ; 
        else instructions.push(msg) ; 
     }
    return { userMessages , instructions } ; 
}
