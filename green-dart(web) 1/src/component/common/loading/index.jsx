import React from 'react'
import "./index.css";
function Loading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "100px" }}>
        <span className="loader"></span>
    </div>
  )
}

export default Loading;