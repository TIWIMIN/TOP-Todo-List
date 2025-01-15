import { Task } from "./task";

export class Project {
    #taskList = new Map(); 
    #taskContainer = document.querySelector("div.task-container"); 

    constructor(title) {
        this.title = title; 
    }

    createTask(title, description, dueDate, priority) {
        const task = new Task(title, description, dueDate, priority); 

        const taskOnDOM = task.getTaskOnDOM(); 

        const deleteButton = document.createElement("button"); 
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation(); 
            this.#deleteTask(task); 
        });
        taskOnDOM.appendChild(deleteButton); 

        const completeButton = document.createElement("button"); 
        completeButton.addEventListener("click", (e) => {
            e.stopPropagation(); 
            // add function to style button here
        })

        this.#taskList.set(task, taskOnDOM); 
    }

    #deleteTask(task) {
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

    getTitle() {
        return this.title; 
    }

    getTasks() {
        return this.#taskList; 
    }
};