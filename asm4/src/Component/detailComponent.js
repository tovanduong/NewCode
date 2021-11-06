import React, { useState } from "react";
import dateFormat from "dateformat";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";

function RenderStaff({ item }) {
  //   const [toggle, setToggle] = useState(false);
  const [modal, setModal] = useState(false);
  //   const hanleToggle = () => {
  //     setToggle(!toggle);
  //   };
  const hanleModal = () => {
    setModal(!modal);
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
            <p>Phòng ban: {item.departmentId}</p>
            <p>số ngày nghỉ còn lại: {item.annualLeave}</p>
            <p>số ngày làm thêm: {item.overTime}</p>
          </div>
          <Button
            onClick={hanleModal}
            className="col-2"
            style={{ maxHeight: "60px" }}
          >
            Update information
          </Button>
        </div>
        {modal && (
          <Modal bsSize="lg">
            <ModalHeader>Login</ModalHeader>
            <ModalBody>
              <div className="title-input">
                <h2>Update</h2>
              </div>
            </ModalBody>
          </Modal>
        )}
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
        <Modal>
          <div>aaaaaaa</div>
        </Modal>
      </div>
    );
  else return <div></div>;
};
export default StaffDetail;
