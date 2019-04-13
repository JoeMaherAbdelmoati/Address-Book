import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Info from '@material-ui/icons/Info';
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import {fetchContact, deleteContact} from "../../../actions";
import {sortBy} from 'lodash';
import {Loading} from '../../../layouts/Loading';
import ContactDetails from '../ContactDetails';
import Confirmation from '../../../layouts/Confirmation';

const styles = {
    card: {
        maxWidth: 350,
        minWidth:220,
        height: 380,
        width: 100 + '%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media: {
        height: 200,
        width: 200,
        borderRadius: 50 + '%'
    },
};

class MediaCard extends React.Component {
    state = {
        detailsStatus: false,
        contactDetails: null,

        confirmStatus: false,
        contactID: null
    }

    componentDidMount() {
        const {
            fetchContact,
            auth,
        } = this.props;
        if(auth.uid)
            fetchContact(auth.uid);
    }

    handleDelete = (id) => {
        const {deleteContact, auth, fetchContact} = this.props;
        deleteContact(id).then(() => {
            fetchContact(auth.uid);
        })
    };
    handleOpenDetails = (contact) => {
        this.setState({
            detailsStatus: true,
            contactDetails: contact,
        })
    };
    handleCloseDetails = () => {
        this.setState({detailsStatus: false})
    };

    handleOpenConfirm = (contactID) => {

        this.setState({
            confirmStatus: true,
            contactID,
        })
    };
    handleCloseConfirm = () => {
        this.setState({confirmStatus: false})
    };
    handleConfirm = () => {
        this.handleCloseConfirm();
        this.handleDelete(this.state.contactID);
    }

    render() {

        const {classes, auth, contact, history} = this.props;
        const {detailsStatus, contactDetails, confirmStatus} = this.state;
        if (!auth.uid) return <Redirect to='/signIn'/>;
        if (contact.isLoading||!contact.contacts)
            return <Loading/>
        if (contact.contacts&&contact.contacts.length===0)
            return <h3>No contact exists</h3>
        contact.contacts = sortBy(contact.contacts, ['firstName'])
        let contacts = contact.contacts.map((item) => {
            return (
                <div key={item.id} className='col-12 col-sm-6 col-lg-3 py-2'>
                <Card  className={classes.card + ' custom-shadow mx-4'}>
                    <CardActionArea className={'py-3'} component="div">
                        <CardMedia
                            className={classes.media + ' mx-auto'}
                            image={item.image || "/man-user.png"}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className='text-center'>
                                {`${item.firstName} ${item.lastName || ''}`}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions className='justify-content-center'>
                        <Edit className='icons' onClick={() => {
                            history.push('/contact/' + item.id)
                        }}/>
                        <Delete className='icons' onClick={() => {
                            this.handleOpenConfirm(item.id)
                        }}/>
                        <Info className='icons' onClick={() => {
                            this.handleOpenDetails(item)
                        }}/>
                    </CardActions>
                </Card>
                </div>
            )
        })
        return (
            <React.Fragment>

                    {contacts}
                    <ContactDetails
                        handleOpen={this.handleOpenDetails}
                        handleClose={this.handleCloseDetails}
                        status={detailsStatus}
                        contact={contactDetails}
                    />
                    <Confirmation
                        handleOpen={this.handleOpenConfirm}
                        handleClose={this.handleCloseConfirm}
                        status={confirmStatus}
                        handleConfirm={this.handleConfirm}
                    />
            </React.Fragment>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        contact: state.contact,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchContact: (userID) => dispatch(fetchContact(userID)),
        deleteContact: (contactID) => dispatch(deleteContact(contactID)),
    }
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles))(MediaCard);