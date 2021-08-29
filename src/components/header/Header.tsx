import React, {FC, memo, useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography/Typography';
import {logoutTC} from '../../bll/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
import DynamicFeedOutlined from '@material-ui/icons/DynamicFeedOutlined';
import {useHistory, useLocation} from 'react-router-dom';
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const Header: FC = memo(() => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const [value, setValue] = useState(0)

    useEffect(() => {
        if (location.pathname === '/profile') {
            setValue(1)
        } else {
            setValue(0)
        }
    }, [location, value])

    const onPacksClickHandler = () => {
        setValue(0)
        history.push('/')
    }
    const onProfileClickHandler = () => {
        setValue(1)
        history.push('/profile')
    }
    const obLogOutClick = () => {
        dispatch(logoutTC())
    }

    return <>
        <AppBar className={classes.app}>
            <Typography className={classes.typo} variant={'h6'}>
                CARDS
            </Typography>
            {
                isLoggedIn ?
                    <>
                        <Tabs
                            value={value}
                            centered
                        >
                            <Tab onClick={onPacksClickHandler}
                                 label={'Packs List'}
                                 icon={<DynamicFeedOutlined/>}/>
                            <Tab onClick={onProfileClickHandler}
                                 label={'Profile'}
                                 icon={<AccountCircleOutlined/>}/>
                        </Tabs>
                        <Button className={classes.logoutButton}
                                onClick={obLogOutClick}
                                variant="outlined"
                        >
                            LOGOUT
                        </Button>
                    </> : null
            }
        </AppBar>
    </>
})

const useStyles = makeStyles(() =>
    createStyles({
        app: {
            position: 'static',
            flexDirection: 'row',
            display: 'flex',
            height: '72px',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        typo: {
            marginLeft: '10px',
        },
        logoutButton: {
            color: 'white',
            borderColor: 'white',
            marginRight: '10px',
        },
    }),
);