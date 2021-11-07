import * as ActionTypes from './ActionType';

export const StaffDepartments = (state = { isLoading: true,
    errMess: null,
    staffDepartments:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFF_DEPARTMENTS:
            return {...state, isLoading: false, errMess: null, staffDepartments: action.payload};

        case ActionTypes.STAFF_DEPARTMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, staffDepartments: []}

        case ActionTypes.STAFF_DEPARTMENTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};