import {
    addContactService,
    editContactService,
    DeleteContactService,
    FetchContactService,
    FetchSelectedContactService,
} from '../services';
import {
    ADD_CONTACT_LOADING,
    ADD_CONTACT_FAILURE,
    ADD_CONTACT_SUCCESS,
    EDIT_CONTACT_LOADING,
    EDIT_CONTACT_FAILURE,
    EDIT_CONTACT_SUCCESS,
    DELETE_CONTACT_LOADING,
    DELETE_CONTACT_FAILURE,
    DELETE_CONTACT_SUCCESS,
    FETCH_CONTACT_LOADING,
    FETCH_CONTACT_FAILURE,
    FETCH_CONTACT_SUCCESS,
    FETCH_SELECTED_CONTACT_LOADING,
    FETCH_SELECTED_CONTACT_SUCCESS,
    FETCH_SELECTED_CONTACT_FAILURE,
} from '../actions';
export const addContact= (contact) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        dispatch({type: ADD_CONTACT_LOADING});
        return addContactService(firestore, contact).then(() => {
            dispatch({type: ADD_CONTACT_SUCCESS});
        }).catch((err) => {
            dispatch({type: ADD_CONTACT_FAILURE, err});
        });

    }
};

export const editContact = (contact,contactID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        dispatch({type: EDIT_CONTACT_LOADING});
        return editContactService(firestore,contact,contactID).then(() => {
            dispatch({type: EDIT_CONTACT_SUCCESS})
        }).catch((err) => {
            dispatch({type: EDIT_CONTACT_FAILURE, err});
        });
    }
};

export const deleteContact = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        dispatch({type: DELETE_CONTACT_LOADING});
        return  DeleteContactService(firestore, newUser).then(() => {
            dispatch({type: DELETE_CONTACT_SUCCESS})
        }).catch((err) => {
            dispatch({type: DELETE_CONTACT_FAILURE, err});
        });
    }
};

export const fetchContact = (userID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        dispatch({type: FETCH_CONTACT_LOADING});
        FetchContactService(firestore, userID).then((response) => {
            let contacts=[];
            response.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                contacts.push({...doc.data(),id:doc.id});
            });
            dispatch({type: FETCH_CONTACT_SUCCESS,payload:contacts});
        }).catch((err) => {
            dispatch({type: FETCH_CONTACT_FAILURE, err});
        });
    }
};

export const fetchSelectedContact = (contactID) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        dispatch({type: FETCH_SELECTED_CONTACT_LOADING});
        FetchSelectedContactService(firestore, contactID).then((response) => {
            dispatch({type: FETCH_SELECTED_CONTACT_SUCCESS,payload:response.data()});
        }).catch((err) => {
            dispatch({type: FETCH_SELECTED_CONTACT_FAILURE, err});
        });
    }
};