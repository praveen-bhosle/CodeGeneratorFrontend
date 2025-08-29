const PreviewContainer = ( { url } : { url :string } ) => {
  return (
    <div  className='w-full h-full border-2 border-red-500' > 
        <iframe src={url}  className=' p-2 w-full h-full relative top-0 left-0'/> 
    </div>
  )
}

export default PreviewContainer