import * as ActionTypes from './ActionType';

export const Staff = (state = { isLoading: true,
    errMess: null,
    staff:[]}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_STAFFS:
            return {...state, isLoading: false, errMess: null, staff: action.payload};

        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staff: []}

        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.ADD_NEWSTAFFS:
            return {...state, isLoading: false, errMess: null, staff: action.payload};

        case ActionTypes.UPDATE_STAFF:
            return {...state, isLoading: false, errMess: null, staff: action.payload};
            
        case ActionTypes.DELETE_STAFF: 
            console.log(action.payload)
            return {...state, isLoading: false, errMess: null
           //     ,staff: state.staff.filter(item=> item.id !== action.payload)
                , staff: action.payload
            };
        default:
            return state;
    }
};