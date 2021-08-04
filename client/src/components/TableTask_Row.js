import {useContext} from "react";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const TableTask_Row = observer(({task}) =>{
    const {tasks, user} = useContext(Context)

    function foundExecutor(id){
        if(id===user.user.id)
            return `${user.user.surname} ${user.user.name[0]}. ${user.user.patron[0]}.`
        else {
            for(let i =0; i<user.executors.length; i++)
                if (id===user.executors[i].id)
                    return `${user.executors[i].surname} ${user.executors[i].name[0]}. ${user.executors[i].patron[0]}.`
            }

        }

    function chooseModalType(id){
        if (id===user.user.id)
            (document.getElementById('task-edit-creator')).classList.add('modal-active')
        else
            (document.getElementById('task-edit-executor')).classList.add('modal-active')
    }

    return(
        <tr onClick={() =>{tasks.setCurrentTask(task); chooseModalType(task.creatorId); }}>
            <td>{task.head}</td>
            <td>{tasks.priorities[task.priorityId-1].priorityName}</td>
            <td>{task.endDate}</td>
            <td>{foundExecutor(task.userId)}</td>
            <td>{tasks.statuses[task.statusId-1].statusName}</td>
        </tr>
    )
})

export default TableTask_Row