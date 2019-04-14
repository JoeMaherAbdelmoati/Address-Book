import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editContact, fetchSelectedContact} from '../../../actions'
import {Redirect} from 'react-router-dom'
import {Formik} from 'formik';
import * as Yup from 'yup';
import 'react-image-crop/dist/ReactCrop.css';
import InnerForm from '../InnerForm';
import {Loading} from "../../../layouts/Loading";
import Typography from '@material-ui/core/Typography';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const editContactSchema = Yup.object().shape({
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

class EditContact extends Component {
    state = {base64Image: null};
    handleProcessImage = (base64Image) => {
        this.setState({base64Image})
    };

    componentDidMount() {
        const {
            fetchSelectedContact,
            match,
        } = this.props;
        fetchSelectedContact(match.params.contactID);
    }

    render() {
        const {authError, auth, classes, editContact, history, match, contact} = this.props;
        const {base64Image} = this.state;
        if (!auth.uid) return <Redirect to='/signIn'/>;
        if(contact.errorMessage)
            return <Typography variant="h6"
                               className={'error'}
                               gutterBottom>
                {contact.errorMessage}
            </Typography>
        if (contact.isLoading || !contact.selectedContact)
            return <Loading/>
        return (<Formik
                initialValues={
                    {
                        firstName: contact.selectedContact.firstName || '',
                        lastName: contact.selectedContact.lastName || '',
                        telephone: contact.selectedContact.telephone || '',
                        email: contact.selectedContact.email || '',
                        address: contact.selectedContact.address || '',
                        mobile: contact.selectedContact.mobile || '',
                    }
                }
                onSubmit={(values, {setSubmitting}) => {
                    if (base64Image)
                        values.image = base64Image;
                    editContact(values, match.params.contactID).then(() => {
                        history.push('/home')
                    });
                    setSubmitting(false);
                }}
                validationSchema={editContactSchema}
            >
                {props => {
                    const {
                        isSubmitting,
                    } = props;
                    return (
                        <React.Fragment>
                            <div className='col-12 text-center'>
                            <h3>Edit Contact</h3>
                            <InnerForm
                                image={contact.selectedContact.image}
                                isSubmitting={isSubmitting}
                                authError={authError}
                                classes={classes}
                                handleProcessImage={this.handleProcessImage}
                                base64Image={base64Image}
                            />
                            </div>
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
        auth: state.firebase.auth,
        contact: state.contact
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        editContact: (contact, contactID) => dispatch(editContact(contact, contactID)),
        fetchSelectedContact: (contactID) => dispatch(fetchSelectedContact(contactID)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContact)