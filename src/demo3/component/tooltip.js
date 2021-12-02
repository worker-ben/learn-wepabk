import React, { useState } from "react";
import { Button } from 'antd';

const ToolTip = () => {
  const [array, setArray] = useState([7, 8, 9, 10, 11]);
  // 懒加载库
  const handleLazyLodashReverse = () => {
    import('lodash').then((data) => {
      const newArray = [...array];
      data.reverse(newArray);
      setArray(newArray);
    });
  }
  return (
    <>
      <Button onClick={handleLazyLodashReverse}>Reverse</Button>
      <div>{
        [...array]
      }</div>
    </>
  )
}

export default ToolTip;