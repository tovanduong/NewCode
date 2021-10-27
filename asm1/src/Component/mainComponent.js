import { STAFFS } from '../shared/staffs.jsx';
import StaffDetail from './detailComponent';
import { Component } from 'react';
import Home from './homeComponent';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Salary from './salaryComponent';
import Department from './departmentComponent';
import Header from './headerComponent';
import {DEPARTMENTS} from "../shared/staffs"
import Footer from './footerComponent';
import Staff from './menuComponent';
import history from '../helps/history';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: STAFFS,
            itemDepartment: DEPARTMENTS
        }
    }
    render() {
        const HomePage = () => {
            return (
                <Home
                />
            );
        }
        const DishWithId = ({ match }) => {
            return (
                <StaffDetail items={this.state.item.filter((items) => items.id === parseInt(match.params.itemsId, 10))[0]} />
            )
        }
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/Staff' component={() => <Staff items={this.state.item} />} />
                            <Route path='/Staff/:itemsId' component={DishWithId} />
                            <Route exact path='/salary' component={() => <Salary items={this.state.item} />} />
                            <Route exact path='/department' component={() => <Department items={this.state.itemDepartment} />}/>
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