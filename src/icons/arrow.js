function Arrow({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="14"
      id="arrow"
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M1 7h16M11 1l6 6-6 6"></path>
      </g>
    </svg>
  )
}

export default Arrow
