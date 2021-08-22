import React, {FC, memo} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';
import {AppRootStateType} from '../../bll/store';
import Container from '@material-ui/core/Container/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ErrorSnackbar} from '../../features/errors/ErrorSnackbar';
import {setNewPasswordTC} from '../../bll/auth-reducer';
import {useStyles} from '../main/styles';
import {ProgressModalComponent} from '../main/commonComponents/modal/progressModalComponent/ProgressModalComponent';


export const NewPassword: FC = memo(() => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    const newPasswordSet = useSelector<AppRootStateType, boolean>(state => state.auth.newPasswordSet)
    const token = useParams<{ token: string }>()

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .max(20, 'Must be 20 characters or less')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            dispatch(setNewPasswordTC(values.password, token.token))
        },
    })

    if (newPasswordSet) {
        return <Redirect to={'/login'}/>
    }

    return (
        <Container component="div" maxWidth="xs">
            <ErrorSnackbar/>
            <CssBaseline/>
            <div className={classes.authPaper}>
                <Avatar className={classes.authAvatar}>
                    <LockOpenOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Enter new password
                </Typography>
                <ProgressModalComponent/>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        className={classes.authTextFieldStyle}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        autoFocus
                        helperText={formik.touched.password && formik.errors.password}
                        error={formik.touched.password && !!formik.errors.password}
                        {...formik.getFieldProps('password')}
                    />
                    <TextField
                        className={classes.authTextFieldStyle}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm password"
                        type="password"
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    <Button
                        className={classes.authSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={!formik.isValid || status === 'loading'}
                    >
                        SET NEW PASSWORD
                    </Button>
                </form>
            </div>
        </Container>
    )
})
