export  enum Sender { 
    SYSTEM , 
    USER , 
    ASSISTANT
}

export type Message = { 
    id: number , 
    content : string , 
    sentBy :   Sender 
}