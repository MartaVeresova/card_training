import React, {FC, memo, useCallback, useState} from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import {EditCardModal} from '../../commonComponents/modal/editCardModal/EditCardModal';
import {EditCardRequestType, OnePackType} from '../../../../dal/api';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {DeleteCardModal} from '../../commonComponents/modal/deleteCardModal/DeleteCardModal';


export const CardsTableActions: FC<PackTableActionsPropsType> = memo(props => {

    const {deleteCard, editCard, card} = props

    const classes = useStyles()
    const [editPackModal, setEditPackModal] = useState(false)
    const [deleteCardModal, setDeleteCardModal] = useState(false)

    const closeEditPackModal = useCallback(() => {
        setEditPackModal(false)
    }, [])

    const closeDeleteCardModal = useCallback(() => {
        setDeleteCardModal(false)
    }, [])

    const onDeleteButtonClick = useCallback(() => {
        deleteCard(card._id)
    }, [card, deleteCard])

    const openEditPackModal = () => {
        setEditPackModal(true)
    }

    const openDeleteCardModal = () => {
        setDeleteCardModal(true)
    }


    return (
        <TableCell align="right" className={classes.containerActionsButton}>
            {
                editPackModal &&
                <EditCardModal
                    closeAddPackModal={closeEditPackModal}
                    editCard={editCard}
                    card={card}/>
            }
            {
                deleteCardModal &&
                <DeleteCardModal
                    deleteCard={onDeleteButtonClick}
                    closeDeleteCardModal={closeDeleteCardModal}
                />
            }
            <Button
                className={classes.actionsButtonOfCards}
                size="small"
                variant="outlined"
                color="secondary"
                onClick={openDeleteCardModal}
            >DELETE</Button>
            <Button
                className={classes.actionsButtonOfCards}
                size="small"
                variant="outlined"
                color="primary"
                onClick={openEditPackModal}
            >EDIT</Button>
        </TableCell>
    )
})


//types
type PackTableActionsPropsType = {
    deleteCard: (cardId: string) => void
    editCard: (data: EditCardRequestType) => void
    card: OnePackType
}

const useStyles = makeStyles(() =>
    createStyles({
        actionsButtonOfCards: {
            marginRight: '10px',
        },
        containerActionsButton: {
            width: '166px',
            padding: '16px 0',
        },
    }),
);