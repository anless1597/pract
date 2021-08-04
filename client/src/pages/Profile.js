import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import TableTask from "../components/TableTask";
import {Context} from "../index";
import SelectGroup from "../components/SelectGroup";
import NewTaskModal from "../components/NewTaskModal";
import EditTaskModal_Creator from "../components/EditTaskModal_Creator";
import EditTaskModal_Executor from "../components/EditTaskModal_Executor";
import {fetchTasks} from "../http/taskAPI";
import ProfileHead from "../components/ProfileHead"


const Profile = observer(() => {
    const {user, tasks} = useContext(Context)
    useEffect(() => {
        tasks.setSelectedGroupType("1")
        fetchTasks(user.user.id, tasks.selectedGroupType).then(data => {
            tasks.setTask(data)
        })
    }, [])

/*    useEffect(() => {
    }, [tasks.selectedGroupType])*/
    return (
        <div>
            <div className="profile">
                <div className="profile-container">
                    <ProfileHead />
                    <SelectGroup />
                    <TableTask />
                </div>
            </div>

            <NewTaskModal />
            <EditTaskModal_Creator />
            <EditTaskModal_Executor />
        </div>
    );
});

export default Profile;