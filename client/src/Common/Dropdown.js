import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { Select, Space, Tag } from "antd";
import React from "react";

function Dropdown({
  OPTIONS,
  selectedItems,
  setSelectedItems,
  placeholder,
  isMultiple,
}) {
  const handleChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const options = OPTIONS.map((item) => ({
    value: item,
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{item}</span>
        {/* <span style={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => handleRemove(item)}>
        <DeleteOutlined />
        </span> */}
      </div>
    ),
  }));
  //for single select
  const tagRender = (props) => {
    const { label, onClose } = props;
    return (
      <Space>
        <span>{label}</span>
        <CloseOutlined onClick={(e) => onClose(e)} />
      </Space>
    );
  };

  const selectSingleProps = {
    tagRender: tagRender,
    value: selectedItems,
    onChange: handleChange,
    placeholder: placeholder,
  };

  const sharedSingleProps = {
    mode: "tags",
    style: {
      width: "100%",
    },
    options: options,
  };

  //for multi select
  const selectProps = {
    selectedItems,
    onChange: handleChange,
  };
  const sharedProps = {
    mode: "multiple",
    style: {
      width: "100%",
    },
    options: options,
    placeholder: placeholder,
    maxTagCount: "responsive",
  };
  return (
    <>
      {isMultiple ? (
            <Select
            // mode="tags"
            // placeholder={placeholder}
            // value={selectedItems}
            // onChange={handleChange}
            // style={{
            //   width: '100%',
            // }}
            // options={options}
            {...sharedProps}
            {...selectProps}
          />
      ) : (
      
        <Select
            value={selectedItems}
            onChange={handleChange}
            placeholder={placeholder}
            allowClear={true} // Enable clear option
            style={{ width: "100%" }}
            options={options}
          >
          </Select>
      )}
    </>
  );
}

export default Dropdown;
