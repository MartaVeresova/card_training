import React, {ChangeEvent, FC, memo, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import s from '../ModalWindow.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const AddPackModal: FC<AddPackModalPropsType> = memo(({closeAddPackModal, addNewPack}) => {

    const classes = useStyles()
    const [text, setText] = useState('')

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        addNewPack(text)
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
            <div className={s.windowByAddDeletePack}>
                <h2>Enter new pack name</h2>
                <TextField
                    className={classes.addEditPackInput}
                    variant="outlined"
                    margin="none"
                    label="Name"
                    autoFocus
                    value={text}
                    onChange={inputChangeHandler}
                />
                <Button color="primary"
                        variant="contained"
                        onClick={onButtonClickHandler}>Add new pack</Button>
            </div>
        </>
    )
})


//types
type AddPackModalPropsType = {
    closeAddPackModal: () => void
    addNewPack: (newPackName: string) => void
}

const useStyles = makeStyles(() =>
    createStyles({
        addEditPackInput: {
            margin: '30px 0 50px 0',
        },
    }),
);