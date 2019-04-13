import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';



function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        textAlign: 'center',
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    contactDetailsImage: {
        width: 100 + 'px',
        borderRadius: 50 + '%',
    },
});

const ContactDetails = (props) => {
    const {classes, status, handleClose, contact} = props;
    if (!contact)
        return null;
    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={status}
                onClose={handleClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="h6" id="modal-title">
                        Contact Details
                    </Typography>
                    {contact.image &&
                    <img alt={'contact'} src={contact.image} className={classes.contactDetailsImage}/>
                    }
                    {contact.firstName &&
                    <Typography variant="subtitle1" >
                        First Name : {contact.firstName}
                    </Typography>
                    }
                    {contact.lastName &&
                    <Typography variant="subtitle1" >
                        Last Name : {contact.lastName}
                    </Typography>
                    }
                    {contact.telephone &&
                    <Typography variant="subtitle1" >
                        Telephone : {contact.telephone}
                    </Typography>
                    }
                    {contact.email &&
                    <Typography variant="subtitle1" >
                        Email : {contact.email}
                    </Typography>
                    }
                    {contact.address &&
                    <Typography variant="subtitle1" >
                        Address : {contact.address}
                    </Typography>
                    }
                    {contact.mobile &&
                    <Typography variant="subtitle1" >
                        Mobile : {contact.mobile}
                    </Typography>
                    }

                </div>
            </Modal>
        </div>
    );

}

ContactDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ContactDetails);
