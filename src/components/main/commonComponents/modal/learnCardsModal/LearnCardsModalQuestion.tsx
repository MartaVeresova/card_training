import React from 'react';
import {Button} from '@material-ui/core';
import {trimmedString} from '../../../../../utils/trimmedString-util';
import s from '../ModalWindow.module.css'
import {useStyles} from '../../../styles';


export const LearnCardsModalQuestion = React.memo((props: LearnCardsModalPropsType) => {

    const classes = useStyles()
    const {packName, question, onAnswerButtonClick, closeAllModal} = props

    const onBackgroundClick = () => {
        closeAllModal()
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>

            <div className={s.windowByQuestion}>
                <h2 className={s.nameOfPack}>
                    <b>Learn </b>"{trimmedString(packName, 40)}"
                </h2>

                <div className={s.randomQuestionAndAnswer}>
                    <b>Question: </b>{trimmedString(question, 70)}
                </div>

                <Button
                    className={classes.showAnswerButton}
                    color="primary" variant={'contained'}
                    onClick={onAnswerButtonClick}
                >
                    Show answer
                </Button>
            </div>
        </>
    )
})

//types
type LearnCardsModalPropsType = {
    packName: string
    question: string
    onAnswerButtonClick: () => void
    closeAllModal: () => void
}