import React, { useState } from "react";
import { Button, Modal } from 'antd';
// import {ToolTip} from '../component';

const StudentHomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <div>This is student home page</div>
      {/* <ToolTip></ToolTip> */}
      <Button type="primary" onClick={() => { setIsModalVisible(true) }}>Open Modal</Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={() => { setIsModalVisible(false) }} onCancel={() => { setIsModalVisible(false) }}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default StudentHomePage;