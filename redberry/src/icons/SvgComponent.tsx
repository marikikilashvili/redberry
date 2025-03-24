import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#a)">
      <path d="M16 14h-1.333v-2c0-3.334-2.666-6-6-6H5.334V4.665h3.333a7.312 7.312 0 0 1 7.334 7.333v2ZM2 5.333l3.333 3.334V2L2 5.333Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
