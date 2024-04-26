import React, { useMemo, useState } from "react";
import { Button, Col, Collapse, Input, Modal, Row } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import CustomLayout from "./Layout";
import { SelectFood } from "./Components/foodlist/selectFood";

function FoodList({sideBarValue}) {
  return (
    <div>
      <CustomLayout sideBarValue={sideBarValue}>
        <p>foodList</p>
  
      </CustomLayout>
    </div>
  )
}

export default FoodList
