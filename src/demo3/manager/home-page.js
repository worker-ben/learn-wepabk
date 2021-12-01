import React from "react";

// import Button from '../component/button';
// import { Button } from 'antd';
// import { Button as MyButton } from '../component';
import { add } from '../utils';

const ManagerHomePage = () => {
  add();
  return (
    <>
      <div>This is manager home page</div>
      {/* <Button /> */}
      {/* <MyButton /> */}
    </>
  )
}

export default ManagerHomePage;