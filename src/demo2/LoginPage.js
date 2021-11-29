import React from 'react';
import './index.less';
import ReactIcon from './react.png';

const LoginPage = () => {
  return (
    <div className="content">
      <h1 className="title">Hello Please Login</h1>
      <img src={ReactIcon} />
    </div>
  )
}

export default LoginPage;