import React, {useContext} from "react";
import {Context} from "../index";
import TableTask_Row from "./TableTask_Row";
import {observer} from "mobx-react-lite";


const TableTask = observer(() => {
    let {tasks} = useContext(Context)

    return (
        <table>
            <thead>
            <tr>
                <th scope="col">Заголовок</th>
                <th scope="col">Приоритет</th>
                <th scope="col">Дата окончания</th>
                <th scope="col">Ответственный</th>
                <th scope="col">Статус</th>
            </tr>
            </thead>
            <tbody>
            {tasks.tasks.map(task => <TableTask_Row key={task.id} task={task}/>)}
            </tbody>
        </table>
    )
})

export default TableTask