import { Tooltip } from "antd";
import React from "react";

function Chip({ type, content, index,className,isTooltip }) {
  const chipStyle = {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase",
    margin: "4px",
  };

  const getColorType = (type) => {
    switch (type) {
      case 'success':
        return { backgroundColor: 'green', color: 'white' };
      case 'info':
        return { backgroundColor: 'blue', color: 'white' };
      case 'warning':
        return { backgroundColor: 'orange', color: 'black' };
      case 'danger':
        return { backgroundColor: 'red', color: 'white' };
      default:
        return { backgroundColor: 'gray', color: 'white' };
    }
  };
  const getColorNumber = (index) => {
    switch (index) {
      case 1:
        return { backgroundColor: "green", color: "white" };
      case 2:
        return { backgroundColor: "blue", color: "white" };
      case 3:
        return { backgroundColor: "orange", color: "black" };
      case 4:
        return { backgroundColor: "red", color: "white" };
      default:
        return { backgroundColor: "gray", color: "white" };
    }
  };
  const chipColor = type ? getColorType(type) : getColorNumber(index);

  return <Tooltip title={isTooltip ?content:''} ><span style={{ ...chipStyle, ...chipColor }} className={className}>{content}</span></Tooltip> ;
}

export default Chip;
