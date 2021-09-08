import React, {FC, memo} from 'react';
import Button from '@material-ui/core/Button';
import s from '../ModalWindow.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {trimmedString} from '../../../../../utils/trimmedString-util';


export const DeletePackModal: FC<DeletePackModalPropsType> = memo(props => {

    const {closeDeletePackModal, deletePack, packName} = props
    const classes = useStyles()

    const onButtonClickHandler = () => {
        deletePack()
        closeDeletePackModal()
    }
    const onBackgroundClick = () => {
        closeDeletePackModal()
    }


    return (
        <>
            <div className={s.darkWindow}
                 onClick={onBackgroundClick}>
            </div>
            <div className={s.windowByAddEditDeleteCard} style={{height: '230px'}}>
                <h2>Delete Pack</h2>
                <p className={s.warningTitle}>Do you really want to remove <b>{trimmedString(packName, 20)}</b>? All
                    cards will be excluded
                    from this course.</p>
                <div className={s.cancelAndDeleteButtons}>
                    <Button
                        className={classes.deletePackModalButton}
                        color="primary"
                        variant="outlined"
                        onClick={closeDeletePackModal}>Cancel</Button>
                    <Button
                        className={classes.deletePackModalButton}
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
type DeletePackModalPropsType = {
    closeDeletePackModal: () => void
    deletePack: () => void
    packName: string
}

const useStyles = makeStyles(() =>
    createStyles({
        deletePackModalButton: {
            width: '100px',
            margin: '45px 70px 0',
        },
    }),
);