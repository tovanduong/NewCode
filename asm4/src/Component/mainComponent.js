// import { STAFFS } from "../shared/staffs.jsx";
import StaffDetail from "./detailComponent";
import React, { Component } from "react";
import Home from "./homeComponent";
import { Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Salary from "./salaryComponent";
import Department from "./departmentComponent";
import Header from "./headerComponent";
import Departmentdetail from "./departmentdetailComponent";
import Footer from "./footerComponent";
import Staff from "./menuComponent";
import history from "../helps/history";
import {
  fetchStaff,
  fetchDepartments,
  fetchSalary,
  fetchDepartmentStaff,
} from "../redux/ActionCreator";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
  fetchDepartmentStaff: (id) => {
    dispatch(fetchDepartmentStaff(id));
  },
});

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs,
    itemDepartment: state.itemDepartment,
    salary: state.salary,
    staffDepartments: state.staffDepartments,
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
      return <Home items={this.props.staffs} />;
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
        />
      );
    };

    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <TransitionGroup>
              <CSSTransition
                key={this.props.location.key}
                classNames="page"
                timeout={300}
              >
                <Switch >
                  <Route path="/home" component={HomePage} />
                  <Route
                    exact
                    path="/Staff"
                    component={() => (
                      <Staff
                        items={this.props.staffs}
                        addStaff={this.addStaff}
                      />
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
                  <Route
                    exact
                    path="/department/:id"
                    component={Departmentdetail}
                  />
                  <Redirect to="/home" />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
