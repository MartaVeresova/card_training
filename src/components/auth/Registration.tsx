import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux';
import {ErrorSnackbar} from '../../features/errors/ErrorSnackbar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {AppRootStateType} from '../../bll/store';
import {AppStatusType} from '../../bll/app-reducer';
import {Link as RouterLink, Redirect} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {setSignUpTC} from '../../bll/auth-reducer';
import {useStyles} from '../main/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import {ProgressModalComponent} from '../main/commonComponents/modal/progressModalComponent/ProgressModalComponent';


export const Registration: React.FC = React.memo(() => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)
    const isRegistered = useSelector<AppRootStateType, boolean>(state => state.auth.isRegistered)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .max(20, 'Must be 20 characters or less')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Password is required'),
        }),
        onSubmit: values => {
            dispatch(setSignUpTC(values.email, values.password))
            formik.resetForm()
        },
    })

    if (isRegistered) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.authPaper}>
                    <Avatar className={classes.authAvatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <ProgressModalComponent/>
                    <form onSubmit={formik.handleSubmit} className={classes.authForm} noValidate>
                        <TextField
                            className={classes.authTextFieldStyle}
                            variant="outlined"
                            required
                            fullWidth
                            label="Enter your email address"
                            margin="normal"
                            autoFocus
                            helperText={formik.touched.email && formik.errors.email}
                            error={formik.touched.email && !!formik.errors.email}
                            {...formik.getFieldProps('email')}
                        />
                        <TextField
                            className={classes.authTextFieldStyle}
                            variant="outlined"
                            required
                            fullWidth
                            type="password"
                            label="Password"
                            margin="normal"
                            helperText={formik.touched.password && formik.errors.password}
                            error={formik.touched.password && !!formik.errors.password}
                            {...formik.getFieldProps('password')}
                        />
                        <TextField
                            className={classes.authTextFieldStyle}
                            variant="outlined"
                            required
                            fullWidth
                            type="password"
                            label="Confirm password"
                            margin="normal"
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        <Button
                            className={classes.authSubmit}
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={!formik.isValid || status === 'loading'}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/login">
                                    Do have an account? Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <ErrorSnackbar/>
            </Container>
        </>
    )
})