import { Col, Modal, Row } from "antd";

function Confirm({ open, close, cancle, submit, title, subtitle }) {
  return (
    <Modal open={open} onCancel={cancle} onOk={submit} >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h6>
            <span>{title}</span>
          </h6>
          <p>{subtitle}</p>
        </Col>
      </Row>
    </Modal>
  );
}

export default Confirm;
