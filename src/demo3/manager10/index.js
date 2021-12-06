import React from "react";
import ReactDOM from "react-dom";
import ManagerHomePage from "./home-page";
import OtherPage from './other-page';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <>
      <ManagerHomePage />
      <OtherPage />
    </>
  )
}

// 管理端应用
ReactDOM.render(App(), document.getElementById('app'));