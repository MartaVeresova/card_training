import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import {useStyles} from '../styles';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../bll/store';
import {createPackTC, PacksInitialStateType, setCardPacksTC} from '../../../bll/packs-reducer';
import {saveState} from '../../../utils/localStorage-util';
import Paper from '@material-ui/core/Paper';
import {ProgressModalComponent} from '../commonComponents/modal/progressModalComponent/ProgressModalComponent';
import {NavBar} from './packs/NavBar';
import Container from '@material-ui/core/Container/Container';
import {Input} from '../commonComponents/Input';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import {PacksListTable} from './packs/PacksListTable';
import {ErrorSnackbar} from '../../../features/errors/ErrorSnackbar';
import {AddPackModal} from '../commonComponents/modal/addPackModal/AddPackModal';
import s from '../cards/Cards.module.css'


export const PacksList: FC = memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const packs = useSelector<AppRootStateType, PacksInitialStateType>(state => state.packs)

    const [addPackModal, setAddPackModal] = useState(false)
    const [searchText, setSearchText] = useState<string>(packs.searchText)
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>()

    useEffect(() => {
        dispatch(setCardPacksTC())
    }, [dispatch])

    useEffect(() => {
        saveState({
            packs: {
                cardPacks: [],
                myPacks: packs.myPacks,
                page: packs.page,
                pageCount: packs.pageCount,
                min: packs.min,
                max: packs.max,
                minCardsCount: packs.minCardsCount,
                maxCardsCount: packs.maxCardsCount,
                sortPacksDirection: packs.sortPacksDirection,
                sortBy: packs.sortBy,
                user_id: packs.user_id,
                packName: packs.packName,
                searchText: packs.searchText,
                cardPacksTotalCount: packs.cardPacksTotalCount,
            }
        })
    }, [packs])

    const closeAddPackModal = useCallback(() => {
        setAddPackModal(false)
    }, [])

    const addNewPack = useCallback((newPackName: string) => {
        dispatch(createPackTC({cardsPack: {name: newPackName}}))
    }, [])

    const searchInputHandler = useCallback((value: string) => {
        if (intervalID) {
            clearInterval(intervalID)
        }
        setSearchText(value)
        const newIntervalID = setTimeout(() => {
            dispatch(setCardPacksTC({packName: value, page: 1}))
        }, 800)
        setIntervalID(newIntervalID)
    }, [])

    const openAddPackModal = () => {
        setAddPackModal(true)
    }


    return (
        <Container className={classes.container}>
            {addPackModal && <AddPackModal
                closeAddPackModal={closeAddPackModal}
                addNewPack={addNewPack}
            />}
            <Paper className={classes.paper}>
                <ProgressModalComponent/>
                <NavBar/>
                <Container className={classes.body}>
                    <div className={s.packListHeading}>Packs list</div>
                    <div className={s.inputButtonSection}>
                        <Input
                            placeholderValue={'Search by questions'}
                            value={searchText}
                            dispatchHandler={searchInputHandler}
                        />
                        <Button
                            className={classes.addNewPackButton}
                            variant="contained"
                            color="primary"
                            onClick={openAddPackModal}
                        >
                            Add new pack
                        </Button>
                    </div>
                    <TableContainer className={classes.packsCardsFooter} component={Paper}>
                        <PacksListTable labelRowsPerPage={'Packs per page'}/>
                    </TableContainer>
                </Container>
            </Paper>
            <ErrorSnackbar/>
        </Container>
    )
})
