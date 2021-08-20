import {AuthResponseType} from '../dal/api';

const initialState = {} as ProfileStateType


export const profileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {

        case 'profile/SET-PROFILE':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}
//actions

export const setProfileAC = (data: AuthResponseType) =>
    ({type: 'profile/SET-PROFILE', payload: data} as const)


//thunks


//types
export type ProfileStateType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: string,
    updated: string,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string,
}

export type SetProfileActionType = ReturnType<typeof setProfileAC>

export type ProfileActionsType =
    | SetProfileActionType