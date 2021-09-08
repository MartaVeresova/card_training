import React, {FC, memo, useState} from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {trimmedString} from '../../../../../utils/trimmedString-util';
import {ProgressModalComponent} from '../progressModalComponent/ProgressModalComponent';
import s from '../ModalWindow.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const LearnCardsModalAnswer: FC<LearnCardsModalPropsType> = memo(props => {

    const {question, answer, packName, openNextRandomCard, closeAllModal} = props
    const classes = useStyles()

    const [grade, setGrade] = useState<number>(0)

    const arrayOfGrades: GradeType = [
        {valueOfGrade: 1, title: 'Did not know'},
        {valueOfGrade: 2, title: 'Forgot'},
        {valueOfGrade: 3, title: 'A lot of thought'},
        {valueOfGrade: 4, title: 'Confused'},
        {valueOfGrade: 5, title: 'Knew the answer'},
    ]

    const onBackgroundClick = () => {
        closeAllModal()
    }

    const onChangeCallback = (checkedValue: number) => {
        if (grade === checkedValue) {
            setGrade(0)
        } else if (grade !== checkedValue) {
            setGrade(checkedValue)
        }
    }

    const nextButtonClickHandler = () => {
        openNextRandomCard(grade === 0 ? 1 : grade)
        setGrade(0)
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>

            <div className={s.windowByAnswer}>
                <h2 className={s.nameOfPack}>
                    <b>Learn </b>"{trimmedString(packName, 40)}"
                </h2>

                <div className={s.randomQuestionAndAnswer}>
                    <b>Question: </b>{trimmedString(question, 70)}
                </div>

                <div className={s.randomQuestionAndAnswer}>
                    <b>Answer: </b>{trimmedString(answer, 90)}
                </div>

                <div className={s.randomQuestionAndAnswer}>
                    <b>{'Rate yourself:'}</b>
                </div>

                <ProgressModalComponent/>
                <FormGroup aria-label="position"
                           className={classes.optionsForRateYourself}>
                    {
                        arrayOfGrades.map((el, i) => {
                            return <FormControlLabel
                                key={i}
                                name="myRadio"
                                control={<Radio name="myRadio"
                                                color="primary"
                                                checked={el.valueOfGrade === grade}
                                                onClick={() => onChangeCallback(el.valueOfGrade)}/>}
                                label={el.title}
                                labelPlacement="end"
                            />
                        })
                    }
                </FormGroup>

                <Button
                    className={classes.nextQuestionButton}
                    color="primary"
                    variant='outlined'
                    onClick={nextButtonClickHandler}
                >
                    Next
                </Button>
            </div>
        </>
    )
})


//types
type LearnCardsModalPropsType = {
    question: string
    answer: string
    packName: string
    openNextRandomCard: (grade: number) => void
    closeAllModal: () => void
}
type option = {
    valueOfGrade: number
    title: string
}
type GradeType = option[]

const useStyles = makeStyles(() =>
    createStyles({
        optionsForRateYourself: {
            margin: '5px 30px',
            display: 'inline-flex',
        },
        nextQuestionButton: {
            margin: '30px auto 0',
            width: '100px',
        },
    }),
);