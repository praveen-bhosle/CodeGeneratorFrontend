import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import type { Project } from "../types/Project";
import { AxiosApiHandler } from "../api/AxiosApiHandler";
import Chat from "./Chat";

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
    useEffect( () => { 
        if(isNaN(parsedId)) router('/error') ;     
        fetchProject(parsedId) ;  
    },[]) 
    return ( 
        <div className="bg-black text-white h-screen flex justify-center items-center"> 
            { 
            project ? 
            <div className="w-screen h-screen flex">
                <div className="basis-1/3">   
                <Chat msgs={project.messages} /> 
                </div>
                <div className="basis-2/3"> 
                
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