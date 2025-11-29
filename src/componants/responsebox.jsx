import React from "react";
import "./textboxes.css";
import copy from "../assets/copy.svg";
import UserTextBox from "./userTextBox";

export default function ResponseBox({ response }) {
  const isErr = response.toLowerCase().includes("error:");

  function copyfun(){
    navigator.clipboard.writeText(response);

  }

  return (
    <>
      {isErr ? (
        <UserTextBox message={response} />
      ) : (
       
        <div className="resonseBox">
          <div className="top-side">
              <button className="cpy" onClick={() => copyfun()}>
                  <img src={copy} alt="" className="copy"  />
                  Copy
              </button>
          </div>
          {response}
        </div>
      )}
    </>
  );
}
