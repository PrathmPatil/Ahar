import { Button, Col, Input, Modal, Row, Tooltip, message } from "antd";
import React, { useState } from "react";
import Buttons from "../../Common/Buttons";
import Title from "../../Common/Title";
import Dropdown from "../../Common/Dropdown";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "../../globle.scss";
import Confirm from "../../Common/Confirm";

export const SelectFood = ({
  OPTIONS,
  selectedItems,
  setSelectedItems,
  setOptions,
}) => {
  const [newItem, setNewItem] = useState("");
  const [openModal, setOpenModal] = useState(false);
const [openConfirm,setOpenConfirm]=useState(false)
  const onChange = (e) => {
    setNewItem(e.target.value);
  };

  const addNew = () => {
    if (!newItem.trim()) {
      message.error("Please enter a valid item.");
      return;
    }

    if (OPTIONS.includes(newItem)) {
      message.error("Item already exists.");
      return;
    }
    console.log(OPTIONS)

    let newoption=[]
    newoption=OPTIONS
    newoption.push(newItem)
    setOptions(newoption);
    console.log(newoption,OPTIONS)

    setNewItem("");
  };

  const handleRemove = (itemToRemove) => {
     console.log(itemToRemove)
    const updatedOptions = OPTIONS.filter((item) => item !== itemToRemove);
    const updatedSelectedOptions = selectedItems.filter(
      (item) => item !== itemToRemove
    );
    console.log(updatedOptions,updatedSelectedOptions)
    setSelectedItems(updatedSelectedOptions);
    setOptions(updatedOptions);
    setOpenConfirm(false)
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Title title="Select" isRequired={true} />
          <Dropdown
            OPTIONS={OPTIONS}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            setOptions={setOptions}
          />
        </Col>
        <Col span={12}>
          <Title title="Add New Item" />
          <div style={{ display: "flex" }}>
            <Input
              value={newItem}
              onChange={onChange}
              className="addinput"
            />
            <Button
              onClick={addNew}
              color="blue"
              title="Add"
              className="submit"
            >
              Add
            </Button>
            <Tooltip title={"View Available Items"}>
              <EyeOutlined
                onClick={() => setOpenModal(true)}
                style={{ margin: "10px" }}
              />
            </Tooltip>
          </div>
        </Col>
      </Row>
      <Buttons />
      <Modal
        visible={openModal}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={false}
      >
        <Row gutter={[16, 16]}>
          {OPTIONS.map((item) => (
            <Col key={item} span={8} style={{ display: "flex" }}>
              <h6
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Tooltip title={item}>
                  <span>{item}</span>
                </Tooltip>
              </h6>
              <span
                style={{ marginLeft: "8px", cursor: "pointer" }}
                onClick={() =>setOpenConfirm(item)}
              >
                <DeleteOutlined />
              </span>
            </Col>
          ))}
        </Row>
      </Modal>
      <Confirm open={openConfirm} cancle={()=>setOpenConfirm(false)} title={"Are You Sure?"} subtitle={"are you sure for delete the item?"} submit={()=>handleRemove(openConfirm)} />
    </>
  );
};
