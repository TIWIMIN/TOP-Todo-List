import { Task } from "./task";

export class Project {
    #taskList = new Map(); 
    #taskContainer = document.querySelector("div.task-container"); 
    #currentTask = null; 

    constructor(title) {
        this.title = title; 
    }

    createTask(title, description, dueDate, priority) {
        const task = new Task(title, description, dueDate, priority); 

        const taskOnDOM = task.getTaskOnDOM(); 

        const deleteButton = document.createElement("button"); 
        deleteButton.classList.add("taskDeleteButton"); 
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation(); 
            this.#deleteTask(task); 
        });
        taskOnDOM.appendChild(deleteButton); 
        taskOnDOM.addEventListener("click", (e) => {
            e.stopPropagation(); 
            this.setCurrentTask(task); 
        });

        this.#taskList.set(task, taskOnDOM); 
    }

    #deleteTask(task) {
        if (task === this.getCurrentTask()) {
            this.setCurrentTask(null)
        }
        task.deleteTaskDetails(); 
        this.#taskList.get(task).remove(); 
        this.#taskList.delete(task); 
    }

    populateScreen() {
        this.#taskContainer.textContent = ""; 
        this.#taskList.forEach((value, key) => {
            this.#taskContainer.appendChild(value); 
        });
    }

    setCurrentTask(task) {
        if (this.getCurrentTask()) {
            this.#taskList.get(this.getCurrentTask()).classList.remove("priorityClicked");
        } 
        this.#currentTask = task
        const taskElement = this.#taskList.get(task) 
        taskElement.classList.add("priorityClicked")
    }

    getCurrentTask() {
        return this.#currentTask; 
    }

    setTitle(title) {
        this.title = title; 
    }

    getTitle() {
        return this.title; 
    }

    getTasks() {
        return this.#taskList; 
    }
};