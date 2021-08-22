import React, {ChangeEvent, FC, memo, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useStyles} from '../../../styles';
import s from '../ModalWindow.module.css'


export const EditPackModal: FC<AddPackModalPropsType> = memo(({oldName, closeEditPackModal, updatePackName}) => {

    const classes = useStyles()
    const [newName, setNewName] = useState('')

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const onButtonClickHandler = () => {
        updatePackName(newName)
        closeEditPackModal()
    }
    const onBackgroundClick = () => {
        closeEditPackModal()
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div className={s.windowByAddPack}>
                <h2>Enter new name of pack</h2>
                <TextField
                    className={classes.addEditPackInput}
                    variant="outlined"
                    margin="none"
                    label="New name"
                    autoFocus
                    value={oldName}
                    onChange={inputChangeHandler}
                />
                <Button color="primary"
                        variant="contained"
                        onClick={onButtonClickHandler}>RENAME</Button>
            </div>
        </>
    )
})


//types
type AddPackModalPropsType = {
    oldName: string
    closeEditPackModal: () => void
    updatePackName: (name?: string) => void
}