import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDepartment({ items }) {
    return (
        <Card key={items.id} className="col-lg-3 col-md-5 col-sm-12 card-content">
                <span>{items.name}</span>
                <span>số lượng nhân viên: {items.numberOfStaff}</span>
        </Card>
    )
}
function Department(props) {
    const department = props.items.map((item) => {
        return (
                <RenderDepartment items={item} key={item.id}/>
        );
    });
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem className="childfolder"><Link to="/home" >Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active className="childfolder">Bộ phận</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Bộ phận </h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                {department}
            </div>
        </div>
    );
}

export default Department;