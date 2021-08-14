import React, {useEffect, useState} from 'react';
import {AppBar, Tab, Tabs} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography/Typography';
import {logoutTC} from '../../bll/auth-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {AccountCircleOutlined, DynamicFeedOutlined} from '@material-ui/icons';
import {useHistory, useLocation} from 'react-router-dom';
import {useStyles} from '../main/styles';


export const Header: React.FC = React.memo(() => {

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
        <AppBar className={classes.headerApp}>
            <Typography className={classes.headerTypo} variant={'h6'}>
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
                        <Button className={classes.headerLogoutButton}
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