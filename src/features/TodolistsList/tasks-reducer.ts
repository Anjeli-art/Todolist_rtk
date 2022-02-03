import {PriorytiesTask, taskApi, TasksStatuses, TasksType, UpdateTask} from "../../API/todolistAPI";
import {AppRootType, AppThunk} from "../../app/store";
import {addTodolistAC, clearTodolistDateAC, removeTodolistAC, setTodosAC, TypeForTasksAction} from "./todolist-reducer";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type ActionTypeTasks =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changedTaskAC>
    | ReturnType<typeof setTaskAC>
    | TypeForTasksAction

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

const initialState: TaskStateType = {}

const slice = createSlice({
        name: "tasks",
        initialState: initialState,
        reducers: {
            removeTaskAC(state, action: PayloadAction<{ todolistId: string, id: string }>) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.id)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            }
            ,
            addTaskAC(state, action: PayloadAction<{ task: TasksType }>) {
                state[action.payload.task.todoListId].unshift(action.payload.task)
            }
            ,
            changedTaskAC(state, action: PayloadAction<{ taskid: string, model: UpdateTaskForThunk, todolistId: string }>) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload.taskid)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.model}
                }
            }
            ,
            setTaskAC(state, action: PayloadAction<{ tasksArray: Array<TasksType>, todolistId: string }>) {
                state[action.payload.todolistId] = action.payload.tasksArray
            }
        },
        extraReducers: (builder) => {
            builder.addCase(addTodolistAC, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            builder.addCase(removeTodolistAC, (state, action) => {
                delete state[action.payload.id]
            })
            builder.addCase(setTodosAC, (state, action) => {
                action.payload.todosArray.forEach((t) => {
                    state[t.id] = []
                })
            })
            builder.addCase(clearTodolistDateAC, (state, action) => {
                return {}
            })
        }
    }
)
export const {removeTaskAC, addTaskAC, changedTaskAC, setTaskAC} = slice.actions
export const tasksReducer = slice.reducer

// export const tasksReducer = (state: TaskStateType = initialState, action: any): TaskStateType => {
//
//     switch (action.type) {
//         case "TODO/SET-TODO":
//             let copyState = {...state}
//             action.todos.forEach((t) => {
//                 copyState[t.id] = []
//             })
//             return copyState
//         case 'TASK/REMOVE-TASK':
//             return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
//
//         case 'TASK/ADD-TASK':
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//
//         case 'TASK/CHANGE-TASK':
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskid ? {...t, ...action.model} : t)
//             }
//
//         case 'TODO/ADD-TODOLIST':
//             return {...state, [action.todolist.id]: []}
//
//         case 'TODO/REMOVE-TODOLIST': {
//             const stateCopy = {...state}
//             delete stateCopy[action.id]
//             return stateCopy
//         }
//         case "TASK/SET-TASKS":
//             return {...state, [action.todolistId]: action.tasks}
//
//         case "TODO/CLEAR-TODO-DATA":
//             return {}
//
//         default:
//             return state
//     }
// };

// export const removeTaskAC = (todolistId: string, id: string) => ({
//     type: 'TASK/REMOVE-TASK',
//     id,
//     todolistId,
// }) as const

// export const addTaskAC = (task: TasksType) => ({
//     type: 'TASK/ADD-TASK',
//     task
// }) as const

// export const changedTaskAC = (taskid: string, model: UpdateTaskForThunk, todolistId: string) => ({
//     type: 'TASK/CHANGE-TASK',
//     model,
//     taskid,
//     todolistId,
// }) as const

//
// export const setTaskAC = (tasksArray: Array<TasksType>, todolistId: string) => ({
//     type: "TASK/SET-TASKS",
//     tasks: tasksArray,
//     todolistId
// }) as const


export const setTasksTC = (todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await taskApi.getTask(todolistId)
        dispatch(setTaskAC({tasksArray: res.data.items, todolistId: todolistId}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "success"}))
    }

}

export const deleteTasksTC = (todolistId: string, taskid: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        await taskApi.deleteTask(todolistId, taskid)
        dispatch(removeTaskAC({todolistId: todolistId, id: taskid}))
    } catch
        (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "success"}))
    }


}

export const addTasksTC = (title: string, todolistId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: "loading"}))
    try {
        const res = await taskApi.createTask(title, todolistId)
        dispatch(addTaskAC({task: res.data.data.item}))
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: "success"}))
    }


}

export type UpdateTaskForThunk = {
    title?: string
    description?: string
    status?: TasksStatuses
    priority?: PriorytiesTask
    startDate?: string
    deadline?: string
}
export const updateTasksTC = (taskId: string, todolistId: string, model: UpdateTaskForThunk): AppThunk =>
    async (dispatch
        , getState: () => AppRootType) => {
        dispatch(setAppStatusAC({status: "loading"}))
        const tasks = getState().tasks[todolistId]
        const currentTask = tasks.find(t => {
            return t.id === taskId
        })
        if (currentTask) {
            const apiModel: UpdateTask = {
                title: currentTask.title,
                status: currentTask.status,
                description: currentTask.description,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline,
                ...model
            }
            try {
                await taskApi.updateTask(apiModel, todolistId, taskId)
                dispatch(changedTaskAC({taskid: taskId, model: model, todolistId: todolistId}))

            } catch (e: any) {
                handleServerNetworkError(e, dispatch)
            } finally {
                dispatch(setAppStatusAC({status: "success"}))
            }

        }
    }

