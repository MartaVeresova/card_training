import {CardsInitialStateType} from '../bll/cards-reducer';


export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('team_project');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: localStorageStateType) => {
    const prevState = loadState()
    try {
        const serializedState = JSON.stringify({...prevState, ...state});
        localStorage.setItem('team_project', serializedState);
    } catch {

    }
};

//types
type PacksLocalStorageType = {
    packs: {
        cardPacks: []
        myPacks: boolean
        page: number
        pageCount: number
        min: number
        max: number
        minCardsCount: number
        maxCardsCount: number
        sortPacksDirection: number
        sortBy: string
        user_id: string
        packName: string
        searchText: string
        cardPacksTotalCount: number
    }
}
type CardsLocalStorageType = {
    cards: CardsInitialStateType
}
type localStorageStateType = PacksLocalStorageType | CardsLocalStorageType