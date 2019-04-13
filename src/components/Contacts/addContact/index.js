import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addContact} from '../../../actions'
import {Redirect} from 'react-router-dom'
import {Formik} from 'formik';
import * as Yup from 'yup';
import 'react-image-crop/dist/ReactCrop.css';
import {pickBy, isNaN} from 'lodash';
import InnerForm from '../InnerForm';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const addContactSchema = Yup.object().shape({
    firstName: Yup.string()
        .max(50, 'max than 50 characters')
        .required('Required'),
    lastName: Yup.string()
        .max(50, 'max than 50 characters'),
    telephone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .max(20, 'max than 20 characters'),
    email: Yup.string()
        .email('invalid format'),
    address: Yup.string()
        .max(150, 'max than 50 characters'),
    mobile: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .max(20, 'max than 20 characters'),
});

class AddContact extends Component {
    state = {base64Image: null};
    handleProcessImage = (base64Image) => {
        this.setState({base64Image})
    };

    render() {
        const {authError, auth, classes, addContact, history} = this.props;
        const {base64Image} = this.state;
        if (!auth.uid) return <Redirect to='/signIn'/>;
        return (<Formik
                initialValues={
                    {
                        firstName: '',
                        lastName: '',
                        telephone: '',
                        email: '',
                        address: '',
                        mobile: '',
                    }
                }
                onSubmit={(values, {setSubmitting}) => {
                    values.image = base64Image;
                    values.userID = auth.uid;
                    values = pickBy(values, (item) => {
                        return item !== null && item !== undefined && item !== '' && !isNaN(item)
                    });
                    addContact(values).then(() => {
                        history.push('/home')
                    });
                    setSubmitting(false);
                }}
                validationSchema={addContactSchema}
            >
                {props => {
                    const {
                        isSubmitting,
                    } = props;
                    return (
                        <React.Fragment>
                            <div className='col-12 text-center'>
                                <h3>Add Contact</h3>
                                <InnerForm
                                    isSubmitting={isSubmitting}
                                    authError={authError}
                                    classes={classes}
                                    handleProcessImage={this.handleProcessImage}
                                    base64Image={base64Image}
                                /></div>
                        </React.Fragment>
                    );
                }}
            </Formik>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addContact: (contact) => dispatch(addContact(contact)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)