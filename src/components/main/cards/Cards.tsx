import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {ProgressModalComponent} from '../commonComponents/modal/progressModalComponent/ProgressModalComponent';
import Container from '@material-ui/core/Container/Container';
import {Input} from '../commonComponents/Input';
import TableContainer from '@material-ui/core/TableContainer';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {CardsInitialStateType, createCardTC, setPackTC, showTitleAC} from '../../../bll/cards-reducer';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import {CardsTable} from './cards/CardsTable';
import {useHistory, useLocation} from 'react-router-dom';
import {AppRootStateType} from '../../../bll/store';
import {PacksInitialStateType} from '../../../bll/packs-reducer';
import {saveState} from '../../../utils/localStorage-util';
import Button from '@material-ui/core/Button';
import {AddCardModal} from '../commonComponents/modal/addCardModal/AddCardModal';
import {trimmedString} from '../../../utils/trimmedString-util';
import s from './Cards.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const Cards: FC = memo(() => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
    const packs = useSelector<AppRootStateType, PacksInitialStateType>(state => state.packs)
    const packID = useLocation().pathname.substring(6)
    const cardsPack_id = cards.cardsPack_id
    const idUser = useSelector<AppRootStateType, string>(state => state.profile._id)

    const [cardQuestion, setCardQuestion] = useState('')
    const [cardAnswer, setCardAnswer] = useState('')
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()
    const [addPackModal, setAddPackModal] = useState(false)

    let packName = cards.currentPackName
    if (packs.cardPacks.length) {
        packName = packs.cardPacks.filter(card => card._id === packID)[0].name
    }
    useEffect(() => {
        saveState({
            cards: {...cards, currentPackName: packName, cards: []}
        })
    }, [packName, cards])

    useEffect(() => {
        dispatch(setPackTC({cardsPack_id: packID, page: 1, pageCount: 5, cardQuestion: '', cardAnswer: ''}))
        return function () {
            setCardQuestion('')
            setCardAnswer('')
            dispatch(showTitleAC(false))
        }
    }, [dispatch, packID])

    const onClickHandler = useCallback(() => {
        history.goBack()
    }, [history])

    const closeAddPackModal = useCallback(() => {
        setAddPackModal(false)
    }, [])

    const addNewCard = useCallback((question: string, answer: string) => {
        dispatch(createCardTC({cardsPack_id, question, answer}))
    }, [dispatch, cardsPack_id])

    const searchQuestionHandler = useCallback((value: string) => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        setCardQuestion(value)
        const newIntervalID = setTimeout(() => {
            dispatch(setPackTC({cardQuestion: value, cardAnswer, page: 1}))
        }, 800)
        setIntervalId(newIntervalID)
    }, [dispatch, intervalId, cardAnswer])

    const searchAnswerHandler = useCallback((value: string) => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        setCardAnswer(value)
        const newIntervalID = setTimeout(() => {
            dispatch(setPackTC({cardQuestion, cardAnswer: value, page: 1}))
        }, 800)
        setIntervalId(newIntervalID)
    }, [dispatch, cardQuestion, intervalId])

    const openAddPackModal = () => {
        setAddPackModal(true)
    }


    return (
        <Container className={classes.container}>
            {
                addPackModal &&
                <AddCardModal closeAddPackModal={closeAddPackModal}
                              addNewCard={addNewCard}/>
            }
            <Paper className={classes.paper}>
                <ProgressModalComponent/>
                <Container className={classes.body}>
                    <div className={s.backToPackAndTitle}>
                        <KeyboardBackspaceIcon onClick={onClickHandler} style={{cursor: 'pointer'}}/>
                        <h3 className={s.titleBackToPacks}>Back to packs</h3>
                        <div className={s.packListHeading}>{trimmedString(packName, 50)}</div>
                    </div>
                    <div className={s.inputButtonSection}>
                        <Input
                            placeholderValue={'Search by questions'}
                            value={cardQuestion}
                            dispatchHandler={searchQuestionHandler}
                        />
                        <Input
                            placeholderValue={'Search by answer'}
                            value={cardAnswer}
                            dispatchHandler={searchAnswerHandler}
                        />
                        <Button
                            className={classes.addNewCardButton}
                            variant="contained"
                            color="primary"
                            onClick={openAddPackModal}
                            disabled={cards.packUserId !== idUser}
                        >
                            Add new card
                        </Button>
                    </div>

                    {
                        cards.showTitle
                            ? cards.cardsTotalCount > 0
                                ? <TableContainer className={classes.packsCardsFooter} component={Paper}>
                                        <CardsTable labelRowsPerPage={'Cards per page'}/>
                                    </TableContainer>
                                : <div className={s.titleOfEmptyPack}>
                                    {cards.packUserId === idUser
                                        ? <p>This pack is empty. Click Add new card to fill this pack.</p>
                                        : <p>This pack is empty. Wait for it to fill up.</p>}
                                </div>
                            : null
                    }
                </Container>
            </Paper>
            <ErrorSnackbar/>
        </Container>
    )
})

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            padding: '0 12px',
        },
        paper: {
            marginTop: '20px',
            marginBottom: '60px',
            display: 'flex',
            flexDirection: 'row',
            minHeight: '600px',
            minWidth: '1000px',
        },
        body: {
            margin: '10px 12px',
            padding: '0 12px',
        },
        addNewCardButton: {
            width: '330px',
        },
        packsCardsFooter: {
            marginTop: '20px',
        },
    }),
);