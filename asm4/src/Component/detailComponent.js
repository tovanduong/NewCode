/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import { patchStaff, deleteStaff } from "../redux/ActionCreator";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Label,
} from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderStaff({ item }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.itemDepartment);
  //   item.doB = dateFormat(item.doB, "yyyy-mm-dd")
  const handleSubmit = function (values) {
    dispatch(
      patchStaff(
        item.id,
        values.name,
        values.doB,
        values.salaryScale,
        values.startDate,
        values.departmentId,
        values.annualLeave,
        values.overTime,
        "/asset/images/alberto.png"
      )
    );

  };
  const handledelete = function () {
    console.log(item.id)
    dispatch(
      deleteStaff(
        item.id
      )
    );
    history.push("/staff")
  }
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (item) {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <div key={item.id} className="row">
          <div className="col-3">
            <img
              src={item.image}
              alt={item.name}
              width="100%"
              style={{ paddingBottom: "10px" }}
            />
          </div>
          <div className="col-7">
            <h4>Họ tên: {item.name}</h4>
            <p>Ngày sinh: {dateFormat(item.doB, "dd/mm/yyyy")}</p>
            <p>Ngày vào công ty: {dateFormat(item.startDate, "dd/mm/yyyy")}</p>
            <p>
              Phòng ban:{" "}
              {
                departments.departments.find((d) => d.id === item.departmentId)
                  ?.name
              }
            </p>
            <p>số ngày nghỉ còn lại: {item.annualLeave}</p>
            <p>số ngày làm thêm: {item.overTime}</p>
          </div>
          <Button
            onClick={handleOpen}
            className="col-2 update"
          >
            Update information
          </Button>
          <Button
            className="col-2 del"
            style={{
              position: "absolute",
              height: "50px",
              right: "-10px",
              top: "100px",
              marginBottom: "10px",
              fontSize: "20px",
              zIndex: "100",
            }}
            onClick={handledelete}
          >
            Xóa
          </Button>
        </div>
        <Modal isOpen={isOpen} toggle={handleOpen}>
          <ModalHeader>Modify Staff</ModalHeader>
          <ModalBody>
            <LocalForm
              className="fomr-container"
              onSubmit={(values) => handleSubmit(values)}
              initialState={item}
            >
              <Row className="row-form-content">
                <Label md={3} htmlFor="name">
                  Họ Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    className="form-group"
                    model=".name"
                    id="fulname"
                    name="name"
                    placeholder="full Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      minLength: " nhiều hơn 2 ký tự",
                      maxLength: "15 ký tự trở xuống",
                    }}
                  />
                </Col>
              </Row>

              <Row className="row-form-content">
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
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Col>
              </Row>

              <Row className="row-form-content">
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
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Col>
              </Row>

              <Row className="row-form-content">
                <Label md={3} htmlFor="department">
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".departmentId"
                    name="department"
                    className="form-group"
                    validators={{
                      required,
                    }}
                  >
                    <option>===Select===</option>
                    <option value="Dept01">Sale</option>
                    <option value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".departmentId"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Col>
              </Row>

              <Row className="row-form-content">
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

              <Row className="row-form-content">
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

              <Row className="row-form-content">
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

              <Row className="row-form-content">
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
          </ModalBody>
        </Modal>
      </FadeTransform>
    );
  }
}
const StaffDetail = (props) => {
  console.log(props.dept);
  if (props.items)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem className="childfolder">
              <Link to="/Staff">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active className="childfolder">
              {props.items.name}
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.items.name}</h3>
            <hr />
          </div>
        </div>
        <div>
          <RenderStaff item={props.items} />
        </div>
      </div>
    );
  else return <div></div>;
};
export default StaffDetail;
