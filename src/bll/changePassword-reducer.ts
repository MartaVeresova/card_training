import {AppThunk} from './store';
import {changePasswordApi} from '../dal/changePassword-api';
import {changePasswordModel} from '../utils/changePasswordModel-util';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';

const initialState = {
    changeProcess: false
}

export const changePasswordReducer = (state = initialState, action: ChangePasswordActionsType): InitialStateType => {

    switch (action.type) {
        case 'changePassword/CHANGE-PASSWORD':
            return {...state, changeProcess: true}
        default:
            return state
    }
}

// Action creators
export const changePasswordAC = () => ({type: 'changePassword/CHANGE-PASSWORD'} as const)


//THUNK creators
export const changePasswordTC = (email: string): AppThunk => async dispatch => {
    debugger
    dispatch(setAppStatusAC('loading'))
    try {
        await changePasswordApi.changePassword(changePasswordModel(email))
        dispatch(changePasswordAC())
    } catch (e) {
        dispatch(setAppErrorAC(e.response ? e.response.data.error : e.message))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
    }
}

// Types
type InitialStateType = typeof initialState
export type ChangePasswordActionsType =
    | ReturnType<typeof changePasswordAC>

