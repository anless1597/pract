import {$authHost} from "./index";

export const fetchStatuses = async () => {
    const {data} = await $authHost.get('api/status')
    return data
}

export const fetchPriorities = async () => {
    const {data} = await $authHost.get('api/priority')
    return data
}

export const createTask = async (head, description, endDate, statusId, priorityId, userId, creatorId) => {
    const {data} = await $authHost.post('api/task', {head, description, endDate, statusId, priorityId, userId, creatorId})
    return data
}

export const fetchTasks = async (userId, groupType) => {
    const {data} = await $authHost.get('api/task', {params: {id:userId, groupType}})
    return data
}

export const updateTask = async (id, head, description, endDate, statusId, priorityId, userId, creatorId) => {
    const {data} = await $authHost.put('api/task', {id, head, description, endDate, statusId, priorityId, userId, creatorId})
    return data
}
