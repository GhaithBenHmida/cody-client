
import attatch from "../assets/attatch.svg"
import send from "../assets/send.svg"
import "./inputBar.css"

export default function InputBar({holder = "write your problem or upload an img", using="", content, setContent, sendToBackend
    ,setAttachedFiles,attachedFiles
}){
    
    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setAttachedFiles(prev => [...prev, ...newFiles]);
        e.target.value = "";
    }

    const removeFile = (index) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index));
    }

    const handleAttachClick = () => {
        document.getElementById("f").click();
    }

    return <>
   
        
        <div className={`input-bar ${using}`} >
            {attachedFiles.length > 0 && (
         <div className="files">
            {attachedFiles.map((file, index) => (
            <div className="file-item"key={index}>
                <div className="filename">{file.name}</div>
                <button 
                    className="file-remove"
                    onClick={() => removeFile(index)}
                    aria-label={`Remove ${file.name}`}>
                    ✕
                    </button>
                
            </div>
            ))}
        </div>
    )}
    <div className="inp-right">
            <textarea
            className="intput-bar-text"
            placeholder={holder}
            value={content}
            style={{height:"30px"}}
            onInput={(e) => {
                setContent(e.target.value)
                e.target.style.height = "41px"
                e.target.style.height = `${e.target.scrollHeight}px`;
                if (!content || content.trim() === "") {
                    e.target.style.height = "41px"
                }else{
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }
            }}
            ></textarea>
            <input 
                    type="file" 
                    name="fileInput" 
                    id="f"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt"
                />
            <div className="bar-btn" onClick={handleAttachClick}> <img src={attatch} alt="" className="bar-btn-img" id="scnd-img" /> </div>
            <div className="bar-btn" onClick={() => sendToBackend()}> <img src={send} alt="" className="bar-btn-img"  /> </div>
            </div>
        </div>

    </>
}