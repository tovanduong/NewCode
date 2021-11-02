/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import {
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Button,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
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

  // =====================Menu==========================
  const Menu =
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
              <LocalForm className="fomr-container">
                <Row>
                  <Label md={3} htmlFor="fulname">
                    Họ Tên
                  </Label>
                  <Col md={8}>
                    <Control.text
                      className="form-group"
                      model=".fullname"
                      id="fulname"
                      name="fulname"
                      placeholder="full Name"
                    />
                  </Col>
                </Row>

                <Row>
                  <Label md={3} htmlFor="doB">
                    Ngày sinh
                  </Label>
                  <Col md={8}>
                    <Control.text
                      type="date"
                      model=".doB"
                      id="doB"
                      name="doB"
                      className="form-group"
                    />
                  </Col>
                </Row>

                <Row>
                  <Label md={3} htmlFor="startDate">
                    Ngày vào công ty
                  </Label>
                  <Col md={8}>
                    <Control.text
                      type="date"
                      className="form-group"
                      model=".startDate"
                      id="startDate"
                      name="startDate"
                    />
                  </Col>
                </Row>

                <Row>
                  <Label md={3} htmlFor="department">
                    Phòng ban
                  </Label>
                  <Col md={8}>
                    <Control.select
                      model=".department"
                      name="department"
                      className="form-group"
                    >
                      <option>===Select===</option>
                      <option>Sale</option>
                      <option>HR</option>
                      <option>Marketing</option>
                      <option>IT</option>
                      <option>Finance</option>
                    </Control.select>
                  </Col>
                </Row>

                <Row>
                  <Label md={3} htmlFor="salaryScale">
                    Hệ số lương
                  </Label>
                  <Col md={8}>
                    <Control.text
                      className="form-group"
                      type="number"
                      model=".salaryScale"
                      id="salaryScale"
                      name="salaryScale"
                    />
                  </Col>
                </Row>

                <Row>
                  <Label md={3} htmlFor="annualLeave">
                    Số ngày nghỉ còn lại
                  </Label>
                  <Col md={8}>
                    <Control.text
                      className="form-group"
                      type="number"
                      model=".annualLeave"
                      id="annualLeave"
                      name="annualLeave"
                    />
                  </Col>
                </Row>

                <Row>
                  <Label md={3} htmlFor="overTime">
                    Số ngày đã làm thêm
                  </Label>
                  <Col md={8}>
                    <Control.text
                      className="form-group"
                      type="number"
                      model=".overTime"
                      id="overTime"
                      name="overTime"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className="row">
                    <Button
                      type="submit"
                      color="primary"
                      className="col-3"
                      style={{ margin: "0px 0px 20px 10px" }}
                    >
                      Thêm
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </div>
          </div>
        </div>
      )}
      <div className="container row menus">{Menu}</div>
    </div>
  );
};
export default Staff;
