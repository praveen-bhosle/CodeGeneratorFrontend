const Button1 = ({text , onClick } : { text : string , onClick : () => void}) => {
  return (
    <div className="text-[#767676] cursor-pointer hover:text-white px-2 select-none text-sm" onClick={ onClick}> {text} </div>
  )
}

export default Button1