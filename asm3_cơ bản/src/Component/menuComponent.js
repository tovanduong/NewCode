import React, { useState } from "react";
import {
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
function RenderMenu({ items }) {
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "black",
        fontSize: "30px",
        fontWeight: "bold",
      }}
      to={`/Staff/${items.id}`}
      className="col-lg-3 col-md-6 col-sm-12"
    >
      <CardImg
        className="card-menu"
        width="100%"
        src={items.image}
        alt={items.name}
      />
      <CardTitle style={{ textAlign: "center" }}>{items.name}</CardTitle>
    </Link>
  );
}

const Staff = function (props) {
  // =======lọc tìm tên nhân viên ============
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const HandleSearch = () => {
    const filterName = props.items.filter(function (el) {
      return el.name.toUpperCase().includes(name.toUpperCase()) === true;
    });
    if (names != null) {
      setNames(filterName);
    }
    if (filterName.length === 0) {
      alert("không tìm thấy nhân viên");
    }
  };

  // ==============Add Staff=======================
  const [toggle, setToggle] = useState(false);
  const HandleAdd = () => {
    setToggle(!toggle);
  };
  const handOverlay = () => {
    setToggle(!toggle);
  };
  // ===============validate===============
  const [fulname, setFulname] = useState("");
  const [doB, setDoB] = useState("");
  const [startDate, setStartDate] = useState("");
  const [department, setDepartment] = useState("");
  const [salaryScale, setSalaryScale] = useState("");
  const [annualLeave, setAnnualLeave] = useState("");
  const [overTime, setOverTime] = useState("");

  const [fulnameErr, setFulnameErr] = useState("");
  const [doBErr, setDoBErr] = useState("");
  const [startDateErr, setStartDateErr] = useState("");
  const [departmentErr, setDepartmentErr] = useState("");
  const handleChange = (e) => {
    setFulname(e.target.value);
    const fulnameErr = {};
    if (e.target.value.length === 0) {
      fulnameErr.fulnameShort = "Yêu cầu nhập";
      return;
    }
    if (e.target.value.length < 5) {
      fulnameErr.fulnameShort = "Họ và tên quá ngắn";
    }
    console.log(e.target.value);
    console.log(e.target.value.length);
    if (e.target.value.length > 15) {
      fulnameErr.fulnameShort = "Họ và tên quá dài";
    }
    if (e.target.value.length >= 5) {
    }
    setFulnameErr(fulnameErr);
  };
  const handleBlur = () => {
    const fulnameErr = {};
    if (fulname.length < 5) {
      fulnameErr.fulnameShort = "Họ và tên quá ngắn";
    }
    if (fulname.length === 0) {
      fulnameErr.fulnameShort = "Yêu cầu nhập";
    }
    if (fulname.length > 15) {
      fulnameErr.fulnameShort = "Họ và tên quá dài";
    }

    setFulnameErr(fulnameErr);
  };
  const handleChangeDoB = (e) => {
    setDoB(e.target.value);
    const doBErr = {};
    if (doB.length !== 0) {
      doBErr.doBError = "";
    }
    setDoBErr(doBErr);
  };
  const handleBlurDoB = () => {
    const doBErr = {};
    if (doB.length === 0) {
      doBErr.doBError = "Yêu cầu nhập";
    }
    if (doB.length !== 0) {
      doBErr.doBError = "";
    }
    setDoBErr(doBErr);
  };

  const handleChangeStartDate = (e) => {
    setStartDate(e.target.value);
    const startDateErr = {};
    if (startDate.length !== 0) {
      startDateErr.startDateError = "";
    }
    setStartDateErr(startDateErr);
  };
  const handleBlurStartDate = () => {
    const startDateErr = {};
    if (startDate.length === 0) {
      startDateErr.startDateError = "Yêu cầu nhập";
    }
    if (startDate.length !== 0) {
      startDateErr.startDateError = "";
    }
    setStartDateErr(startDateErr);
  };

  const handleChangeDepartment = (e) => {
    setDepartment(e.target.value);
    const departmentErr = {};
    console.log(department.length);
    if (departmentErr.length === 0) {
      departmentErr.departmentError = "Yêu cầu chọn";
    }
    if (departmentErr.length !== 0) {
      departmentErr.departmentError = "";
    }
    setDepartmentErr(departmentErr);
  };
  const handleBlurDepartment = () => {
    const departmentErr = {};
    if (departmentErr.length === 0) {
      departmentErr.departmentError = "Yêu cầu chọn";
    }
    if (departmentErr.length !== 0) {
      departmentErr.departmentError = "";
    }
    setDepartmentErr(departmentErr);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      const newStaff = {
        id: props.items.length,
        image: "/assets/images/alberto.png",
        name: fulname,
        doB: doB,
        salaryScale: salaryScale,
        department: department,
        annualLeave: annualLeave,
        overTime: overTime,
      };
      console.log(newStaff);
      props.addStaff(newStaff);
      alert("Đã thêm nhân viên");
    }
  };
  const formValidation = () => {
    const fulnameErr = {};
    const doBErr = {};
    const startDateErr = {};
    const departmentErr = {};
    let isValid = true;
    if (fulname.length < 5) {
      fulnameErr.fulnameShort = "Họ và tên quá ngắn";
      isValid = false;
    }
    if (fulname.length === 0) {
      fulnameErr.fulnameShort = "Yêu cầu nhập";
      isValid = false;
    }

    if (fulname.length > 15) {
      fulnameErr.fulnameLong = "Họ và tên quá dài";
      isValid = false;
    }
    if (doB.length === 0) {
      doBErr.doBError = "Yêu cầu nhập";
      isValid = false;
    }
    if (startDate.length === 0) {
      startDateErr.startDateError = "Yêu cầu nhập";
      isValid = false;
    }
    console.log(department.length);
    if (department.length === 0) {
      departmentErr.departmentError = "Yêu cầu chọn";
      isValid = false;
    }
    setFulnameErr(fulnameErr);
    setDoBErr(doBErr);
    setStartDateErr(startDateErr);
    setDepartmentErr(departmentErr);
    return isValid;
  };
  // =====================Menu==========================
  const Staff =
    props.items &&
    props.items.map((item) => <RenderMenu key={item.id} items={item} />);
  return (
    <div>
      <div className="container ">
        <div className="row">
          <Breadcrumb className="col-3 linknav">
            <BreadcrumbItem className="childfolder">
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active className="childfolder">
              Nhân viên
            </BreadcrumbItem>
          </Breadcrumb>
          <Button
            className="col-3 addStaff fa fa-plus"
            onClick={HandleAdd}
          ></Button>
          <input
            className="col-4 input-text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên nhân viên"
          />
          <button className="col-1 input-btn" onClick={HandleSearch}>
            Search
          </button>
          <hr style={{ marginTop: 10 + "px" }} />

          <div className="row">
            {names.map((rs, index) => (
              <Link
                key={index}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "30px",
                  fontWeight: "bold",
                  marginLeft: "20px",
                  marginBottom: "10px",
                }}
                to={`/Staff/${rs.id}`}
                className="col-lg-3 col-md-6 col-sm-12"
              >
                <CardImg
                  width="100%"
                  src={rs.image}
                  alt={rs.name}
                  style={{ marginTop: 20, padding: 0 }}
                />
                <Card className="card-menu" key={index}>
                  {rs.name}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {toggle && (
        <div className="overlay">
          <div className="row row-form">
            <div className="form-input col-6">
              <div className="title-input">
                <h2>Thêm nhân viên</h2>
                <p className="close" onClick={handOverlay}>
                  X
                </p>
              </div>
              <hr />
              <Form onSubmit={handleSubmit}>
                <FormGroup row className="fomr-container">
                  <Label md={3} htmlFor="fulname">
                    Họ Tên
                  </Label>
                  <Col md={8}>
                    <Input
                      type="text"
                      id="fulname"
                      name="fulname"
                      placeholder="full Name"
                      value={fulname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {Object.keys(fulnameErr).map((key, index) => {
                      return (
                        <div key={index} style={{ color: "red" }}>
                          {fulnameErr[key]}
                        </div>
                      );
                    })}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} htmlFor="doB">
                    Ngày sinh
                  </Label>
                  <Col md={8}>
                    <Input
                      type="date"
                      id="doB"
                      name="doB"
                      value={doB}
                      onChange={handleChangeDoB}
                      onBlur={handleBlurDoB}
                    />
                    {Object.keys(doBErr).map((key, index) => {
                      return (
                        <div key={index} style={{ color: "red" }}>
                          {doBErr[key]}
                        </div>
                      );
                    })}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} htmlFor="startDate">
                    Ngày vào công ty
                  </Label>
                  <Col md={8}>
                    <Input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={startDate}
                      onChange={handleChangeStartDate}
                      onBlur={handleBlurStartDate}
                    />
                    {Object.keys(startDateErr).map((key, index) => {
                      return (
                        <div key={index} style={{ color: "red" }}>
                          {startDateErr[key]}
                        </div>
                      );
                    })}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} htmlFor="department">
                    Phòng ban
                  </Label>
                  <Col md={8}>
                    <Input
                      type="select"
                      name="department"
                      value={department}
                      onChange={handleChangeDepartment}
                      onBlur={handleBlurDepartment}
                    >
                      <option>===Select===</option>
                      <option>Sale</option>
                      <option>HR</option>
                      <option>Marketing</option>
                      <option>IT</option>
                      <option>Finance</option>
                    </Input>
                    {Object.keys(departmentErr).map((key, index) => {
                      return (
                        <div key={index} style={{ color: "red" }}>
                          {departmentErr[key]}
                        </div>
                      );
                    })}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} htmlFor="salaryScale">
                    Hệ số lương
                  </Label>
                  <Col md={8}>
                    <Input
                      type="number"
                      id="salaryScale"
                      name="salaryScale"
                      value={salaryScale}
                      onChange={(e) => {
                        setSalaryScale(e.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} htmlFor="annualLeave">
                    Số ngày nghỉ còn lại
                  </Label>
                  <Col md={8}>
                    <Input
                      type="number"
                      id="annualLeave"
                      name="annualLeave"
                      value={annualLeave}
                      onChange={(e) => {
                        setAnnualLeave(e.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} htmlFor="overTime">
                    Số ngày đã làm thêm
                  </Label>
                  <Col md={8}>
                    <Input
                      type="number"
                      id="overTime"
                      name="overTime"
                      value={overTime}
                      onChange={(e) => {
                        setOverTime(e.target.value);
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col>
                    <Button type="submit" color="primary">
                      Thêm
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      )}
      <div className="container row menus">{Staff}</div>
    </div>
  );
};
export default Staff;
