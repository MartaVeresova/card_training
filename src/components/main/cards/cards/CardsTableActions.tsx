import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import {EditCardModal} from '../../commonComponents/modal/editCardModal/EditCardModal';
import {EditCardRequestType, OnePackType} from '../../../../dal/api';
import {useStyles} from '../../styles';


export const CardsTableActions = React.memo((props: PackTableActionsPropsType) => {

    const classes = useStyles()
    const {deleteCard, editCard, card} = props

    const [editPackModal, setEditPackModal] = useState(false)

    const onDeleteButtonClick = () => {
        deleteCard(card._id)
    }
    const openEditPackModal = () => {
        setEditPackModal(true)
    }
    const closeEditPackModal = () => {
        setEditPackModal(false)
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