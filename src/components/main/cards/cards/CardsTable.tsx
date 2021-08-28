import React, {ChangeEvent, FC, memo, MouseEvent, useCallback, useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import {useStyles} from '../../styles';
import {CardsInitialStateType, deleteCardTC, editCardTC, resetPackAC, setPackTC} from '../../../../bll/cards-reducer';
import {trimmedString} from '../../../../utils/trimmedString-util';
import {updateDate} from '../../../../utils/updateDate-util';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import {TablePaginationActions} from '../../commonComponents/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';
import {useLocation} from 'react-router-dom';
import {CardsTableActions} from './CardsTableActions';
import {EditCardRequestType} from '../../../../dal/api';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import s from '../Cards.module.css'


export const CardsTable: FC<PackNameTableProps> = memo(({labelRowsPerPage}) => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const cards = useSelector<AppRootStateType, CardsInitialStateType>(state => state.cards)
    const idUser = useSelector<AppRootStateType, string>(state => state.profile._id)
    const packID = useLocation().pathname.substring(6)


    useEffect(() => {
        return function () {
            dispatch(resetPackAC())
        }
    }, [dispatch])

    const handleChangePage = useCallback((e: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPackTC({cardsPack_id: packID, page: newPage + 1}))
    }, [dispatch, packID])

    const editCardHandler = useCallback((data: EditCardRequestType) => {
        dispatch(editCardTC({...data}))
    }, [dispatch])

    const onClickSortHandler = (sortValue: SortByType) => {
        if (cards.sortCardDirection === 0) {
            dispatch(setPackTC({cardsPack_id: packID, sortCards: '1' + sortValue}))
        } else {
            dispatch(setPackTC({cardsPack_id: packID, sortCards: '0' + sortValue}))
        }
    }

    const deleteCardHandler = useCallback((cardId: string) => {
        dispatch(deleteCardTC(cards.cardsPack_id, cardId))
    }, [dispatch, cards.cardsPack_id])

    const handleChangePageCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setPackTC({cardsPack_id: packID, pageCount: parseInt(e.target.value, 10)}))
    }


    return (
        <Table className={classes.table} aria-label="custom pagination table">
            <TableHead className={classes.tableHead}>
                <TableRow>
                    <TableCell>
                        <TableSortLabel
                            active={cards.sortBy === 'question'}
                            direction={cards.sortCardDirection === 1 ? 'desc' : 'asc'}
                            onClick={() => onClickSortHandler('question')}
                        >
                            Question
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                        <TableSortLabel
                            active={cards.sortBy === 'answer'}
                            direction={cards.sortCardDirection === 1 ? 'desc' : 'asc'}
                            onClick={() => onClickSortHandler('answer')}
                        >
                            Answer
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                        <TableSortLabel
                            active={cards.sortBy === 'updated'}
                            direction={cards.sortCardDirection === 1 ? 'desc' : 'asc'}
                            onClick={() => onClickSortHandler('updated')}
                        >
                            Last Updated
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                        <TableSortLabel
                            active={cards.sortBy === 'grade'}
                            direction={cards.sortCardDirection === 1 ? 'desc' : 'asc'}
                            onClick={() => onClickSortHandler('grade')}
                        >
                            Grade
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    cards.cards.map((cards) =>
                        <TableRow key={cards._id}>
                            <TableCell component="th">{trimmedString(cards.question, 20)}</TableCell>
                            <TableCell align="right">{trimmedString(cards.answer, 20)}</TableCell>
                            <TableCell align="right">{updateDate(cards.updated)}</TableCell>
                            <TableCell align="right">{Math.round(cards.grade)}</TableCell>
                            {cards.user_id === idUser ?
                                <CardsTableActions
                                    deleteCard={deleteCardHandler}
                                    editCard={editCardHandler}
                                    card={cards}
                                />
                                : <TableCell/>}
                        </TableRow>
                    )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <td className={s.footerPage}>
                        Page: {cards.page} (Total:{Math.ceil(cards.cardsTotalCount / cards.pageCount)})
                    </td>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, {
                            label: 'All',
                            value: cards.cardsTotalCount
                        }]}
                        colSpan={6}
                        count={cards.cardsTotalCount}
                        rowsPerPage={cards.pageCount}
                        page={cards.page - 1}
                        SelectProps={{
                            inputProps: {'aria-label': 'rows per page'},
                            native: true,
                        }}
                        labelRowsPerPage={labelRowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangePageCount}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    )
})

type SortByType = 'question' | 'answer' | 'updated' | 'grade'
type PackNameTableProps = {
    labelRowsPerPage: string
}