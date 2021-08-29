import React, {ChangeEvent, FC, memo, useState} from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import {PacksInitialStateType, setCardPacksTC} from '../../../../bll/packs-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../bll/store';
import s from './NavBar.module.css'
import {createStyles, makeStyles} from '@material-ui/core/styles';


export const NavBar: FC = memo(() => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const packs = useSelector<AppRootStateType, PacksInitialStateType>(state => state.packs)
    const id = useSelector<AppRootStateType, string>(state => state.profile._id)

    const [sliderValue, setSliderValue] = useState<number[]>([packs.min, packs.max])

    const onMyButtonClick = () => {
        dispatch(setCardPacksTC({user_id: id, min: 0, page: 1, pageCount: 5}))
        setSliderValue([0, packs.max])
    }

    const onAllButtonClick = () => {
        dispatch(setCardPacksTC({user_id: '', min: sliderValue[0], max: sliderValue[1], page: 1, pageCount: 5}))
    }

    const changeSliderValue = (e: ChangeEvent<{}>, newValue: number | number[]) => {
        setSliderValue(newValue as number[])
    }

    const changeSliderValueForPayload = () => {
        dispatch(setCardPacksTC({min: sliderValue[0], max: sliderValue[1], page: 1}))
    }


    return (
        <Grid className={classes.navbar}>
            <span className={classes.navbarShowPacksCards}>Show packs cards</span>

            <ButtonGroup variant="contained" color="primary" className={classes.navbarMyAllButtons}>
                <Button onClick={onMyButtonClick}
                        variant={packs.myPacks ? 'contained' : 'outlined'}>My</Button>
                <Button onClick={onAllButtonClick}
                        variant={packs.myPacks ? 'outlined' : 'contained'}>All</Button>
            </ButtonGroup>

            <div className={s.slider}>
                <Slider
                    value={sliderValue}
                    max={packs.maxCardsCount}
                    onChange={changeSliderValue}
                    onChangeCommitted={changeSliderValueForPayload}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                />
            </div>
        </Grid>
    )
})

const useStyles = makeStyles(() =>
    createStyles({
        navbar: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '200px',
            minWidth: '200px',
            backgroundColor: 'lightblue',
            borderRadius: '4px 0px 0px 4px',
        },
        navbarShowPacksCards: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginTop: '10px',
            marginBottom: '10px',
        },
        navbarMyAllButtons: {
            marginTop: '20px',
        },
    }),
);