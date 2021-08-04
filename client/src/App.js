import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {fetchPriorities, fetchStatuses} from "./http/taskAPI";

const App = observer(() => {
    const {tasks} = useContext(Context)

    useEffect(() => {
            fetchStatuses().then(data => tasks.setStatus(data))
            fetchPriorities().then(data => tasks.setPriority(data))
    }, [])

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
