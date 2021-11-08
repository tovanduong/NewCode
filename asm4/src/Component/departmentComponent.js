import React from "react";
import { Breadcrumb, BreadcrumbItem, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./loadingComponent";
import { FadeTransform } from "react-animation-components";
function RenderDepartment({ items }) {
  return (
    <Link
      to={`/department/${items.id}`}
      className="col-lg-3 col-md-5 col-sm-12 "
      style={{marginRight: "30px"}}
    >
            <FadeTransform
      in
      transformProps={{
        exitTransform: "translateX(100%)",
      }}
    >
      <Card key={items.id} className="card-content-dept" >
        <h4 style={{paddingBottom: "10px", paddingTop:"10px"}}>{items.name}</h4>
        <p>số lượng nhân viên: {items.numberOfStaff}</p>
      </Card>
      </FadeTransform>
    </Link>
  );
}
function Department(props) {
  console.log(props.items.departments);
  const department = props.items.departments.map((item) => {
    return <RenderDepartment items={item} key={item.id} />;
  });
  if (props.items.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.items.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.items.errMess}</h4>
        </div>
      </div>
    );
  } else
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem className="childfolder">
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active className="childfolder">
            Bộ phận
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Bộ phận </h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">{department}</div>
    </div>
  );
}

export default Department;
