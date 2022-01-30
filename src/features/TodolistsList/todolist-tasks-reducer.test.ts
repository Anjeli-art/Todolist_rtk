import {addTodolistAC, clearTodolistDateAC, todolistsReducer, TodolistsTypeEntity} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../../app/App";
import {PriorytiesTask, TasksStatuses} from "../../API/todolistAPI";

test("ids should be equals", () => {

    const startTaskState: TaskStateType = {}
    const startTodoState: Array<TodolistsTypeEntity> = []

    const action = addTodolistAC({id: "todolist1", title: "what to learn", addedDate: "", order: 0})

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodoState = todolistsReducer(startTodoState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]
    const idFromTodolist = endTodoState[0].id

    expect(idFromTask).toBe(action.todolist.id)
    expect(idFromTodolist).toEqual(action.todolist.id)
    expect(endTodoState[0].title).toBe("what to learn")
})

test("data should be cleaned", () => {

    const startTaskState: TaskStateType = {
        "todolist1":
            [{
                description: "",
                title: "html",
                status: TasksStatuses.Completed,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: "todolist1",
                order: 0,
                addedDate: ""
            }]
    }
    const startTodoState: Array<TodolistsTypeEntity> = [
        {id: "todolist1", title: "What to learn", filter: "all", addedDate: '', entityStatus: "idle", order: 0}
    ]

    const action = clearTodolistDateAC()

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodoState = todolistsReducer(startTodoState, action)

    expect(Object.keys(endTaskState).length === 0).toBeTruthy()
    expect(endTodoState.length).toBe(0)
})
