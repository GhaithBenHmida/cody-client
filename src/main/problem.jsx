import React, {useState} from "react";
import InputBar from "../componants/inputBar";
import UserTextBox from "../componants/userTextBox";
import ResponseBox from "../componants/responsebox";
import "./pages.css"
import axios from "axios"
import LoadingBar from "../componants/loading";



export default function Problem({context, setContext, url}){
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [attachedFiles, setAttachedFiles] = useState([])

      async function sendToBackend() {
        if(input === "" && attachedFiles == []) {
          return 
        }
        setLoading(true) 
        try {
          const formData = new FormData();

          formData.append("query", JSON.stringify([...context, input]));

          attachedFiles.forEach((file) => {
            formData.append("files", file);
          });

          const response = await axios.post(
            url+"/api/problem",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
            if (response.data.message === "success") {
              setContext(prev => [...prev, input, response.data?.response || "No response"]);
              setInput("");
            } else {
              setContext(prev => [...prev, input, "error: " + (response.data?.message || "Unknown error")]);
            }
            
        } catch (err) {
          setContext(prev => [...prev, input, "error: server is propably down try again later! "]);
          console.error(err)
        } finally {
          setLoading(false) 
        }
    }

    return <>
    <div className="problem">
        {context.map((text, index) =>
          index % 2 === 0 ? (
            <div key={index} className="user-parent">
              <UserTextBox message={text} />
            </div>
          ) : (
            <ResponseBox key={index} response={text} />
          )
        )}
        {loading && (<LoadingBar />)}

    </div>
    <div className="inputbar-parent">
        <InputBar content={input} setContent={setInput} sendToBackend={sendToBackend} 
        attachedFiles={attachedFiles} setAttachedFiles={setAttachedFiles}/>
     </div>
    </>
}