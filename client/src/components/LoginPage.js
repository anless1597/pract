import {REGISTRATION_ROUTE, USER_ROUTE} from "../urls/Consts"
import {NavLink, useHistory} from "react-router-dom"
import {observer} from "mobx-react-lite"
import {login} from "../http/userAPI";
import {useContext, useState} from "react";
import {Context} from "../index";

const LoginPage = observer(() => {
    const [login_, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const {user} = useContext(Context)
    const history = useHistory()

    const click = async () => {
        try {
            const _data = await login(login_, password)
            user.setUser(_data.user.id, _data.user.login, _data.user.surname, _data.user.name, _data.user.patron, _data.user.userId)
            user.setIsAuth(true)
            user.setExecotors(_data.executors)
            history.push(USER_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }

    }

    return (
        <div className="auth" >
            <div className="auth-container">
                <div className="header">Вход</div>
                <div className="form">
                    <div className="input-form">
                        <input type="text" placeholder="Логин" required value={login_} onChange={e => setLogin(e.target.value)}/>
                    </div>
                    <div className="input-form">
                        <input type="password" placeholder="Пароль" required value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="input-form">
                        <input type="button" id="log-in-button" value="Войти" onClick={click}/>
                    </div>
                    <div className="register-line">
                        <p>Нет аккаунта? <NavLink to = {REGISTRATION_ROUTE} className = 'register-line-link'>Регистрация</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default LoginPage

