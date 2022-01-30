import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {
    deleteTasksTC, updateTasksTC
} from "../../tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {TasksStatuses, TasksType} from "../../../../API/todolistAPI";


type TaskPropsType = {
    task: TasksType
    todoId: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({task, todoId}) => {

    const dispatch = useDispatch()

    const deletedTask = useCallback(() => {
        dispatch(deleteTasksTC( todoId,task.id,))
    }, [dispatch, todoId,task.id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTasksTC(task.id,todoId, {status:e.currentTarget.checked ? TasksStatuses.Completed:TasksStatuses.New}))
    }, [dispatch, task.id, todoId])

    const onChangeStatusHendler = useCallback((Newvalue: string) => {
        dispatch(updateTasksTC(task.id,todoId, {title:Newvalue}))
    }, [dispatch, task.id, todoId])

    return <li style={{listStyleType: "none"}} className={task.status=== TasksStatuses.Completed? "is-done" : ""}>
        <Checkbox
            checked={task.status===TasksStatuses.Completed} onChange={onChangeHandler}
            color="default"
            inputProps={{'aria-label': 'checkbox with default color'}}
        />
        <IconButton aria-label="delete" color="default" onClick={deletedTask}>
            <DeleteIcon/>
        </IconButton>
        <EditableSpan title={task.title} onChange={onChangeStatusHendler}/>
    </li>
})