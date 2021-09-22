import {AppRootStateType, AppThunk} from './store';
import {setAppErrorAC, setAppStatusAC} from './app-reducer';
import {
    cardPacksApi,
    CardsRequestType,
    CreateCardType,
    EditCardRequestType,
    OnePackType,
    PackResponseType
} from '../dal/api';
import {cardsApiModel} from '../utils/cardsApiModel-util';


const initialState = {
    cards: [] as Array<OnePackType>,
    cardsTotalCount: 1,
    minGrade: 0,
    maxGrade: 5,
    page: 1,
    pageCount: 5,
    packUserId: '',
    cardAnswer: '',
    cardQuestion: '',
    min: 0,
    max: 5,
    sortCardDirection: 0,
    sortBy: 'updated',
    cardsPack_id: '',
    currentPackName: 'Pack name',
    searchTextAnswer: '',
    searchTexQuestion: '',
    showTitle: false,
} as CardsInitialStateType


export const cardsReducer = (state = initialState, action: PackActionsType): CardsInitialStateType => {
    switch (action.type) {

        case 'cards/SET-PACK':
            return {
                ...state,
                ...action.data,
                sortBy: action.data.sortCards.slice(1),
                sortCardDirection: Number(action.data.sortCards.substring(0, 1)),
                searchTextAnswer: action.data.cardAnswer,
                searchTexQuestion: action.data.cardQuestion,
            }

        case 'cards/RESET-PACK':
            return {
                ...state,
                cards: [],
            }
        case 'cards/SHOW-TITLE':
            return {
                ...state,
                showTitle: action.value
            }

        default:
            return state
    }
}

//actions
export const setPackAC = (data: PackResponseType & NewPackApiModelType) =>
    ({type: 'cards/SET-PACK', data} as const)
export const resetPackAC = () =>
    ({type: 'cards/RESET-PACK'} as const)
export const showTitleAC = (value: boolean) =>
    ({type: 'cards/SHOW-TITLE', value} as const)


//thunks
export const setPackTC = (data: CardsRequestType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const newPackApiModel = cardsApiModel(getState().cards, data)
        const pastPageCount = getState().cards.pageCount
        const currentPage = getState().cards.page
        const currentPageCount = newPackApiModel.pageCount
        const newPage = pastPageCount !== currentPageCount
            ? Math.floor(pastPageCount * (currentPage - 1) / currentPageCount) + 1
            : newPackApiModel.page
        try {
            const res = await cardPacksApi.fetchPack({...newPackApiModel, page: newPage})
            dispatch(setPackAC({...res.data, ...newPackApiModel, page: newPage}))
            dispatch(showTitleAC(true))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
            dispatch(setAppStatusAC('succeeded'))
        }
    }
export const createCardTC = (data: CreateCardType): AppThunk =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardPacksApi.createCard({...data})
            dispatch(setPackTC({cardsPack_id: data.cardsPack_id, page: 1, sortCards: '0updated',}))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
        }
    }
export const deleteCardTC = (cardsPack_id: string, cardId: string): AppThunk =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardPacksApi.deleteCard(cardId)
            dispatch(setPackTC({cardsPack_id}))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
        }
    }
export const editCardTC = (data: EditCardRequestType): AppThunk =>
    async (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        try {
            await cardPacksApi.editCard({...data})
            dispatch(setPackTC({cardsPack_id: data.cardsPack_id}))
        } catch (err) {
            dispatch(setAppErrorAC(err.response ? err.response.data.error : err.message))
        } finally {
        }
    }

//types
export type CardsInitialStateType = PackResponseType & {
    cardAnswer: string
    cardQuestion: string
    min: number
    max: number
    sortCardDirection: number
    sortBy: string
    cardsPack_id: string
    currentPackName: string
    searchTextAnswer: string
    searchTexQuestion: string
    showTitle: boolean
}
type NewPackApiModelType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}

export type SetPackActionType = ReturnType<typeof setPackAC>
export type ResetPackActionType = ReturnType<typeof resetPackAC>
export type ShowTitleActionType = ReturnType<typeof showTitleAC>

export type PackActionsType =
    | SetPackActionType
    | ResetPackActionType
    | ShowTitleActionType