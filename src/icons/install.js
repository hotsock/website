import React from "react"

function Install({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      fill="none"
      viewBox="0 0 128 128"
      id="install"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="7"
        d="M74.5 29H35C26.1634 29 19 36.1634 19 45V75C19 83.8366 26.1634 91 35 91H93C101.837 91 109 83.8366 109 75V71"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="7"
        d="M48 98H80M108.941 49.1985L100.456 57.6838C95.7696 62.3701 88.1716 62.3701 83.4853 57.6838L75 49.1985M92.2271 58.479L92.227 37.9999"
      ></path>
    </svg>
  )
}

export default Install
