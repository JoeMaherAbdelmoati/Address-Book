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
    CLEAR_CONTACT,
} from '../actions';

export const contact = (state = {
    isLoading: true,
    errorMessage: null,
    contacts: null,
    selectedContact: null,
}, action) => {
    switch (action.type) {
        case ADD_CONTACT_LOADING:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };

        case ADD_CONTACT_FAILURE:
            return {
                ...state,
                isLoading: true,
                errorMessage: action.err.message,
            };

        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };

        case EDIT_CONTACT_LOADING:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };

        case EDIT_CONTACT_FAILURE:
            return {
                ...state,
                isLoading: true,
                errorMessage: action.err.message,
            };

        case EDIT_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };
        case DELETE_CONTACT_LOADING:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };

        case DELETE_CONTACT_FAILURE:
            return {
                ...state,
                isLoading: true,
                errorMessage: action.err.message,
            };

        case DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };
        case FETCH_CONTACT_LOADING:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };

        case FETCH_CONTACT_FAILURE:
            return {
                ...state,
                isLoading: true,
                errorMessage: action.err.message,
            };

        case FETCH_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                contacts: action.payload
            };
        case FETCH_SELECTED_CONTACT_LOADING:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
            };

        case FETCH_SELECTED_CONTACT_FAILURE:
            return {
                ...state,
                isLoading: true,
                errorMessage: action.err.message,
            };

        case FETCH_SELECTED_CONTACT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                selectedContact: action.payload
            };
            case CLEAR_CONTACT:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                selectedContact: null,
                contacts:null
            };
        default:
            return state;
    }
};