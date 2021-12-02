import React, { useState } from "react";
import { Button, Modal } from 'antd';

const StudentHomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <div>This is student home page</div>
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