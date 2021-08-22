import React, {FC, memo} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import s from './ProgressModalComponent.module.css'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../../bll/store';
import {AppStatusType} from '../../../../../bll/app-reducer';


export const ProgressModalComponent: FC = memo(() => {

    const appStatus = useSelector<AppRootStateType, AppStatusType>(state => state.app.status)

    return <>
        {
            appStatus === 'loading' &&
            <div className={s.progressContainer}>
                <div className={s.progressDiv}>
                    <CircularProgress/>
                </div>
            </div>
        }
    </>
})