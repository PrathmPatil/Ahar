

import { Button, Col, Input, Modal, Row } from "antd";
import React, { useState } from "react";
import * as Yup from "yup"; // for validation
import Title from "../../Common/Title";
import Buttons from "../../Common/Buttons";
import "./branch.scss"
import { toast } from "react-toastify";
const BranchForm = ({getAllQueries}) => {
  const initialValues = {
    name: "",
    location: "",
    owner: "",
    contact: "",
    email: "",
    todaysIncome: "",
    lastWeek: "",
    lastMonth: "",
    workingEmploy: [{ shef: "", helper: "", delivery: "", other: "" }],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
    owner: Yup.string().required("Owner is required"),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleChangeWorkEmploy = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData((prevData) => {
      const updatedEmploy = [...prevData.workingEmploy];
      updatedEmploy[0][name] = value;
      return {
        ...prevData,
        workingEmploy: updatedEmploy,
      };
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form data:", formData);

      fetch("http://localhost:3000/franchises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to add query");
          }
          return res.json();
        })
        .then(() => {
          toast.success("Added Branch successfully.");
          setOpenModal(false);
          getAllQueries();
        })
        .catch((error) => {
          console.error("Error adding query:", error);
          toast.error("Failed to add query");
        });

      setFormData(initialValues);
      setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error(err);
      }
    }
  };

  const cancelForm=()=>{
    setFormData(initialValues);
    setOpenModal(false);
  }

  return (
    <>
      <Row gutter={[16, 16]} style={{ padding: "10px 10px" }}>
        <Col span={24} style={{ display: "flex", justifyContent: "end" }}>
          <Button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={() => setOpenModal(true)}
          >
            Add Branch
          </Button>
        </Col>
      </Row>
      <Modal
        visible={openModal}
        onCancel={cancelForm}
        footer={null}
      >
        <form onSubmit={handleSubmit}>
          <Row gutter={[16, 16]} style={{rowGap:"4px"}}>
            <Col span={24}>
              <Title isRequired={true} title="Branch Name" />
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}   
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </Col>
            {/*</Row >*/}
            {/*<Row gutter={[16, 16]}>*/}
            <Col span={24}>
              <Title isRequired={true} title="Location" />
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <p  className="error">{errors.location}</p>}
            </Col>
            {/*</Row >*/}
            {/*<Row gutter={[16, 16]}>*/}
            <Col span={24}>
              <Title isRequired={true} title="Owner" />
              <Input
                name="owner"
                value={formData.owner}
                onChange={handleChange}
              />
              {errors.owner && <p  className="error">{errors.owner}</p>}
            </Col>
            {/*</Row >*/}
            {/*<Row gutter={[16, 16]}>*/}
            <Col span={24}>
              <Title isRequired={true} title="Contact" />
              <Input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
              {errors.contact && <p className="error">{errors.contact}</p>}
            </Col>
            {/*</Row >*/}
            {/*<Row gutter={[16, 16]}>*/}
            <Col span={24}>
              <Title isRequired={true} title="Email" />
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p  className="error">{errors.email}</p>}
            </Col>
            {/*</Row >*/}
            {/*<Row gutter={[16, 16]}>*/}
            <Col span={24}>
              <Title  title="Today's Income" />
              <Input
                name="todaysIncome"
                value={formData.todaysIncome}
                onChange={handleChange}
              />
            </Col>
            {/*</Row >*/}
            {/*<Row gutter={[16, 16]}>*/}
            <Col span={24}>
              <Title  title="Last Week's Income" />
              <Input
                name="lastWeek"
                value={formData.lastWeek}
                onChange={handleChange}
              />
            </Col>
            {/*</Row >*/}
            {/*<Row gutter={[16, 16]}>*/}
            <Col span={24}>
              <Title  title="Last Month's Income" />
              <Input
                name="lastMonth"
                value={formData.lastMonth}
                onChange={handleChange}
              />
            </Col>
            {/*</Row >*/}
            <Col span={12}>
              <Title isRequired={true} title="Shef" />
              <Input
                name="shef"
                value={formData.workingEmploy[0].shef}
                onChange={handleChangeWorkEmploy}
              />
              {/* {errors.workingEmploy[0].shef && <p>{errors.workingEmploy[0].shef}</p>} */}
            </Col>
            <Col span={12}>
              <Title isRequired={true} title="Helper" />
              <Input
                name="helper"
                value={formData.workingEmploy[0].helper}
                onChange={handleChangeWorkEmploy}
              />
              {/* {errors.workingEmploy[0].helper && <p>{errors.workingEmploy[0].helper}</p>} */}
            </Col>
            <Col span={12}>
              <Title isRequired={true} title="Delivery" />
              <Input
                name="delivery"
                value={formData.workingEmploy[0].delivery}
                onChange={handleChangeWorkEmploy}
              />
              {/* {errors.workingEmploy[0].delivery && <p>{errors.workingEmploy[0].delivery}</p>} */}
            </Col>
            <Col span={12}>
              <Title  title="Other Person's" />
              <Input
                name="other"
                value={formData.workingEmploy[0].other}
                onChange={handleChangeWorkEmploy}
              />
            </Col>
          </Row>
          <Buttons
              cancel={cancelForm}
              submit={handleSubmit}
            />
        </form>
      </Modal>
    </>
  );
};

export default BranchForm;
