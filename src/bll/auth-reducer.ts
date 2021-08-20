import {setProfileAC, SetProfileActionType} from './profile-reducer';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from './app-reducer';
import {AppThunk} from './store';
import {authApi, LoginParamsType} from '../dal/api';
import {changePasswordModel} from '../utils/changePasswordModel-util';

const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    changeProcess: false,
    newPasswordSet: false,
}
export type InitialStateType = typeof initialState


export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {

        case 'auth/SET-SIGN-IN':
            return {...state, isLoggedIn: action.isLoggedIn}

        case 'auth/SET-SIGN-UP':
            return {...state, isRegistered: true}

        case 'auth/CHANGE-PASSWORD':
            return {...state, changeProcess: true}

        case 'auth/SET-NEW-PASSWORD':
            return {...state, newPasswordSet: true}

        default:
            return state
    }
}

//actions
export const setSignInAC = (isLoggedIn: boolean) =>
    ({type: 'auth/SET-SIGN-IN', isLoggedIn} as const)

export const setSignUpAC = () =>
    ({type: 'auth/SET-SIGN-UP'} as const)

export const changePasswordAC = () =>
    ({type: 'auth/CHANGE-PASSWORD'} as const)

export const setNewPasswordAC = () =>
    ({type: 'auth/SET-NEW-PASSWORD'} as const)


//thunks
export const loginTC = (data: LoginParamsType): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.login(data)
        dispatch(setProfileAC(res.data))
        dispatch(setSignInAC(true))
    } catch (err) {
        const error = err.response ? err.response.data.error : (err.message + ', more details in the console')
        dispatch(setAppErrorAC(error))
    } finally {
        dispatch((setAppStatusAC('succeeded')))
    }
}

export const logoutTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authApi.logout()
        dispatch(setSignInAC(false))
    } catch (err) {
        // dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
    } finally {
        dispatch((setAppStatusAC('succeeded')))
    }
}

export const setSignUpTC = (email: string, password: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authApi.register(email, password)
        dispatch(setSignUpAC())
    } catch (err) {
        dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const changePasswordTC = (email: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authApi.changePassword(changePasswordModel(email))
        dispatch(changePasswordAC())
    } catch (err) {
        dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

export const setNewPasswordTC = (password: string, token: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.setNewPassword({password, resetPasswordToken: token})
        dispatch(setNewPasswordAC())
        dispatch(setAppErrorAC(res.data.info, 'success'))
    } catch (err) {
        dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }

}


//types
export type SetSignInActionType = ReturnType<typeof setSignInAC>
export type SetSignUpActionType = ReturnType<typeof setSignUpAC>
export type ChangePasswordActionsType = ReturnType<typeof changePasswordAC>
export type SetNewPasswordActionTypes = ReturnType<typeof setNewPasswordAC>

export type AuthActionsType =
    | SetSignInActionType
    | SetProfileActionType
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetSignUpActionType
    | ChangePasswordActionsType
    | SetNewPasswordActionTypes



