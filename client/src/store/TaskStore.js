import {makeAutoObservable} from "mobx";

export default class TaskStore{
    constructor() {
        this._statuses = []
        this._priorities = []
        this._tasks = []

        this._currentTask = {head: "", description: "", endDate:""}

        this._selectedGroupType = null
        this._selectedStatus = null
        this._selectedPriority = null
        this._selectedExecutor = null

        makeAutoObservable(this)
    }

    setStatus(statuses){
        this._statuses = statuses
    }
    setPriority(priorities){
        this._priorities = priorities
    }
    setTask(tasks){
        this._tasks = tasks
    }
    setCurrentTask(task){
        this._currentTask = task
    }
    setSelectedGroupType(selectedGroupType){
        this._selectedGroupType = selectedGroupType
    }
    setSelectedStatus(selectedStatus){
        this._selectedStatus = selectedStatus
    }
    setSelectedPriority(selectedPriority){
        this._selectedPriority = selectedPriority
    }
    setSelectedExecutor(selectedExecutor){
        this._selectedExecutor = selectedExecutor
    }




    get statuses(){
        return this._statuses
    }
    get priorities(){
        return this._priorities
    }
    get tasks(){
        return this._tasks
    }
    get currentTask(){
        return this._currentTask
    }
    get selectedGroupType(){
        return this._selectedGroupType
    }
    get selectedStatus(){
        return this._selectedStatus
    }
    get selectedPriority(){
        return this._selectedPriority
    }
    get selectedExecutor(){
        return this._selectedExecutor
    }

}

