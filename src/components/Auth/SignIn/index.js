import React, {Component} from 'react'
import {connect} from 'react-redux'
import {signIn, clearAuthError} from '../../../actions'
import {Redirect} from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {compose} from 'redux';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {renderErrorMessage} from '../../../layouts/RenderFormError'
import Typography from '@material-ui/core/Typography';



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
const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email('invalid format')
        .required('Required'),
    password: Yup.string()
        .min(6, 'less than 5 characters')
        .required('Required'),
});

class SignIn extends Component {
    componentWillUnmount() {
        this.props.clearAuthError();
    }

    render() {
        const { authError, auth, classes, signIn } = this.props;
        if (auth.uid) return <Redirect to='/home' />;
        return (<Formik
                initialValues={
                    {
                        email: '',
                        password: ''
                    }
                }
                onSubmit={(values, {setSubmitting}) => {
                    signIn(values)
                    setSubmitting(false);
                }}
                validationSchema={signInSchema}
            >
                {props => {
                    const {
                        isSubmitting,
                    } = props;
                    return (
                        <div className='col-12 col-md-6 mx-auto  text-center'>
                            <h3>Sign In</h3>
                            <Form>
                            <Grid container spacing={24}>
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
                            <div>
                                <Typography variant="h6"
                                            className={classes.error}
                                            gutterBottom>
                                    {authError&&authError+' : Email or Password is incorrect'}
                                </Typography>

                            </div>
                            <div className="text-center">
                                <Button variant="outlined" type="submit" disabled={isSubmitting}
                                        className={classes.button}>
                                    SignIn
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
        signIn: (creds) => dispatch(signIn(creds)),
        clearAuthError: () => dispatch(clearAuthError())
    }
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, mapDispatchToProps),
)(SignIn)