import React, {useCallback, useEffect} from 'react';
import './App.css';

import MenuIcon from '@material-ui/icons/Menu'
import {TasksType} from "../API/todolistAPI";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {LinearDeterminate} from "../components/LinearProgress/LinearProgress";
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import {AppRootType} from "./store";
import {StatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/SnackBar";
import {Login} from "../features/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import {ErrorRouter404} from "../features/404/ErrorRouter404";
import {deleteLoginTC, setAuthTC} from "../features/Login/auth-reducer";
import {CircularProgress} from '@mui/material';

type PropsType = {
    demo?: boolean
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

export const App: React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAuthTC())
    }, [dispatch])

    const status = useSelector<AppRootType, StatusType>(state => state.app.status)
    const login = useSelector<AppRootType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootType, boolean>(state => state.auth.isInitialized)

    const logOut =  useCallback(() => {
        dispatch(deleteLoginTC())
    },[dispatch])

    if (!isInitialized) {
        return <Container
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress size={120} style={{color: "#ffca28"}}/>
        </Container>
    }


    return (
        <Box>
            <Box style={{height: "4px"}}>
                {status === "loading" && <LinearDeterminate/>}
            </Box>
            <AppBar position="static" style={{backgroundColor: "#ffca28", padding: "20px"}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h2" style={{margin: "0px 40px 0px 40px"}}>
                        Todolist
                    </Typography>
                    {login && <Button color="inherit" onClick={logOut}>Log out</Button>}
                </Toolbar>
            </AppBar>
            <Container style={{marginTop: "20px"}}>
                <Routes>
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="404" element={<ErrorRouter404/>}/>
                    <Route path="*" element={<Navigate to={"404"}/>}/>
                </Routes>
            </Container>
            <ErrorSnackbar/>
        </Box>)
}


export default App;
