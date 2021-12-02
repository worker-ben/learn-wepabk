import React, { useState } from "react";
import { Button } from 'antd';
import ToolTip from '../component/tooltip';

const ManagerHomePage = () => {
  const [array, setArray] = useState([1, 2, 3, 4, 5, 6]);
  const [first, setFirst] = useState(1);

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
    </>
  )
}

export default ManagerHomePage;