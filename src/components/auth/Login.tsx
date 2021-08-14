import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from '../../bll/auth-reducer';
import {AppRootStateType} from '../../bll/store';
import {Link as RouterLink} from 'react-router-dom'
import {AppStatusType} from '../../bll/app-reducer';
import * as Yup from 'yup';
import {ErrorSnackbar} from '../../features/errors/ErrorSnackbar';
import {useStyles} from '../main/styles';
import {ProgressModalComponent} from '../main/commonComponents/modal/progressModalComponent/ProgressModalComponent';


export const Login: React.FC = React.memo(() => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                //.min(8, 'Your password is too short')
                .required('Password is required')
        }),
        onSubmit: values => {
            dispatch(loginTC(values));
            formik.resetForm()
        },
    })


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.authPaper}>
                <Avatar className={classes.authAvatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <ProgressModalComponent/>
                <form className={classes.authForm} onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                        className={classes.authTextFieldStyle}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        helperText={formik.touched.email && formik.errors.email}
                        error={formik.touched.email && !!formik.errors.email}
                        {...formik.getFieldProps('email')}
                    />
                    <TextField
                        className={classes.authTextFieldStyle}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && !!formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                        {...formik.getFieldProps('rememberMe')}
                    />
                    <Button
                        className={classes.authSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!formik.isValid || status === 'loading'}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to="/changepassword">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/registration">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <ErrorSnackbar/>
        </Container>
    )
})