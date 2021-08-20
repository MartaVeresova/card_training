import React, {ChangeEvent, useState} from 'react';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import s from '../ModalWindow.module.css'
import {useStyles} from '../../../styles';


export const AddCardModal = React.memo(({closeAddPackModal, addNewCard}: AddPackModalPropsType) => {

    const classes = useStyles()
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const inputChangeHandlerQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const inputChangeHandlerAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        addNewCard(question, answer)
        closeAddPackModal()
    }
    const onBackgroundClick = () => {
        closeAddPackModal()
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div className={s.windowByAddEditCard}>
                <h2>Create new card</h2>
                <TextField
                    className={classes.questionInput}
                    label="Question"
                    margin="none"
                    variant="outlined"
                    autoFocus
                    value={question}
                    onChange={inputChangeHandlerQuestion}
                />
                <TextField
                    className={classes.answerInput}
                    label="Answer"
                    margin="normal"
                    variant="outlined"
                    value={answer}
                    onChange={inputChangeHandlerAnswer}
                />
                <Button
                    className={classes.addNewCardModalButton}
                    color="primary"
                    variant={'contained'}
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