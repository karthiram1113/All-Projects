import React from 'react'
import { FadeLoader } from 'react-spinners'

function Loading() {
  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "100px" }}>
            <FadeLoader color="#0cc0df" />
        </div>
    </>
  )
}

export default Loading