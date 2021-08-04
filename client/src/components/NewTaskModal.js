import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {createTask, fetchTasks} from "../http/taskAPI";
import {useHistory} from "react-router-dom";
import {USER_ROUTE} from "../urls/Consts";

const styleButton = {justifyContent: 'center' };


const NewTaskModal = observer(() => {
    const {tasks, user} = useContext(Context)
    const[head, setHead] = useState('')
    const[description, setDescription] = useState('')
    const[endDate, setEndDate] = useState('')
    let history = useHistory()
    tasks.setSelectedPriority(1);
    tasks.setSelectedStatus(1)
    tasks.setSelectedExecutor(user.user.id)

    function closeTask(e) {
        let modalContent = (document.getElementById('new-task-modal')).getElementsByClassName('modal-content')[0];
        if (e.target.closest('.' + modalContent.className) === null) {
            (document.getElementById('new-task-modal')).classList.remove('modal-active');
        }
    }


    function addTask(){
        createTask(head, description, endDate, tasks.selectedStatus, tasks.selectedPriority, tasks.selectedExecutor, user.user.id).then(()=>{
            (document.getElementById('new-task-modal')).classList.remove('modal-active')
            fetchTasks(user.user.id, tasks.selectedGroupType).then(data => {
                tasks.setTask(data)
            })
            history.push(USER_ROUTE)
        });

    }

    return(
        <div className="modal" id="new-task-modal" onMouseDown={closeTask}>
            <div className="modal-content">
                <div className="header" >Новая задача</div>
                <div className="modal-input">
                    <label htmlFor="new-task-header">Заголовок </label>
                    <input type="text" id="new-task-header" value={head} onChange={e=>setHead(e.target.value)} required />
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-description">Описание</label>
                    <p><textarea id="new-task-description" cols="45" rows="5" value={description} onChange={e=>setDescription(e.target.value)}></textarea></p>
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-end-date">Дата окончания</label>
                    <input required type="date" id="new-task-end-date" value={endDate} onChange={e=>setEndDate(e.target.value)}/>
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-priority">Приоритет</label>
                    <select required id="new-task-priority" onChange={(e)=> {
                        tasks.setSelectedPriority(e.target.value);}}>
                        {tasks.priorities.map(priority =>
                            <option  key={priority.id} value={priority.id} >{priority.priorityName}</option>
                        )}
                    </select>
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-status">Статус</label>
                    <select required id="new-task-status"  onChange={(e)=> {
                        tasks.setSelectedStatus(e.target.value);}}>
                        {tasks.statuses.map(status =>
                            <option key={status.id} value={status.id}>{status.statusName}</option>
                        )}
                    </select>
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-executor">Ответственный</label>
                    <select required id="new-task-executor"  onChange={(e)=> {
                        tasks.setSelectedExecutor(e.target.value);}}>
                        <option value={user.user.id} >{user.user.surname} {user.user.name[0]}. {user.user.patron[0]}</option>
                        {user.executors.map(exec=>
                            <option key={exec.id} value={exec.id}>{exec.surname} {exec.name[0]}. {exec.patron[0]}</option>
                        )}
                    </select>
                </div>
                <div className="modal-input" style={styleButton}>
                    <input type="button" id="new-task-submit-button" value="Создать задачу" onClick={addTask} />
                </div>
            </div>
        </div>
    )
})

export default NewTaskModal