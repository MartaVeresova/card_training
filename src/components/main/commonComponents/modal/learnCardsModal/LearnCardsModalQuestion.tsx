import React, {FC, memo} from 'react';
import Button from '@material-ui/core/Button';
import {trimmedString} from '../../../../../utils/trimmedString-util';
import s from '../ModalWindow.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const LearnCardsModalQuestion: FC<LearnCardsModalPropsType> = memo(props => {

    const {packName, question, onAnswerButtonClick, closeAllModal} = props
    const classes = useStyles()

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

const useStyles = makeStyles(() =>
    createStyles({
        showAnswerButton: {
            margin: '30px auto 0',
            width: '160px',
        },
    }),
);