// eslint-disable-next-line react/prop-types
export const InputBox = ({label,placeholder})=>{
    return (
        <div className="px-4 py-2"> 
            <div className="text-sm font-medium text-left ">
                {label}
            </div>
            <input placeholder={placeholder} className="w-full border-1 border-slate-400 rounded-sm"></input>

        </div>
    )
}