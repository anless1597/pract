import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {id: null, login: null, name: null, surname: null, patron: null, lead: null}
        this._executors = []


        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(id, login, surname, name, patronimic, lead){
        this._user.id = id
        this._user.login = login
        this._user.surname = surname
        this._user.name = name
        this._user.patron = patronimic
        this._user.lead = lead
    }

    setExecotors(executors){
        this._executors = executors
    }

    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
    get executors(){
        return this._executors
    }

}
