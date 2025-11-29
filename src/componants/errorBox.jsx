import "./textboxes.css"

export default function Err({message}){
    return <>
        <div className="userBox eror">
            {message}
        </div>
    </> 
}