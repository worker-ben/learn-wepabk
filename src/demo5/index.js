import React from "react";
import ReactDOM from "react-dom";
// import Input from 'mycomponents_weizhibin/lib/input';
import { Input, Button } from 'mycomponents_weizhibin';

const App = () => {
  if (process.env.NODE_ENV === 'development') {
    return <Input />
  }
  return <Button />
}

// 管理端应用
ReactDOM.render(<App />, document.getElementById('app'));