import {Button, TextField} from '@material-ui/core';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


export type AdditemformPropsType = {
    callback: (title: string) => void
    disabled?:boolean
}

export const AddItemForm:React.FC<AdditemformPropsType> =React.memo( ({callback,disabled}) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const inputHandlerCnange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error!==null){
            setError(null)
        }
        if (e.charCode === 13) {
            addTask()
        }
    }


    const addTask = () => {
        if (title.trim() !== "") {
            callback(title.trim())
            setTitle("")
        } else {
            setError("title is required")
        }
    }


    return (

        <div>
            <TextField variant={"outlined"} value={title} onChange={inputHandlerCnange} onKeyPress={onEnterHandler}
                       label={"Type value"} error={!!error} helperText={error} disabled={disabled}/>
            <Button onClick={addTask} variant={"contained"} color={"primary"}
                    style={{backgroundColor: "#ffca28", fontSize: "10px", padding: "18px 0px 18px 0px"}} disabled={disabled}>+</Button>

        </div>

    );
});



