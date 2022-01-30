import {addTaskAC, changedTaskAC, removeTaskAC, setTaskAC, tasksReducer, TaskStateType} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodosAC} from "./todolist-reducer";
import {PriorytiesTask, TasksStatuses} from "../../API/todolistAPI";

let startState: TaskStateType

beforeEach(() => {
    startState = {
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
            }, {
                description: "",
                title: "css",
                status: TasksStatuses.Completed,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: "todolist1",
                order: 0,
                addedDate: ""
            }, {
                description: "",
                title: "js",
                status: TasksStatuses.New,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: "3",
                todoListId: "todolist1",
                order: 0,
                addedDate: ""
            }, {
                description: "",
                title: "restAPI",
                status: TasksStatuses.Completed,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: "4",
                todoListId: "todolist1",
                order: 0,
                addedDate: ""
            }, {
                description: "",
                title: "graphQL",
                status: TasksStatuses.New,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: "5",
                todoListId: "todolist1",
                order: 0,
                addedDate: ""
            }],

        "todolist2":
            [{
                description: "",
                title: "html",
                status: TasksStatuses.Completed,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: "1",
                todoListId: "todolist2",
                order: 0,
                addedDate: ""
            }, {
                description: "",
                title: "css",
                status: TasksStatuses.Completed,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: "2",
                todoListId: "todolist2",
                order: 0,
                addedDate: ""
            }, {
                description: "",
                title: "js",
                status: TasksStatuses.Completed,
                priority: PriorytiesTask.Low,
                startDate: "",
                deadline: "",
                id: "3",
                todoListId: "todolist2",
                order: 0,
                addedDate: ""
            }]
    }
})
test("correct task should be deleted from correct array", () => {

    const action = removeTaskAC("todolist2", "2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"].length).toBe(5)
    expect(endState["todolist2"].length).toBe(2)
    expect(endState["todolist2"].every(t => t.id !== "2")).toBeTruthy()
})

test("correct task should be added from correct array", () => {

    const action = addTaskAC({
        description: "",
        title: "juice",
        status: TasksStatuses.New,
        priority: PriorytiesTask.Low,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolist1",
        order: 0,
        addedDate: ""
    })
    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"].length).toBe(6)
    expect(endState["todolist2"].length).toBe(3)
    expect(endState["todolist1"][0].id).toBeDefined()
    expect(endState["todolist1"][0].title).toBe("juice")
    expect(endState["todolist1"][0].status).toBe(TasksStatuses.New)
})

test("status of specified task should be changed", () => {


    const action = changedTaskAC("2", {status: TasksStatuses.New}, "todolist2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"][1].status).toBeTruthy()
    expect(endState["todolist2"][1].status).toBeFalsy()

})

test("title of specified task should be changed", () => {


    const action = changedTaskAC("2", {title: "oil"}, "todolist2")
    const endState = tasksReducer(startState, action)

    expect(endState["todolist1"][1].title).toBe("css")
    expect(endState["todolist2"][1].title).toBe("oil")

})

test("new property with new array should be added when new todolist is added", () => {

    let newTodolist = {id: "todolist3", title: "what to learn", filter: "all", addedDate: "", order: 0}
    const action = addTodolistAC(newTodolist)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolist1" && k !== "todolist2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test("property with todolistid should be deleted", () => {

    const action = removeTodolistAC("todolist2")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolist2"]).toBeUndefined()

})

test("empty arrays should be added when we set todolists", () => {

    const action = setTodosAC([{id: "todolist1", title: "what to learn", addedDate: "", order: 0}
        , {id: "todolist2", title: "what to learn", addedDate: "", order: 0}])

    const endTaskState = tasksReducer({}, action)


    const keys = Object.keys(endTaskState)


    expect(keys.length).toBe(2)
    expect(endTaskState["todolist1"]).toStrictEqual([])
    expect(endTaskState["todolist2"]).toStrictEqual([])
})

test("tasks should be added for todolist", () => {
    const tasks = [{
        description: "",
        title: "html",
        status: TasksStatuses.Completed,
        priority: PriorytiesTask.Low,
        startDate: "",
        deadline: "",
        id: "1",
        todoListId: "todolist2",
        order: 0,
        addedDate: ""
    }, {
        description: "",
        title: "css",
        status: TasksStatuses.Completed,
        priority: PriorytiesTask.Low,
        startDate: "",
        deadline: "",
        id: "2",
        todoListId: "todolist2",
        order: 0,
        addedDate: ""
    }]
    const action = setTaskAC(tasks, "todolist2")

    const endTaskState = tasksReducer({"todolist1": [], "todolist2": []}, action)

    expect(endTaskState["todolist2"].length).toBe(2)
    expect(endTaskState["todolist1"].length).toBe(0)
    expect(endTaskState["todolist2"][0].id).toBe("1")
})
