import React from "react";
import "./textboxes.css";

export default function UserTextBox({ message }) {
  const isErr = message.toLowerCase().includes("error:");

  return (
    <div className={`userBox ${isErr ? "error" : ""}`}>
      {message}
    </div>
  );
}
