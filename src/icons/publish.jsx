import React from "react";

function Publish({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      fill="none"
      viewBox="0 0 128 128"
      id="publish"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="7"
        d="M85 78.5L72.4853 65.9853C67.799 61.299 60.201 61.299 55.5147 65.9853L43 78.5M64.2363 97L64.2363 64.1754"
      ></path>
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="7"
        d="M29 57L29 55C29 41.7452 39.7452 31 53 31L75 31C88.2548 31 99 41.7452 99 55L99 57"
      ></path>
    </svg>
  );
}

export default Publish;
