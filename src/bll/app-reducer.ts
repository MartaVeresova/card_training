import {setSignInAC, SetSignInActionType} from './auth-reducer';
import {AppThunk} from './store';
import {setProfileAC} from './profile-reducer';
import {authApi} from '../dal/api';

const initialState = {
    error: null as string | null,
    errorType: null as AppErrorType | null,
    status: 'succeeded' as AppStatusType,
    isInitialized: false
}
export type InitialStateType = typeof initialState


export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {

        case 'app/SET-APP-ERROR':
            return {...state, error: action.error, errorType: action.errorType}

        case 'app/SET-APP-STATUS':
            return {...state, status: action.status}

        case 'app/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}

        default:
            return state
    }
}

//actions
export const setAppErrorAC = (error: string | null, errorType: AppErrorType | null = null) =>
    ({type: 'app/SET-APP-ERROR', error, errorType} as const)

export const setAppStatusAC = (status: AppStatusType) =>
    ({type: 'app/SET-APP-STATUS', status} as const)

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'app/SET-IS-INITIALIZED', isInitialized} as const)

//thunks

export const initializeAppTC = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.me()
        if (res.data) {
            dispatch(setProfileAC(res.data))
            dispatch(setSignInAC(true))
            dispatch(setProfileAC(res.data))
        }
    } catch (err) {
        // dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
    } finally {
        dispatch(setIsInitializedAC(true))
        dispatch(setAppStatusAC('succeeded'))
    }
}

//types
export type AppStatusType = 'loading' | 'succeeded'
export type AppErrorType = 'error' | 'warning' | 'info' | 'success'

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetSignInActionType
    | SetIsInitializedActionType
