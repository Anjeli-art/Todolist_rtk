import React from 'react'
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const error = useSelector<AppRootType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error:null}));
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={8000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
                {/*😠*/}
            </Alert>
        </Snackbar>
    );
}
