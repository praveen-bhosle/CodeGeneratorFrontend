import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types/Project";
import { AxiosApiHandler } from "../api/AxiosApiHandler";
import Chat from "./Chat";
import MainContainer from "./MainContainer";

const ProjectPage = () => {
    const {id}  = useParams() ;
    const router = useNavigate() ;
    const [ project  , setProject ]  = useState<Project|null>(null) ;
    const parsedId = parseInt(id!) ;
    const fetchProject = async (id : number ) => { 
        const response  = await AxiosApiHandler( {  url : `/project/${id}` , method : "get" }) ; 
        if(!response.success) router(`/error?msg=${response.data}&status=${response.status}`) ; 
        setProject(response.data) ; 
    }
    const [chatHidden  , setChatHidden ] = useState(false) ; 
    useEffect( () => { 
        if(isNaN(parsedId)) router('/error') ;     
        fetchProject(parsedId) ;  
    },[]) 

    return ( 
        <div className="bg-black text-white h-screen flex justify-center items-center "> 
            { 
            project ? 
            <div className="w-screen h-screen flex">
                {
                !chatHidden  && 
                <div className="shrink-0 w-[500px] p-2">   
                <Chat msgs={project.messages} /> 
                </div> 
                }
                <div className="flex-1 p-3 bg-[#101010]"> 
                <MainContainer files = { JSON.parse(project.files)  } setChatHidden = { setChatHidden} chatHidden = { chatHidden}  /> 
                </div>
            </div> 
            :
            <div> 
            Fetching project details.
            </div> 
            }
        </div>
    )
}

export default ProjectPage