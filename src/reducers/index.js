import {combineReducers} from 'redux';
import {contact} from './contact';
import {auth} from './auth';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reduxFirestore, getFirestore,firestoreReducer } from 'redux-firestore';
import { reactReduxFirebase, getFirebase,firebaseReducer } from 'react-redux-firebase';
import fbConfig from '../Firebase'
const rootReducer = combineReducers({
    contact,
    auth,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

const ConfigureStore = () => {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}), logger),
            reactReduxFirebase(fbConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}),
            reduxFirestore(fbConfig)
        )
    );

    return store;
};

export const store = ConfigureStore();