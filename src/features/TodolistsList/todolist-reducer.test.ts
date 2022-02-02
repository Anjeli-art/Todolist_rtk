import {v1} from "uuid";
import {
    addTodolistAC, changeEntityStatusTodoAC, changeFilterTodoAC,
    changeTitleTodoAC, EntityStatusType, filterType,
    removeTodolistAC, setTodosAC,
    todolistsReducer, TodolistsTypeEntity
} from "./todolist-reducer";

let startState: Array<TodolistsTypeEntity>
let todolistId1 = v1();
let todolistId2 = v1();

beforeEach(() => {
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', entityStatus: "idle", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', entityStatus: "idle", order: 0}
    ]

})

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolistAC({id: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
})
test('correct todolist should be added', () => {

    let newTodolist = {id: "todolist1", title: "what to learn", filter: "all", addedDate: "", order: 0}

    const endState = todolistsReducer(startState, addTodolistAC({todolist: newTodolist}))

    expect(endState.length).toBe(3);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined()

});

test('correct todolist should change its name', () => {


    let newTodolistTitle = "New Todolist";
    const action = changeTitleTodoAC({id: todolistId2, title: newTodolistTitle})

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: filterType = "completed";

    const action = changeFilterTodoAC({filter: newFilter, id: todolistId2})

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {

    let newStatus: EntityStatusType = "loading";

    const action = changeEntityStatusTodoAC({entityStatus: newStatus, id: todolistId2})

    const endState = todolistsReducer(startState, action);

    expect(endState[1].entityStatus).toBe("loading");
    expect(endState[0].entityStatus).toBe("idle");
    expect(endState !== startState).toBeTruthy()
});

test('todolist should be set to the state', () => {

    const action = setTodosAC({todosArray: startState})

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});




