import React from "react";
// 触发全部加载
import { Input } from '../component';
import { Button, Modal } from 'antd';

const OtherPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <div>This is other page</div>
      <Input />
      <Button type="primary" onClick={() => { setIsModalVisible(true) }}>Open Modal</Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={() => { setIsModalVisible(false) }} onCancel={() => { setIsModalVisible(false) }}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default OtherPage;