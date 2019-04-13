import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './reducers';
import {Footer} from './layouts/Footer';
import Header from './layouts/Header';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Contacts from './components/Contacts/ShowContacts'
import AddContact from './components/Contacts/addContact'
import EditContact from './components/Contacts/editContact'
import SignIn from './components/Auth/SignIn'
import SignUp from './components/Auth/SignUp'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Header/>
                    <div className="container mt-4">
                        <div className='row justify-content-center min-height-600'>
                            <Switch location={this.props.location}>
                                <Route path='/home' component={Contacts}/>
                                <Route exact path='/contact/' component={AddContact }/>
                                <Route path='/contact/:contactID' component={EditContact}/>
                                <Route path='/signIn' component={SignIn}/>
                                <Route path='/signUp' component={SignUp}/>
                                <Redirect to="/home"/>
                            </Switch>
                        </div>
                    </div>
                    <Footer/>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
