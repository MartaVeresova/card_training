import React, {FC, memo} from 'react';
import Button from '@material-ui/core/Button';
import s from '../ModalWindow.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const DeleteCardModal: FC<DeleteCardModalPropsType> = memo(props => {

    const {closeDeleteCardModal, deleteCard} = props
    const classes = useStyles()

    const onButtonClickHandler = () => {
        deleteCard()
        closeDeleteCardModal()
    }
    const onBackgroundClick = () => {
        closeDeleteCardModal()
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div className={s.windowByAddEditDeleteCard} style={{height: '210px'}}>
                <h2>Delete Pack</h2>
                <p className={s.warningTitle}>Do you really want to remove this card?</p>
                <div className={s.cancelAndDeleteButtons}>
                    <Button
                        className={classes.deleteCardModalButton}
                        color="primary"
                        variant="outlined"
                        onClick={closeDeleteCardModal}>Cancel</Button>
                    <Button
                        className={classes.deleteCardModalButton}
                        color="secondary"
                        variant="outlined"
                        onClick={onButtonClickHandler}
                    >Delete</Button>
                </div>
            </div>
        </>
    )
})

//types
type DeleteCardModalPropsType = {
    closeDeleteCardModal: () => void
    deleteCard: () => void
}

const useStyles = makeStyles(() =>
    createStyles({
        deleteCardModalButton: {
            width: '100px',
            margin: '45px 70px 0',
        },
    }),
);