import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withRouter } from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux'
import {signOut} from "../../actions";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        cursor:'pointer',
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,

    },
};

function Header(props) {
    const {classes, history, auth, signOut} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" onClick={()=>history.push('/home')}
                                color="inherit" className={classes.grow}>
                        Address Book
                    </Typography>
                    {auth.uid ? (<React.Fragment>
                        <Button color="inherit" onClick={() => {
                            history.push('/contact')
                        }}>Add Contact</Button>

                        <Button color="inherit" onClick={() => {
                            signOut()
                        }}>Sing Out</Button>

                    </React.Fragment>) : (<React.Fragment>
                        <Button color="inherit" onClick={() => {
                            history.push('/signIn')
                        }}>Sing In</Button>

                        <Button color="inherit" onClick={() => {
                            history.push('/signUp')
                        }}>Sing Up</Button>

                    </React.Fragment>)}

                </Toolbar>
            </AppBar>
        </div>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    return {
        auth: state.firebase.auth,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter
)(Header);