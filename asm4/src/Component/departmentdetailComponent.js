import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb, BreadcrumbItem, CardTitle, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { fetchDepartmentStaff } from "../redux/ActionCreator";

function RenderDepartment({ item }) {
  //   console.log(item);
  if (item) {
    return (
      <div key={item.id} className="col-lg-3 col-md-6 col-sm-12 ">
        <CardImg
          className="card-menu "
          width="100%"
          src={item.image}
          alt={item.name}
        />
        <CardTitle style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}>{item.name}</CardTitle>
      </div>
    );
  }
}
const Departmentdetail = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.staffDepartments);
  const departments = useSelector((state) => state.itemDepartment);
 
  const departmentName = departments.departments.filter(
    (x) => x.id === props.match.params.id
  )[0]?.name;

  console.log(departments);
  useEffect(() => {
    dispatch(fetchDepartmentStaff(props.match.params.id));
  }, []);

  const Menu =
    items &&
    items.staffDepartments.map((item) => (
      <RenderDepartment key={item.id} item={item} />
    ));

  if (items.staffDepartments)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem className="childfolder">
              <Link to="/department">Bộ Phận</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active className="childfolder">
              {departmentName}
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{departmentName}</h3>
            <hr />
          </div>
        </div>
        <div className="row">{Menu}</div>
      </div>
    );
  else return <div></div>;
};
export default Departmentdetail;
