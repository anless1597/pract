import {LOGIN_ROUTE} from "../urls/Consts";
import {NavLink, useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {registration} from "../http/userAPI";
import {useState} from "react";

const RegistrationPage = observer(() => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [patronimic, setPatronimic] = useState('')
    const [leader, setLeadId] = useState('')

    const history = useHistory()

    const click = async () => {
        try {
            let data = await registration(login, password, name, surname, patronimic, leader)
            history.push(LOGIN_ROUTE)

        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return(
        <div className="auth">
            <div className="auth-container">
                <div className="header">Регистрация</div>
                <div className="form">
                    <div className="input-form">
                        <input type="text" placeholder="Фамилия" required value={surname} onChange={e => setSurname(e.target.value)}/>
                    </div>
                    <div className="input-form">
                        <input type="text" placeholder="Имя" required value={name} onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="input-form">
                        <input type="text" placeholder="Отчество" required value={patronimic} onChange={e => setPatronimic(e.target.value)}/>
                    </div>
                    <div className="input-form">
                        <input type="text" placeholder="Логин" required value={login} onChange={e => setLogin(e.target.value)}/>
                    </div>
                    <div className="input-form">
                        <input type="password" placeholder="Пароль" required value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="input-form">
                        <input type="text" placeholder="Логин руководителя" value={leader} onChange={e => setLeadId(e.target.value)}/>
                    </div>
                    <div className="input-form">
                        <input type="button" value="Зарегистрироваться" onClick={click}/>
                    </div>
                    <div className="register-line">
                        Уже есть аккаунт? <NavLink to = {LOGIN_ROUTE} className = 'register-line-link'>Войти</NavLink>
                    </div>
                </div>
            </div>
        </div>

    )
})

export default RegistrationPage;