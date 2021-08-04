import React from 'react';
import {useLocation} from 'react-router-dom'
import {REGISTRATION_ROUTE} from "../urls/Consts";
import LoginPage from "../components/LoginPage";
import RegistrationPage from "../components/RegistrationPage";
import {observer} from "mobx-react-lite";


const Auth = observer(() => {
    const isRegistration = useLocation().pathname === REGISTRATION_ROUTE

    return (
        !isRegistration ? <LoginPage /> : <RegistrationPage />
    );
});

export default Auth;