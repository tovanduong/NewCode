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
      try {
        const staffs = JSON.parse(localStorage.getItem("staffs"));
        this.setState({ staffs: staffs });
        console.log(staffs);
      } catch {}
    } else {
      localStorage.setItem("staffs", JSON.stringify(STAFFS));
      this.setState({ staffs: STAFFS });
    }
  }

  addStaff(staff) {
    
    const newStaffs = this.state.staffs.concat([staff]); 
    console.log(staff);
    this.setState({ staffs: newStaffs });
    localStorage.setItem("staffs", JSON.stringify(newStaffs));
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
                )}
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
