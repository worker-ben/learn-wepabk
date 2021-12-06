import React, { useState, lazy, Suspense } from "react";
import { Button, Modal} from 'antd';
import ToolTip from '../component/tooltip';

// 懒加载的组件
const OtherComponent = lazy(() => { return import('../component/button') })

const ManagerHomePage = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6]);
  const [first, setFirst] = useState(1);
  const [show, setShow] = useState(false);

  // 懒加载库
  const handleLazyLodashReverse = () => {
    import('lodash').then((data) => {
      const newArray = [...array];
      data.reverse(newArray);
      setArray(newArray);
    });
  }

  const handleGetFirst = () => {
    import('lodash').then((data) => {
      setFirst(data.first(array));
    });
  }

  return (
    <>
      <div>This is manager home page</div>
      {array.map((item => {
        return <div>{item}</div>
      }))}
      <Button type="primary" onClick={handleLazyLodashReverse}>Lazy Lodash Reverse</Button>
      <Button type="primary" onClick={handleGetFirst}>Get First Number</Button>
      <div>First is : {first}</div>
      <ToolTip />
      <Button type="primary" onClick={() => {
        setShow(true);
      }}>Show Lazy Component</Button>
      {show && (
        <Suspense fallback={<div>loading...</div>}>
          <div>
            <OtherComponent />
          </div>
        </Suspense>
      )}
    </>
  )
}

export default ManagerHomePage;