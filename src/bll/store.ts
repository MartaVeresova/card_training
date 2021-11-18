import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk'
import {authReducer, AuthActionsType} from './auth-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import {profileReducer} from './profile-reducer';
import {PacksActionsType, packsReducer} from './packs-reducer';
import {loadState} from '../utils/localStorage-util';
import {PackActionsType, cardsReducer} from './cards-reducer';
import {CardsForLearnActionsType, cardsForLearnReducer} from './learn-reducer';


const rootReducers = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
    cardsForLearn: cardsForLearnReducer,
});

export const store = createStore(rootReducers, loadState(), applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducers>
export type AppRootActionsType =
    | AuthActionsType
    | AppActionsType
    | PacksActionsType
    | PackActionsType
    | CardsForLearnActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>


// @ts-ignore
window.store = store;
