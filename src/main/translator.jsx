import React, {useState} from "react";
import "./pages.css"
import copy from "../assets/copy.svg"

import axios from "axios";



export default function Translator(){
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false) 
    const [output, setOutput] = useState("")
    const [from, setFrom] = useState("algo")
    const [to, setTo] = useState("python")


        async function sendToBackend() {
        if(input === "") {
          return 
        }
        setLoading(true) 
        try {
            const response = await axios.post("http://localhost:5000/api/trans", {
                code: input,
                from:from,
                to:to
            });

            if (response.data.message === "success") {
              setOutput(response.data?.response );
            } else {
              setOutput("error: " + (response.data?.message || "Unknown error"));
            }
            
        } catch (err) {
          setOutput("error: server is propably down try again later! ");
          console.error(err)
          // surface backend JSON error when available (404/500 will be present here)
          if (err.response && err.response.data && err.response.data.message) {
            setOutput("error: " + err.response.data.message);
          } else {
            setOutput("error: server is propably down try again later! ");
          }
          console.error(err)
        } finally {
          setLoading(false) 
        }
    }

    function copyfun(){
    navigator.clipboard.writeText(output);

  }

    return <>
        <h1 className="tran-text">Translator</h1>
        <div className="parent-trans">
            <div className="trans int">
                <div className="trans-top">
                    <select name="" id="" value={from} onChange={(e) => {
                        if(e.target.value === to){
                            setTo(from)
                            setFrom(e.target.value)
                        }else{
                            setFrom(e.target.value)
                        }
                    }}>
                        <option value="algo">algo</option>
                        <option value="python">python</option>
                        <option value="JS">JS</option>
                        <option value="c">c</option>
                        <option value="c++">c++</option>
                        <option value="java">java</option>
                        <option value="lua">lua</option>
                        <option value="rust">rust</option>
                        <option value="ruby">ruby</option>
                    </select>
                    <button
                      className="translate-btn"
                      onClick={sendToBackend}
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? (
                        <>
                          <span className="btn-spinner" aria-hidden="true"></span>
                          Translating
                        </>
                      ) : (
                        "translate"
                      )}
                    </button>
                </div>
                <textarea name="" id="" className="to-trans"
                value={input} onChange={(e) => {setInput(e.target.value)}} >

                </textarea>
            </div>
            <div className="trans out">
                <div className="trans-top">
                     <select name="" id="" value={to} onChange={(e) => {
                        if(e.target.value === from){
                            setFrom(to)
                            setTo(e.target.value)
                        }else{
                            setTo(e.target.value)
                        }
                        
                    }}>
                        <option value="algo">algo</option>
                        <option value="python">python</option>
                        <option value="JS">JS</option>
                        <option value="c">c</option>
                        <option value="c++">c++</option>
                        <option value="java">java</option>
                        <option value="lua">lua</option>
                        <option value="rust">rust</option>
                        <option value="ruby">ruby</option>
                    </select>
                    <button className="cpy" id="cpy" onClick={() => copyfun()}>
                        <img src={copy} alt="" className="copy" />
                        Copy
                    </button>
                </div>
                
                <textarea name="" id="" className="to-trans" readOnly value={output}>
                    
                </textarea>
            </div>
        </div>
    </>
}