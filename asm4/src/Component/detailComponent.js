import React from "react";
import dateFormat from "dateformat";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { FadeTransform } from "react-animation-components";
import { Link } from 'react-router-dom';

function RenderStaff({ item }) {
    if(item){
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <div key={item.id} className="row">
                <div className="col-3">
                    <img src={item.image} alt={item.name} width="100%" style={{ paddingBottom: "10px" }} />
                </div>
                <div className="col-9">
                    <h4>Họ tên: {item.name}</h4>
                    <p>Ngày sinh: {dateFormat(item.doB, "dd/mm/yyyy")}</p>
                    <p>Ngày vào công ty: {dateFormat(item.startDate, "dd/mm/yyyy")}</p>
                    <p>Phòng ban: {item.departmentId}</p>
                    <p>số ngày nghỉ còn lại: {item.annualLeave}</p>
                    <p>số ngày làm thêm: {item.overTime}</p>
                </div>
            </div>
            </FadeTransform>
        );
    }

}
const StaffDetail = (props) => {
    console.log(props.dept)
    if (props.items)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem className="childfolder"><Link to='/Staff' >Nhân viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active className="childfolder">{props.items.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.items.name}</h3>
                        <hr />
                    </div>
                </div>
                <div >
                    <RenderStaff item={props.items}/>
                </div>
            </div>
        );
    else
        return (
            <div></div>
        );

}
export default StaffDetail;