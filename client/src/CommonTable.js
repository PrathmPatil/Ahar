import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Table,
  Input,
  Space,
  Empty,
  Row,
  Col,
  Spin,
} from "antd";

import "./modal.scss";
import "./globle.scss";

const CommonTable = ({
  HeaderChild,
  pagination,
  isLoading,
  dataSource,
  columns,classname
}) => {
  console.log(classname)
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          {HeaderChild}
        </div>

        {false ? (
          <Spin style={{margin:"210px"}}/>
        ) : dataSource?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={pagination}
            className={classname}
          />
        ) : (
          <Empty></Empty>
        )}
      </div>
    </div>
  );
};

export default CommonTable;
