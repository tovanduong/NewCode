import { createStore, combineReducers, applyMiddleware } from "redux";
import { Staff } from "./Staff";
import { Departments } from './Department';
import { Salary } from './Salary';
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staff,
            itemDepartment: Departments,
            salary: Salary,
            }),
            applyMiddleware(thunk, logger)
    );
    return store;
}