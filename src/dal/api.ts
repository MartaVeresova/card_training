import axios from 'axios';


const instance = axios.create({
    baseURL: `https://neko-back.herokuapp.com/2.0`,
    // baseURL: `http://localhost:7542/2.0/`,
    withCredentials: true,
})


export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<AuthResponseType>(`auth/login`, data)
    },
    me() {
        return instance.post<AuthResponseType>(`auth/me`)
    },
    logout() {
        return instance.delete(`auth/me`)
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType>(`/auth/register`, {email, password})
    },
    changePassword(model: ChangePasswordModelType) {
        return instance.post<ChangePasswordResponseType>(`auth/forgot`, model)
    },
    setNewPassword(model: SetNewPasswordType) {
        return instance.post<SetNewPasswordResponseType>('auth/set-new-password', model)
    },
}


export const cardPacksApi = {
    fetchPacks(payload?: PacksRequestDataType) {
        let generateURL = '?'
        if (!!payload) {
            Object.entries(payload).forEach(el => {
                generateURL += el[0] + '=' + el[1] + '&'
            })
        }
        const newURL = generateURL.slice(0, -1)
        return instance.get<PacksResponseType>(`cards/pack${newURL}`)
    },
    createPack(pack: CreatePackRequestType) {
        return instance.post(`cards/pack`, pack)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack(data: UpdatePackRequestType) {
        return instance.put(`cards/pack`, {cardsPack: data})
    },

    fetchPack(payload: CardsRequestType) {
        let generateURL = '?'
        if (!!payload) {
            Object.entries(payload).forEach(el => {
                generateURL += el[0] + '=' + el[1] + '&'
            })
        }
        const newURL = generateURL.slice(0, -1)
        return instance.get<PackResponseType>(`/cards/card${newURL}`)
    },
    createCard(data: CreateCardType) {
        return instance.post(`cards/card`, {card: data})
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    editCard(data: EditCardRequestType) {
        return instance.put(`cards/card`, {card: data})
    },
    updatedGrade(payload: GradeRequestType) {
        return instance.put<GradeResponseType>(`/cards/grade`, payload)
    },
}

//login type
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type AuthResponseType = {
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
    error?: string
}
//register type
export type RegisterResponseType = {
    error?: string
}
//change password type
type ChangePasswordModelType = {
    email: string,
    from: string,
    message: string,
}
type ChangePasswordResponseType = {
    info: string,
    error: string,
}
type SetNewPasswordType = {
    password: string,
    resetPasswordToken: string,
}
type SetNewPasswordResponseType = {
    info: string,
    error: string,
}

//get packs type
export type PacksRequestDataType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
export type PacksResponseType = {
    cardPacks: Array<PacksType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type PacksType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

//create cards type
export type CreatePackRequestType = {
    cardsPack: PackDataType
}
export type PackDataType = {
    name?: string | null
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

//update cards type
export type UpdatePackRequestType = {
    _id: string,
    name?: string,
}

//get cards type
export type CardsRequestType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type PackResponseType = {
    cards: Array<OnePackType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type OnePackType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

//create card type
export type CreateCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
export type EditCardRequestType = CreateCardType & {
    _id: string
}

//update grade
export type GradeRequestType = {
    grade: number
    card_id: string
}
export type GradeResponseType = {
    updatedGrade: GradeDataType
}
export type GradeDataType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}