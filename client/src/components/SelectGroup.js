import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Context} from "../index";
import {fetchTasks} from "../http/taskAPI";
import {useHistory} from "react-router-dom";
import {USER_ROUTE} from "../urls/Consts";


const SelectGroup = observer(() => {
    let _groupType = [
        {id: 1, value:'Без группировки'},
        {id: 2, value:'На сегодня'},
        {id: 3, value:'На неделю'},
        {id: 4, value:'На будущее'},
    ]

    const {user, tasks} = useContext(Context)
    const history = useHistory()

    return (
        <div className="group">
            <label>Группировка:
                <select value={tasks.selectedGroupType} onChange={(e)=> {
                    tasks.setSelectedGroupType(e.target.value);
                    fetchTasks(user.user.id, tasks.selectedGroupType).then(data => {
                        tasks.setTask(data);
                    })
                    history.push(USER_ROUTE);

                }}>
                    <option value={_groupType[0].value.toString()}>{_groupType[0].value}</option>
                    <optgroup label="По дате завершения">
                        <option value={_groupType[1].value.toString()}>{_groupType[1].value}</option>
                        <option value={_groupType[2].value.toString()}>{_groupType[2].value}</option>
                        <option value={_groupType[3].value.toString()}>{_groupType[3].value}</option>
                    </optgroup>
                    <optgroup label="По ответственным">
                        <option key={user.user.id} value={Number(user.user.id)}>{user.user.surname} {user.user.name[0]}. {user.user.patron[0]}</option>

                    {user.executors.map(exec =>
                            <option key={exec.id} value={Number(exec.id)}>{exec.surname} {exec.name[0]}. {exec.patron[0]}</option>
                        )}
                    </optgroup>
                </select>
            </label>
        </div>

    )
    }

)

export default SelectGroup