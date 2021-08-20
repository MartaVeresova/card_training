import {CardsRequestType, PacksRequestDataType} from '../dal/api';
import {PacksInitialStateType} from "../bll/packs-reducer";
import {CardsInitialStateType} from '../bll/cards-reducer';


export const packsApiModel = (packs: PacksInitialStateType, data?: PacksRequestDataType) => {
    const apiModel = {
        packName: packs.packName,
        min: packs.min,
        max: packs.max,
        sortPacks: JSON.stringify(packs.sortPacksDirection) + packs.sortBy,
        page: packs.page,
        pageCount: packs.pageCount,
        user_id: packs.user_id,
    }
    return {...apiModel, ...data}
}

export const cardsApiModel = (cards: CardsInitialStateType, data?: CardsRequestType) => {
    const apiModel = {
        cardAnswer: cards.cardAnswer,
        cardQuestion: cards.cardQuestion,
        cardsPack_id: cards.cardsPack_id,
        min: cards.min,
        max: cards.max,
        sortCards: JSON.stringify(cards.sortCardDirection) + cards.sortBy,
        page: cards.page,
        pageCount: cards.pageCount,
    }
    return {...apiModel, ...data}
}

