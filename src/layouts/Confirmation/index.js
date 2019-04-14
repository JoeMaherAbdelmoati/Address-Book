import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


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
});

const Confirmation = (props) => {
    const {classes, status, handleClose, handleConfirm} = props;
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
                        Confirmation
                    </Typography>
                    <Typography variant='subtitle1'>
                        This operation is not invertible!
                    </Typography>
                    <Typography variant="subtitle1">
                        Are you sure to delete this contact ?
                    </Typography>
                    <Button variant="outlined" onClick={handleConfirm}>
                        Yes
                    </Button>
                </div>
            </Modal>
        </div>
    );

}

Confirmation.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Confirmation);
