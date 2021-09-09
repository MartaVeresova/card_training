import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import s from '../ModalWindow.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const AddCardModal: FC<AddPackModalPropsType> = memo(({closeAddPackModal, addNewCard}) => {

    const classes = useStyles()
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const onButtonClickHandler = useCallback(() => {
        addNewCard(question, answer)
        closeAddPackModal()
    }, [question, answer, addNewCard, closeAddPackModal])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) =>
        (e.key === 'Enter') && onButtonClickHandler(), [onButtonClickHandler])

    const inputChangeHandlerQuestion = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setQuestion(e.currentTarget.value), [])

    const inputChangeHandlerAnswer = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setAnswer(e.currentTarget.value), [])

    const onBackgroundClick = () => {
        closeAddPackModal()
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div className={s.windowByAddEditDeleteCard}>
                <h2>Create new card</h2>
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
                    onClick={onButtonClickHandler}>Add new card</Button>
            </div>
        </>
    )
})

//types
type AddPackModalPropsType = {
    closeAddPackModal: () => void
    addNewCard: (question: string, answer: string) => void
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