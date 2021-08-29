import React, {FC, useCallback, useState, memo} from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import {EditCardModal} from '../../commonComponents/modal/editCardModal/EditCardModal';
import {EditCardRequestType, OnePackType} from '../../../../dal/api';
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const CardsTableActions: FC<PackTableActionsPropsType> = memo(props => {

    const {deleteCard, editCard, card} = props

    const classes = useStyles()
    const [editPackModal, setEditPackModal] = useState(false)

    const closeEditPackModal = useCallback(() => {
        setEditPackModal(false)
    }, [])

    const onDeleteButtonClick = () => {
        deleteCard(card._id)
    }
    const openEditPackModal = () => {
        setEditPackModal(true)
    }


    return (
        <TableCell align="right" className={classes.containerActionsButton}>
            {
                editPackModal &&
                <EditCardModal closeAddPackModal={closeEditPackModal}
                               editCard={editCard}
                               card={card}/>
            }
            <Button
                className={classes.actionsButtonOfCards}
                size={'small'}
                variant="outlined"
                color="secondary"
                onClick={onDeleteButtonClick}
            >DELETE</Button>
            <Button
                className={classes.actionsButtonOfCards}
                size={'small'}
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