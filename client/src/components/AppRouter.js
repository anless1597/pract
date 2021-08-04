import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../Routes";
import {LOGIN_ROUTE} from "../urls/Consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Switch>
            {user.isAuth && authRoutes.map (({path, Component})=>
                <Route key={path} component={Component} exact/>
            )}
            {!user.isAuth && publicRoutes.map (({path, Component})=>
                <Route key={path} component={Component} exact/>
            )}
            <Redirect to={LOGIN_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;