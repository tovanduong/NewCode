import { STAFFS } from "../shared/staffs.jsx";
import StaffDetail from "./detailComponent";
import React, { Component } from "react";
import Home from "./homeComponent";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Salary from "./salaryComponent";
import Department from "./departmentComponent";
import Header from "./headerComponent";
import { DEPARTMENTS } from "../shared/staffs";
import Footer from "./footerComponent";
import Staff from "./menuComponent";
import history from "../helps/history";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: [],
      itemDepartment: DEPARTMENTS,
    };
    this.addStaff = this.addStaff.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("staffs")) {
      // trường hợp có localstorage
      try {
        const staffs = JSON.parse(localStorage.getItem("staffs")); // dùng try catch để parse dữ liệu trong localStorage ra mảng staffs đề phòng parse lỗi.
        this.setState({ staffs: staffs }); // cập nhật lại state staffs cho component
        console.log(staffs);
      } catch {}
    } else {
      //trường hợp k có localStorage
      localStorage.setItem("staffs", JSON.stringify(STAFFS)); // cập nhật lại localStorage là mảng STAFFS ban đầu (lúc chưa thêm phần tử nào)
      this.setState({ staffs: STAFFS });
    }
  }

  addStaff(staff) {
    // hàm addStaff nhận vào tham số là staff,là object chưa dữ liệu nhập từ form vào
    const newStaffs = this.state.staffs.concat([staff]); // tạo ra mảng mới là mảng cũ nối thêm phần tử mới nhập vào
    console.log(staff);
    this.setState({ staffs: newStaffs }); // cập nhật lại state staffs cho component
    localStorage.setItem("staffs", JSON.stringify(newStaffs)); // cập nhật lại storage là mảng staffs mới sau khi đã thêm
  }

  render() {
    const HomePage = () => {
      return <Home />;
    };
    const DishWithId = ({ match }) => {
      return (
        <StaffDetail
          items={
            this.state.staffs.filter(
              (items) => items.id === parseInt(match.params.itemsId, 10)
            )[0]
          }
        />
      );
    };
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/Staff"
                component={() => (
                  <Staff items={this.state.staffs} addStaff={this.addStaff} />
                )} // truyền prop addStaff vào trong component Staff
              />
              <Route path="/Staff/:itemsId" component={DishWithId} />
              <Route
                exact
                path="/salary"
                component={() => <Salary items={this.state.staffs} />}
              />
              <Route
                exact
                path="/department"
                component={() => (
                  <Department items={this.state.itemDepartment} />
                )}
              />
              <Redirect to="/home" />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
export default Main;
