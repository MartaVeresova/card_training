import React, {FC, memo, ReactElement} from 'react';
import {Redirect, Route} from 'react-router-dom';


export const PrivateRoute: FC<PropsType> = memo(({render: Component, isLoggedIn, path, redirectTo}) => {


    return (
        <Route exact path={path} render={() => isLoggedIn
            ? <Component/>
            : <Redirect to={redirectTo}/>
        }/>
    )
})

type PropsType = {
    render: () => ReactElement
    isLoggedIn: boolean
    exact?: boolean | undefined
    path: string
    redirectTo: string
}