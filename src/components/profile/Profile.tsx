import React, {FC, memo} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../bll/store';
import {ErrorSnackbar} from '../../features/errors/ErrorSnackbar';


export const Profile: FC = memo(() => {

    const profileData = useSelector<AppRootStateType, string | null>(state => state.profile.email)


    return (
        <>
            <ErrorSnackbar/>
            Profile
            <div>Your e-mail: {profileData}</div>
        </>
    )
})