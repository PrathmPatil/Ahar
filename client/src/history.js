import React, { useEffect, useMemo, useState } from "react";
import CommonTable from "./CommonTable";
import CustomLayout from "./Layout";
import { toast } from "react-toastify";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row } from "antd";
import Chip from "./Common/Chip";
import "./globle.scss";
import Dropdown from "./Common/Dropdown";
import { DatePicker, Radio } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
function History({ sideBarValue }) {
  const [selectedKey, setSelectedKey] = useState("1");
  const [custList, setCustList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [openFoodList, setOpenFoodList] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [openFoodTime, setOpenFoodTime] = useState(false);
  const [foodTime, setFoodTime] = useState([]);
  const [quickSearchValue, setQuickSearchValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  let userrole = "admin";
  useEffect(() => {
    getAllQueries();
  }, []);

  const getAllQueries = () => {
    fetch("http://localhost:3000/query")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch queries");
        }
        return res.json();
      })
      .then((data) => {
        setCustList(data);
      })
      .catch((error) => {
        console.error("Error fetching queries:", error);
        toast.error("Failed to fetch queries");
      });
  };
  console.log(custList);

  const submitQuery = () => {
    const username = sessionStorage.getItem("username");
    const regobj = { username, query, reply: "", status: "pending" };

    fetch("http://localhost:3000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regobj),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add query");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Added Query successfully.");
        setModalVisible(false);
        getAllQueries();
      })
      .catch((error) => {
        console.error("Error adding query:", error);
        toast.error("Failed to add query");
      });
  };

  const handleRemove = (record) => {
    fetch(`http://localhost:3000/query/${record.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...record, status: "closed" }), // Change status to "closed"
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Query closed successfully.");
          getAllQueries();
        } else {
          throw new Error("Failed to close query.");
        }
      })
      .catch((error) => {
        console.error("Error closing query:", error);
        toast.error("Failed to close query.");
      });
  };

  const replayQuery = (value, record, index) => {
    const newCustList = custList.map((item) => {
      if (item.id === index.id) {
        return { ...item, reply: value };
      }
      return item;
    });
    setCustList(newCustList);
  };
  const statusChange = (value, record, index) => {
    console.log(value, record.foodOrder, index, custList);

    const newCustList = custList.map((item, idx) => {
      // Assuming the `id` property is present in `record`
      if (record.id === item.id) {
        return { ...item, foodOrder: { ...item.foodOrder, status: value } };
      }
      return item;
    });

    console.log(newCustList);
    setCustList(newCustList);
  };

  const columns = [
    {
      title: "Sr.No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      render: (record, index, id) => <p>{record.foodOrder.username}</p>,
    },
    {
      title: "Address",
      render: (record, index, id) => <p>{record.foodOrder.address}</p>,
    },
    {
      title: "Mobile Number",
      render: (record, index, id) => <p>{record.foodOrder.mobileNumber}</p>,
    },
    {
      title: "Total/Offer Price",
      render: (record, index, id) => (
        <p>{`${Math.round(record.foodOrder.offerCost)} / ${Math.round(
          record.foodOrder.totalCost
        )}`}</p>
      ),
    },
    {
      title: "Pincode",
      render: (record, index, id) => <p>{record.foodOrder.pincode}</p>,
    },
    {
      title: "Food List",
      render: (record, id) => (
        <EyeOutlined
          open={true}
          onClick={() => (
            setOpenFoodList(true), setFoodList(record.foodOrder.foodList)
          )}
        />
      ),
    },
    {
      title: "Food Time",
      render: (record, id) => (
        <EyeOutlined
          open={true}
          onClick={() => (
            setOpenFoodTime(true), setFoodTime(record.foodOrder.foodType)
          )}
        />
      ),
    },
    // {
    //   title: "Reply",
    //   dataIndex: "reply",
    //   key: "reply",
    //   render: (record, index) => (
    //     <textarea
    //       style={{ width: "100%" }}
    //       value={record}
    //       onChange={(e) => replayQuery(e.target.value, record, index)}
    //     />
    //   ),
    // },
    {
      title: "Status",
      render: (record, index, id) => (
        <select
          value={record.foodOrder.status}
          onChange={(e) => statusChange(e.target.value, record, id)}
          className="form-control"
        >
          {record.foodOrder.statusOptions?.map((item, index) => (
            <option key={index + item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Button onClick={() => submitQueryReply(record)} type="primary">
    //         Submit Reply
    //       </Button>
    //       <Button onClick={() => handleRemove(record)} type="default">
    //         Close
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  const submitQueryReply = (record) => {
    fetch(`http://localhost:3000/query/${record.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update query");
        }
        toast.success("Query reply submitted successfully.");
        getAllQueries(); // Refresh the query list
      })
      .catch((error) => {
        console.error("Error updating query:", error);
        toast.error("Failed to submit query reply.");
      });
  };
  const handleQuickSearch = (value) => {
    // Implement quick search functionality here
    console.log("Quick search value:", value);
  };

  const handleAdd = () => {
    setModalVisible(true);
  };
  const [selectedFilter, setSelectedFilter] = useState();
  const [customDateRange, setCustomDateRange] = useState([]);

  const handleFilterChange = (e) => {
    console.log(e,selectedFilter)
    setSelectedFilter(e);
    console.log(selectedFilter)
  };

  const handleDateRangeChange = (dates) => {
    setCustomDateRange(dates);
  };
  let Type = ["Lunch", "Dinner", "Both"];
  let status = [
    "orderPlaced",
    "ReadyToTransoport",
    "OnTransport",
    "Delivered",
    "Completed/ReadyToPickUp",
    "TiffinPickuped",
    "TiffinSubmited",
  ];
  const dateFilters = ["Today", "Yesterday", "custom"];

  const CustomDate=useMemo(()=>{
   return    <RangePicker
        value={customDateRange}
        onChange={handleDateRangeChange}
        disabledDate={(current) =>
          current && current > moment().endOf("day")
        } 
        style={{display: selectedFilter === "custom"?"":"none"}}
      />
  },[selectedFilter === "custom"])
  console.log(selectedFilter)
  const HeaderChild = () => {
    return (
      <>
        <Row gutter={[16, 16]}>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h6>
              <span>History</span>
            </h6>
            {CustomDate}
            <SearchOutlined className="searchIcon" size={20} />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={4}>
            <Dropdown OPTIONS={Type} placeholder={"Select Time"} isMultiple={true}/>
          </Col>
          <Col span={4}>
            <Dropdown OPTIONS={status} placeholder={"Select Staus"} />
          </Col>
          <Col span={4}>
            <Dropdown OPTIONS={Type} isMultiple={true}/>
          </Col>
          <Col span={4}>
            <Dropdown
              OPTIONS={dateFilters}
              setSelectedItems={handleFilterChange}
              selectedItems={selectedFilter} 
              placeholder={"Select Date"}
            />
          </Col>
          <Col span={8}>
            <Input
              placeholder="Quick search"
              prefix={<SearchOutlined />}
              value={quickSearchValue}
              onChange={(e) => setQuickSearchValue(e.target.value)}
              onPressEnter={() => handleQuickSearch(quickSearchValue)}
            />
          </Col>
        </Row>
        
      </>
    );
  };

  return (
    <div>
      <CustomLayout selectedKey={selectedKey} setSelectedKey={setSelectedKey}>
        <CommonTable
          sideBarValue={sideBarValue}
          tableName={"History"}
          pagination={true}
          dataSource={custList}
          columns={columns}
          HeaderChild={HeaderChild()}
        />
        <div className="card-body">
          <Modal
            title="Add Query"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onOk={submitQuery}
            className="cross"
          >
            <label>Add Query</label>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your query"
            />
          </Modal>
          {userrole === "customer" && (
            <Button onClick={handleAdd} type="primary" className="mb-3">
              Add Query
            </Button>
          )}
        </div>
        <div className="card-body">
          <Modal
            open={openFoodList}
            onCancel={() => setOpenFoodList(false)}
            footer={false}
          >
            <Row gutter={[16, 16]}>
              <Col
                span={19}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                <h6>Item</h6> <h6>Quntities</h6>
              </Col>
              {foodList.map((item, index) => (
                <Col
                  span={18}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* <span index={index} item={item} className="overflowEllipsis">{item}</span> */}
                  <Chip
                    content={item}
                    index={index}
                    className="overflowEllipsis"
                    isTooltip={true}
                  />
                  <span>{index}</span>
                </Col>
              ))}
            </Row>
          </Modal>
        </div>
        <div className="card-body">
          <Modal
            open={openFoodTime}
            onCancel={() => setOpenFoodTime(false)}
            footer={false}
          >
            <Row gutter={[16, 16]}>
              {foodTime.map((item, index) => (
                <Col span={6}>
                  <Chip content={item} index={index} />
                </Col>
              ))}
            </Row>
          </Modal>
        </div>
      </CustomLayout>
    </div>
  );
}

export default History;
