import React from "react"

const Wrapper = ({ className, children }) => {
  return (
    <div
      className={`mx-auto w-full max-w-screen-xl px-4 md:px-20 ${className}`}
    >
      {children}
    </div>
  )
}

export default Wrapper
