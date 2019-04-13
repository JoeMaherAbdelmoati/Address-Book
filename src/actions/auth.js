import {signInService, signOutService, signUpService} from '../services';
import {
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    SIGNOUT_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_ERROR,
    CLEAR_CONTACT,
    CLEAR_LOGIN_ERROR,
} from '../actions';

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        signInService(firebase, credentials).then(() => {
            dispatch({type: LOGIN_SUCCESS});
        }).catch((err) => {
            dispatch({type: LOGIN_ERROR, err});
        });

    }
};

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        signOutService(firebase).then(() => {
            dispatch({type: SIGNOUT_SUCCESS})
            dispatch({type: CLEAR_CONTACT})
        });
    }
};

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        signUpService(firebase, firestore, newUser).then(() => {
            dispatch({type: SIGNUP_SUCCESS});
        }).catch((err) => {
            dispatch({type: SIGNUP_ERROR, err});
        });
    }
};
export const clearAuthError= () => {
    return (dispatch) => {
            dispatch({type: CLEAR_LOGIN_ERROR});
    }
};