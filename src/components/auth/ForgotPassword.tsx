import React, {FC, memo} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import Container from '@material-ui/core/Container/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ErrorSnackbar} from '../../features/errors/ErrorSnackbar';
import {changePasswordTC} from '../../bll/auth-reducer';
import {useStyles} from '../main/styles';
import {ProgressModalComponent} from '../main/commonComponents/modal/progressModalComponent/ProgressModalComponent';


export const ForgotPassword: FC = memo(() => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    const changeProcess = useSelector<AppRootStateType, boolean>(state => state.auth.changeProcess)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: values => {
            dispatch(changePasswordTC(values.email))
        },
    })


    if (!changeProcess) {
        return (
            <Container component="div" maxWidth="xs">
                <CssBaseline/>
                <ErrorSnackbar/>
                <div className={classes.authPaper}>
                    <Avatar className={classes.authAvatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Password recovery
                    </Typography>
                    <ProgressModalComponent/>
                    <form className={classes.authForm} onSubmit={formik.handleSubmit} noValidate>
                        <TextField
                            className={classes.authTextFieldStyle}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Enter your email address"
                            type="email"
                            autoFocus
                            helperText={formik.touched.email && formik.errors.email}
                            error={formik.touched.email && !!formik.errors.email}
                            {...formik.getFieldProps('email')}
                        />
                        <Button
                            className={classes.authSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={!formik.isValid || status === 'loading'}
                        >
                            Recovery
                        </Button>
                    </form>
                </div>
            </Container>
        )
    } else {
        return (
            <Container component="div" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.authPaper}>
                    <Avatar className={classes.authAvatar}>
                        <LockOpenOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        CHECK YOUR EMAIL
                    </Typography>
                </div>
            </Container>
        )
    }
})