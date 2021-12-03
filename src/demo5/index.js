import React from "react";
import ReactDOM from "react-dom";
// import Input from 'mycomponents_weizhibin/lib/input';
import * as Component from 'mycomponents_weizhibin';

console.log('Component',Component);

const App = () => {
  return (
    <>
      <Component.Input />
    </>
  )
}

// 管理端应用
ReactDOM.render(App(), document.getElementById('app'));