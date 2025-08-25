import { FitAddon  } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { Terminal as XTerm } from "@xterm/xterm"; 
import { useEffect, useRef } from "react";
import '@xterm/xterm/css/xterm.css';
import type { WebContainer } from "@webcontainer/api";


export const Terminal  = ( {  webcontainerInstance } : { webcontainerInstance : WebContainer }  ) => { 

    const terminalRef = useRef<XTerm>(null) ; 
    const terminalElementRef = useRef<HTMLDivElement>(null) ;  

    async function startShell( terminal : XTerm) { 
        const shellProcess = await webcontainerInstance.spawn('jsh') ; 
        shellProcess.output.pipeTo( new WritableStream( {  write(data) { terminal.write(data) } }) ) 
        const input = shellProcess.input.getWriter() ; 
        terminal.onData((data) =>  { input.write(data)} ) ; 
    }
 
    useEffect( () => { 
        const element = terminalElementRef.current! ; 
        const fitAddon = new FitAddon() ; 
        const webLinksAddon = new WebLinksAddon() ;  
        const terminal = new XTerm({ convertEol : true ,  cursorBlink : true  })  
        terminalRef.current = terminal ; 
        terminal.loadAddon(fitAddon) ; 
        terminal.loadAddon(webLinksAddon) ;
        terminal.open(element) ; 
        startShell(terminal) ;  
        const resizeObserver =  new  ResizeObserver( () => { 
            fitAddon.fit()  ;   
        })
        return () => { 
            resizeObserver.disconnect()  ; 
            terminal.dispose() ; 
        }
    } , [])  
    return  <div ref={terminalElementRef}  className="terminal"> </div>
}
