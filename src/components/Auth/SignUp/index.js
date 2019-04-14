import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signUp,clearAuthError} from '../../../actions'
import {Redirect} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {renderErrorMessage} from '../../../layouts/RenderFormError'



const useStyles = (theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
        textTransform: 'none',
    },
    error: {
        color: '#b71c1c',
        padding: '0px 0.4em',
    },
});
const signUpSchema = Yup.object().shape({
    email: Yup.string()
        .email('invalid format')
        .required('Required'),
    password: Yup.string()
        .min(6, 'less than 5 characters')
        .required('Required'),
    firstName:Yup.string()
        .max(50, 'max than 50 characters')
        .required('Required'),
    lastName:Yup.string()
        .max(50, 'max than 50 characters')
        .required('Required'),
});

class SignUp extends Component {
    componentWillUnmount() {
        this.props.clearAuthError();
    }
    render() {
        const { authError, auth, classes, signUp } = this.props;
        if (auth.uid) return <Redirect to='/home' />;
        return (<Formik
                initialValues={
                    {
                        email: '',
                        password: '',
                        firstName:'',
                        lastName:'',
                    }
                }
                onSubmit={(values, {setSubmitting}) => {
                    signUp(values);
                    setSubmitting(false);
                }}
                validationSchema={signUpSchema}
            >
                {props => {
                    const {
                        isSubmitting,
                    } = props;
                    return (
                        <div className='col-12 col-md-6 mx-auto text-center'>
                            <h3>SignUp</h3>
                            <Form>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <Field name="firstName" render={({field}) => (
                                        <TextField
                                            id="outlined-firstName"
                                            label="First Name"
                                            {...field}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    )}/>
                                    <ErrorMessage name="firstName"
                                                  render={(msg) => renderErrorMessage({
                                                      feildName: 'First Name',
                                                      msg,
                                                      classes,
                                                  })}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field name="lastName" render={({field}) => (
                                        <TextField
                                            id="outlined-lastName"
                                            label="Last Name"
                                            {...field}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    )}/>
                                    <ErrorMessage name="lastName"
                                                  render={(msg) => renderErrorMessage({
                                                      feildName: 'Last Name',
                                                      msg,
                                                      classes,
                                                  })}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <Field name="email" render={({field}) => (
                                        <TextField
                                            id="outlined-email"
                                            label="Email"
                                            {...field}
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    )}/>
                                    <ErrorMessage name="email"
                                                  render={(msg) => renderErrorMessage({
                                                      feildName: 'Email',
                                                      msg,
                                                      classes,
                                                  })}/>
                                </Grid>

                                <Grid item xs={12}>
                                    <Field name="password" render={({field}) => (
                                        <TextField
                                            {...field}
                                            id="outlined-password"
                                            label="Password"
                                            className={classes.textField}
                                            margin="normal"
                                            variant="outlined"
                                            type="password"
                                            autoComplete="current-password"

                                        />
                                    )}/>
                                    <ErrorMessage name="password"
                                                  render={(msg) => renderErrorMessage({
                                                      feildName: 'Password',
                                                      msg,
                                                      classes,
                                                  })}/>
                                </Grid>
                            </Grid>
                            <Typography variant="h6"
                                        className={classes.error}
                                        gutterBottom>
                                {authError}
                            </Typography>
                            <div className="text-center">
                                <Button variant="outlined" type="submit" disabled={isSubmitting}
                                        className={classes.button}>
                                    SignUp
                                </Button>
                            </div>

                        </Form></div>
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
        signUp: (creds) => dispatch(signUp(creds)),
        clearAuthError: () => dispatch(clearAuthError())
    }
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps),
)(SignUp)