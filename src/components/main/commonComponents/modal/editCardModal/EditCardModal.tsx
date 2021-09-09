import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {EditCardRequestType, OnePackType} from '../../../../../dal/api';
import s from '../ModalWindow.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const EditCardModal: FC<EditPackModalPropsType> = memo(({closeAddPackModal, card, editCard}) => {

    const classes = useStyles()
    const [question, setQuestion] = useState(card.question)
    const [answer, setAnswer] = useState(card.answer)

    const inputChangeHandlerQuestion = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setQuestion(e.currentTarget.value), [])

    const inputChangeHandlerAnswer = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setAnswer(e.currentTarget.value), [])

    const onButtonClickHandler = useCallback(() => {
        editCard({cardsPack_id: card.cardsPack_id, _id: card._id, answer, question})
        closeAddPackModal()
    }, [card, answer, question, editCard, closeAddPackModal])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) =>
        (e.key === 'Enter') && onButtonClickHandler(), [onButtonClickHandler])

    const onBackgroundClick = () => {
        closeAddPackModal()
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div className={s.windowByAddEditDeleteCard}>
                <h2>Edit card</h2>
                <TextField
                    className={classes.questionInput}
                    label="Question"
                    margin="none"
                    variant="outlined"
                    autoFocus
                    value={question}
                    onChange={inputChangeHandlerQuestion}
                    onKeyPress={onKeyPressHandler}
                />
                <TextField
                    className={classes.answerInput}
                    label="Answer"
                    margin="normal"
                    variant="outlined"
                    value={answer}
                    onChange={inputChangeHandlerAnswer}
                    onKeyPress={onKeyPressHandler}
                />
                <Button
                    className={classes.addNewCardModalButton}
                    color="primary"
                    variant="outlined"
                    onClick={onButtonClickHandler}>Save changes</Button>
            </div>
        </>
    )
})


//types
type EditPackModalPropsType = {
    closeAddPackModal: () => void
    editCard: (data: EditCardRequestType) => void
    card: OnePackType
}

const useStyles = makeStyles(() =>
    createStyles({
        questionInput: {
            width: '450px',
        },
        answerInput: {
            width: '450px',
            marginTop: '30px',
        },
        addNewCardModalButton: {
            width: '150px',
            marginTop: '20px',
        },
    }),
);