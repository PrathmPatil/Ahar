import { Button, Col, Row } from "antd";
import React from "react";

function Buttons( {submit,cancel}) {
  return (
    <Row gutter={[16, 16]} style={{ padding: "10px 10px" }}>
      <Col
        span={24}
        style={{ display: "flex", justifyContent: "end", gap: "20px" }}>
        <Button style={{}} onClick={cancel}>Cancel</Button>
        <Button style={{backgroundColor:"blue",color:"white"}} onClick={submit}>Submit</Button>
      </Col>
    </Row>
  );
}

export default Buttons;
