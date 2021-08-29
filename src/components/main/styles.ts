import {createStyles, makeStyles} from '@material-ui/core/styles';
import {Theme} from '@material-ui/core/styles/createTheme';

export const useStyles = makeStyles((theme: Theme) => createStyles({
//login, registration, change password
    authPaper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    authAvatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    authForm: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    authSubmit: {
        margin: theme.spacing(3, 0, 2),
    },
    authTextFieldStyle: {
        height: '65px',
    },
}))