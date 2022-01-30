import React, {ChangeEvent, useState} from "react";
import {Input} from "@material-ui/core";

export type EditablespanType = {
    title: string
    onChange:(Newvalue:string)=>void
    disabled?:boolean
}

export const EditableSpan:React.FC< EditablespanType>=React.memo(({title,onChange,disabled})=> {

    let [editmode, seteditmode] = useState(false)
    let [titleString, setTitleString] = useState("")

    const activaiteEditMode = () => {seteditmode(true);setTitleString(title)}
    const activaiteViewMode = () => {seteditmode(false);onChange(titleString)}
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitleString(e.currentTarget.value)
    }
    return (
        editmode ? <Input value={titleString} onChange={onChangeHandler} disabled={disabled} onBlur={activaiteViewMode} autoFocus/>
            : <span onDoubleClick={activaiteEditMode} >{title}</span>
    )

})