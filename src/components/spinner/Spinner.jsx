import React from 'react';

function Spinner() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{
        margin: 'auto',
        background: 'rgb(255, 255, 255)',
        display: 'block',
      }}
      width='150px'
      height='150px'
      viewBox='0 0 100 100'
      preserveAspectRatio='xMidYMid'
    >
      <g>
        <path
          d='M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843'
          fill='none'
          stroke='#c03636'
          strokeWidth='10'
        ></path>
        <path d='M49 -3L49 33L67 15L49 -3' fill='#c03636'></path>
        <animateTransform
          attributeName='transform'
          type='rotate'
          repeatCount='indefinite'
          dur='1s'
          values='0 50 50;360 50 50'
          keyTimes='0;1'
        ></animateTransform>
      </g>
    </svg>
  );
}

export default Spinner;
