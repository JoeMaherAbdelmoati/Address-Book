import {ErrorMessage, Field, Form} from "formik";
import React from "react";
import {renderErrorMessage} from '../../../layouts/RenderFormError';
import ImageCropper from '../../ImageCropper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';

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
const innerForm = (props) => {
    const {classes, handleProcessImage, base64Image, isSubmitting, authError,image} = props;
    return (<Form>
        <Grid container spacing={24}>
            <ImageCropper image={image} onProcessImage={handleProcessImage} processedImage={base64Image}/>
        </Grid>
        <div className='col-12 col-md-6 mx-auto'>
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
                <Field name="telephone" render={({field}) => (
                    <TextField
                        id="outlined-telephone"
                        label="Telephone"
                        {...field}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                )}/>
                <ErrorMessage name="telephone"
                              render={(msg) => renderErrorMessage({
                                  feildName: 'Telephone',
                                  msg,
                                  classes,
                              })}/>
            </Grid>

            <Grid item xs={12}>
                <Field name="email" render={({field}) => (
                    <TextField
                        {...field}
                        id="outlined-email"
                        label="Email"
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
                <Field name="address" render={({field}) => (
                    <TextField
                        {...field}
                        id="outlined-address"
                        label="Address"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        multiline={true}
                    />
                )}/>
                <ErrorMessage name="address"
                              render={(msg) => renderErrorMessage({
                                  feildName: 'Address',
                                  msg,
                                  classes,
                              })}/>
            </Grid>
            <Grid item xs={12}>
                <Field name="mobile" render={({field}) => (
                    <TextField
                        {...field}
                        id="outlined-mobile"
                        label="Mobile"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"

                    />
                )}/>
                <ErrorMessage name="mobile"
                              render={(msg) => renderErrorMessage({
                                  feildName: 'Mobile',
                                  msg,
                                  classes,
                              })}/>
            </Grid>
        </div>
        <Typography variant="h6"
                    className={classes.error}
                    gutterBottom>
            {authError}
        </Typography>
        <div className="text-center">
            <Button variant="outlined" type="submit" disabled={isSubmitting}
                    className={classes.button}>
                Save
            </Button>
        </div>

    </Form>)

};
export default withStyles(useStyles)(innerForm);