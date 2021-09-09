import React, {ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import s from '../ModalWindow.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const EditPackModal: FC<AddPackModalPropsType> = memo(({oldName, closeEditPackModal, updatePackName}) => {

    const classes = useStyles()
    const [newName, setNewName] = useState(oldName)

    const inputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setNewName(e.currentTarget.value), [])

    const onButtonClickHandler = useCallback(() => {
        updatePackName(newName)
        closeEditPackModal()
    }, [newName, updatePackName, closeEditPackModal])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) =>
        (e.key === 'Enter') && onButtonClickHandler(), [onButtonClickHandler])

    const onBackgroundClick = () => {
        closeEditPackModal()
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div className={s.windowByAddDeletePack}>
                <h2>Enter new name of pack</h2>
                <TextField
                    className={classes.addEditPackInput}
                    variant="outlined"
                    margin="none"
                    label="New name"
                    autoFocus
                    value={newName}
                    onChange={inputChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <Button color="primary"
                        variant="outlined"
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

const useStyles = makeStyles(() =>
    createStyles({
        addEditPackInput: {
            margin: '30px 0 50px 0',
        },
    }),
);