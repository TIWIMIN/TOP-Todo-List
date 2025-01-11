import { Task } from "./task";

export class Project {
    #taskList = new Map(); 
    #projectContainer = document.querySelector("div.project-container"); 

    constructor() {

    }

    createTask(title, description, dueDate, priority) {
        const task = new Task(title, description, dueDate, priority); 

        const taskOnDOM = document.createElement("div"); 
        taskOnDOM.textContent = `${title}, ${description}, ${dueDate}, ${priority}`; 
        taskOnDOM.classList.add("task"); 

        const deleteButton = document.createElement("button"); 
        deleteButton.addEventListener("click", (e) => {
            this.deleteTask(task); 
        });
        taskOnDOM.appendChild(deleteButton); 

        this.#taskList.set(task, taskOnDOM); 
    }

    deleteTask(task) {
        this.#taskList.get(task).remove(); 
        this.#taskList.delete(task); 
    }

    populateScreen() {
        this.#taskList.forEach((value, key) => {
            this.#projectContainer.appendChild(value); 
        });
    }
};