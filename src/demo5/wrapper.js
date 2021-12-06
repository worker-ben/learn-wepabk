import React from "react";

// 判断环境，返回合适的组件
const Wrapper = (props) => {
  const { internalComponent, externalComponent } = props;

  let result = (
    <div>no content</div>
  );

  if (process.env.NODE_ENV === 'development' && internalComponent) {
    result = internalComponent;
  }

  if (process.env.NODE_ENV === 'production' && externalComponent) {
    result = externalComponent;
  }

  return result;
}

export default Wrapper;
