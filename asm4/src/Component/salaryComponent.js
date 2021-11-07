import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from "./loadingComponent";

function RenderSalary({ items }) {
    return (
        <Card key={items.id} className="col-lg-3 col-md-5 col-sm-12 card-content">
            <h4>{items.name}</h4>
            <span>Mã nhân viên: {items.id}</span>
            <span>Hệ số lương: {items.salaryScale}</span>
            <span>Số giờ làm thêm: {items.overTime}</span>
            <span>Lương: {items.salary}</span>
        </Card>
    )
}
function Salary(props) {
    const salary = props.items.salary.map((item) => {
        return (
            <RenderSalary items={item} key={item.id} />
        );
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
        <div className="container" >
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem className="childfolder"><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active className="childfolder">Bảng lương</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Bảng lương </h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                {salary}
            </div>
        </div>
    );
}
export default Salary;