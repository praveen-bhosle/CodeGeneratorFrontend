import { useSearchParams } from "react-router-dom"
const ErrorPage = ( ) => {
  const [searchParams,_]  = useSearchParams() ; 
  const msg = searchParams.get('msg') ; 
  const status = searchParams.get('status') ; 
  return (
    <div className="bg-black text-white h-screen flex items-center justify-center">
        <div>
        {msg} 
        <br/> 
        {"Error Code :" + status}    
        </div>
    </div>
  )
}
export default ErrorPage