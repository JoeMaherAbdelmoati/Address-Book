import Typography from '@material-ui/core/Typography';
import React from "react";

export const renderErrorMessage = ({feildName, msg, classes}) =>
    (<Typography variant="h6"
                 className={classes.error}
                 gutterBottom>
        {`${feildName} is ${msg}`}
    </Typography>);