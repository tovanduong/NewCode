import { DEPARTMENTS } from "../shared/staffs";
import { STAFFS } from "../shared/staffs.jsx";

export const initialState = {
    staffs: [],
    itemDepartment: DEPARTMENTS,
};

export const Reducer = (state = initialState, action) => {
    return state;
};