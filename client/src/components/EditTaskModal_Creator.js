import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchTasks, updateTask} from "../http/taskAPI";
import {USER_ROUTE} from "../urls/Consts";
import {useHistory} from "react-router-dom";
const styleButton = {justifyContent: 'center' };


const EditTaskModal_Creator = observer(() => {
    const {tasks, user} = useContext(Context);
    const[head, setHead] = useState(tasks.currentTask.head)
    const[description, setDescription] = useState(tasks.currentTask.description)
    const[endDate, setEndDate] = useState(tasks.currentTask.endDate)
    const history = useHistory()

    useEffect(()=>{
        setHead(tasks.currentTask.head)
        setDescription(tasks.currentTask.description)
        setEndDate(tasks.currentTask.endDate)
        tasks.setSelectedPriority(tasks.currentTask.priorityId);
        tasks.setSelectedStatus(tasks.currentTask.statusId)
        tasks.setSelectedExecutor(tasks.currentTask.userId)

    },[tasks.currentTask])

    function closeTask(e) {
        let modalContent = (document.getElementById('task-edit-creator')).getElementsByClassName('modal-content')[0];
        if (e.target.closest('.' + modalContent.className) === null) {
            (document.getElementById('task-edit-creator')).classList.remove('modal-active');
        }
    }

    function editTask(){
        updateTask(tasks.currentTask.id, head, description, endDate, tasks.selectedStatus, tasks.selectedPriority, tasks.selectedExecutor, user.user.id).then(()=>{
            (document.getElementById('task-edit-creator')).classList.remove('modal-active')
            fetchTasks(user.user.id, tasks.selectedGroupType).then(data => {
                tasks.setTask(data)
            })
            history.push(USER_ROUTE)
        });
    }

    return(
        <div className="modal" id="task-edit-creator" onMouseDown={closeTask}>
            <div className="modal-content">
                <div className="header">Редактирование задачи</div>
                <div className="modal-input">
                    <label htmlFor="new-task-header">Заголовок </label>
                    <input type="text" id="new-task-header" value={head} onChange={e=>setHead(e.target.value)} />
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-description">Описание</label>
                    <p><textarea id="new-task-description" cols="45" rows="5" value={description} onChange={e=>setDescription(e.target.value)}></textarea></p>
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-end-date">Дата окончания</label>
                    <input type="date" id="new-task-end-date" value={endDate} onChange={e=>setEndDate(e.target.value)}/>
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-priority">Приоритет</label>
                    <select id="new-task-priority" value={tasks.selectedPriority} onChange={(e)=> {
                        tasks.setSelectedPriority(e.target.value);}}>
                        {tasks.priorities.map(priority =>
                            <option  key={priority.id} value={priority.id} >{priority.priorityName}</option>
                        )}
                    </select>
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-status">Статус</label>
                    <select id="new-task-status" value={tasks.selectedStatus} onChange={(e)=> {
                        tasks.setSelectedStatus(e.target.value);}}>
                        {tasks.statuses.map(status =>
                            <option key={status.id} value={status.id}>{status.statusName}</option>
                        )}
                    </select>
                </div>
                <div className="modal-input">
                    <label htmlFor="new-task-executor">Ответственный</label>
                    <select id="new-task-executor" value={tasks.selectedExecutor} onChange={(e)=> {
                        tasks.setSelectedExecutor(e.target.value);}}>
                        <option value={user.user.id} >{user.user.surname} {user.user.name[0]}. {user.user.patron[0]}</option>
                        {user.executors.map(exec=>
                            <option key={exec.id} value={exec.id}>{exec.surname} {exec.name[0]}. {exec.patron[0]}</option>
                        )}
                    </select>
                </div>
                <div className="modal-input" style={styleButton}>
                    <input type="button" id="new-task-submit-button" value="Сохранить изменения" onClick={editTask}/>
                </div>
            </div>
        </div>
    )
});

export default EditTaskModal_Creator