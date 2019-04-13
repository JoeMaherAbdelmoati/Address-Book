import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    SIGNOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
} from '../actions';


const initState = {
    authError: null
}

export const auth = (state = initState, action) => {
    switch(action.type){
        case LOGIN_ERROR:

            return {
                ...state,
                authError: 'Login failed'
            };

        case LOGIN_SUCCESS:

            return {
                ...state,
                authError: null
            };

        case SIGNOUT_SUCCESS:

            return state;

        case SIGNUP_SUCCESS:
            return {
                ...state,
                authError: null
            };

        case SIGNUP_ERROR:
            return {
                ...state,
                authError: action.err.message
            };

        default:
            return state
    }
};

