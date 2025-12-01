import React, { useState, useRef } from "react";
import InputBar from "../componants/inputBar";
import UserTextBox from "../componants/userTextBox";
import ResponseBox from "../componants/responsebox";
import "./pages.css";
import axios from "axios";
import LoadingBar from "../componants/loading";



export default function Prof({url, context, setContext}) {
  

  const [prob, setProb] = useState("");
  const [sol, setSol] = useState("");
  const [loading, setLoading] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState([])
  const [attachedFiles2, setAttachedFiles2] = useState([])
  const problemRef = useRef(null)
  function scrollToBottom() {
    if (!problemRef.current) return
    problemRef.current.scrollTo({ top: problemRef.current.scrollHeight, behavior: "smooth" })
  }
    async function sendToBackend() {
      if (prob === "" && sol === "") {
        return;
      }
      setLoading(true);
      try {
        const response = await axios.post(url+"/api/prof", {
          prob,
          sol
        });
        console.log(response.data.response)
        if ( response.data?.message === "success") {
          
          setContext(prev => [...prev, { prob: prob, sol: sol }]);
          setContext(prev => [...prev, {phrase:response.data?.response.judge , note:`${response.data?.response.mark}/20`, correction:response.data?.response.code}]);

          setProb("");
          setSol("");
          setAttachedFiles([])
          setAttachedFiles2([])
        } else {
          setContext(prev => [...prev, { prob: prob, sol: sol }]);
          setContext(prev => [...prev, { err: "error: "+ response.data?.response.message}]);
        }

      } catch (err) {
        setContext(prev => [...prev, { prob: prob, sol: sol }]);
        setContext(prev => [...prev, { err: "error: "+ "server is porpably down"}]);
        console.error(err);
      } finally {
        setLoading(false);
        requestAnimationFrame(scrollToBottom)
      }
  }

  return (
    <>
      <div className="problem" ref={problemRef}>
        {context.map((text, index) => {
          if (text.prob) {
            return (
              <div key={index} className="prob-sol">
                <UserTextBox message={text.prob} />
                <UserTextBox message={text.sol} />
              </div>
            );
          }

          if (text.phrase) {
            return (
              <div key={index} id="mtop">
                <UserTextBox message={text.phrase} />
                <UserTextBox message={text.note} />
                <ResponseBox response={text.correction} />
              </div>
            );
          }

          if (text.err) {
            return (
              <div key={index} className="user-parent">
                <UserTextBox message={text.err} />
              </div>
              
            );
          }
        })}

        {loading && (<LoadingBar />)}
      </div>
      


      <div className="inputbar-parent">
        <InputBar holder="problem" content={prob} setContent={setProb} sendToBackend={sendToBackend}
        attachedFiles={attachedFiles} setAttachedFiles={setAttachedFiles} />
        <InputBar holder="solution" content={sol} setContent={setSol} sendToBackend={sendToBackend} 
        attachedFiles={attachedFiles2} setAttachedFiles={setAttachedFiles2}/>
      </div>
    </>
  );
}
