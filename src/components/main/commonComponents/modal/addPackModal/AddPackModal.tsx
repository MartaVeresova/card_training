import React, {ChangeEvent, useState} from 'react';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import s from '../ModalWindow.module.css'
import {useStyles} from '../../../styles';


export const AddPackModal = React.memo(({closeAddPackModal, addNewPack}: AddPackModalPropsType) => {

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
            <div className={s.windowByAddPack}>
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
                        variant='contained'
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