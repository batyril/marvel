import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../errorMessage/errorMessage';

function Page404() {
  return (
    <div>
      <ErrorMessage />
      <p>the current page was not found</p>
      <Link to='/'>go to the main page</Link>
    </div>
  );
}

export default Page404;
