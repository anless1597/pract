import React, {useContext} from "react";
import {Context} from "../index";
import picture from "../images/profile_picture.png";
import {LOGIN_ROUTE} from "../urls/Consts";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";


const ProfileHead = observer(() => {
    let {user, tasks} = useContext(Context)
    const history = useHistory()

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        history.push(LOGIN_ROUTE)
    }


    return (
        <div className="profile-header">
            <img src={picture} className="picture" alt=""/>
            <div className="profile-info">
                <div className="profile-text">
                    <h2>{user.user.surname} {user.user.name} {user.user.patron}</h2>
                </div>
                <div className="new-task-button">
                    <input type="button" name="new-task" value="Новая задача" onClick={() =>{
                        tasks.setCurrentTask({head: "", description:"", endDate:""});
                        (document.getElementById('new-task-modal')).classList.add('modal-active')}}/>
                </div>
            </div>
            <div className="exit-button">
                <input type="button" name="exit" value="Выйти" onClick={()=>{logout()}}/>
            </div>
        </div>
    )})

export default ProfileHead
