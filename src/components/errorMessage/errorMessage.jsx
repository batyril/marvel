import React from 'react';
import errorGif from './error.gif';

function ErrorMessage() {
  return (
    <img
      src={errorGif}
      alt='error gif'
      style={{ margin: '0 auto', paddingTop: '30px' }}
    />
  );
}

export default ErrorMessage;
