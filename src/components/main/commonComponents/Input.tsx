import TextField from '@material-ui/core/TextField';
import React, {ChangeEvent} from 'react';
import {useStyles} from '../styles';


export const Input = React.memo(function (props: InputSearchPropsType) {

    const {placeholderValue, value, dispatchHandler} = props
    const classes = useStyles()

    const onChangeHandler = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatchHandler(e.target.value)
    }


    return (
        <TextField
            className={classes.input}
            placeholder={placeholderValue ? placeholderValue : 'Search'}
            type="text"
            variant="outlined"
            fullWidth
            size="small"
            onChange={onChangeHandler}
            value={value}
        />
    )
})


//types
type InputSearchPropsType = {
    placeholderValue: string
    value: string
    dispatchHandler: (value: string) => void
}