// import { STAFFS } from "../shared/staffs.jsx";
import StaffDetail from "./detailComponent";
import React, { Component } from "react";
import Home from "./homeComponent";
import { Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Salary from "./salaryComponent";
import Department from "./departmentComponent";
import Header from "./headerComponent";
// import { DEPARTMENTS } from "../shared/staffs";
import Footer from "./footerComponent";
import Staff from "./menuComponent";
import history from "../helps/history";
import {
  fetchStaff,
  fetchDepartments,
  fetchSalary,
} from "../redux/ActionCreator";

const mapDispatchToProps = (dispatch) => ({
  fetchStaff: () => {
    dispatch(fetchStaff());
  },
  fetchDepartments: () => {
    dispatch(fetchDepartments());
  },
  fetchSalary: () => {
    dispatch(fetchSalary());
  },
});

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    itemDepartment: state.itemDepartment,
    salary: state.salary,
  };
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchStaff();
    this.props.fetchDepartments();
    this.props.fetchSalary();
  }

  render() {
    console.log(this.props.itemDepartment);
    const HomePage = () => {
      return <Home />;
    };
    const DishWithId = ({ match }) => {
      return (
        <StaffDetail
          items={
            this.props.staffs.staff &&
            this.props.staffs.staff.filter(
              (items) => items.id === parseInt(match.params.itemsId, 10)
            )[0]
          }
          // dept={this.props.itemDepartment}
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
                  <Staff items={this.props.staffs} addStaff={this.addStaff} />
                )}
              />
              <Route path="/Staff/:itemsId" component={DishWithId} />
              <Route
                exact
                path="/salary"
                component={() => <Salary items={this.props.salary} />}
              />
              <Route
                exact
                path="/department"
                component={() => (
                  <Department items={this.props.itemDepartment} />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
