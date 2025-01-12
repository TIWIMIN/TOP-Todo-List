export class Task {
    #title;
    #description; 
    #dueDate; 
    #priority; 
    #taskOnDOM;

    #taskDetailsContainer = document.querySelector("div.task-details-container"); 
    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate; 
        this.#priority = priority; 

        this.#taskOnDOM = document.createElement("button"); 
        this.#taskOnDOM.textContent = `${title}${dueDate}${priority}`; 
        this.#taskOnDOM.classList.add("task");

        this.#taskOnDOM.addEventListener("click", (e) => {
            this.showTaskDetails(); 
        })
    }

    getTaskOnDOM() {
        return this.#taskOnDOM; 
    }

    showTaskDetails() {
        this.#taskDetailsContainer.textContent = ""; 

        const taskDetailsTitle = document.createElement("h1"); 
        const taskDetailsDescription = document.createElement("p"); 
        const taskDetailsDueDate = document.createElement("div")
        const taskDetailsPriority = document.createElement("div");

        taskDetailsTitle.textContent = this.#title; 
        taskDetailsDescription.textContent = this.#description; 
        taskDetailsDueDate.textContent = this.#dueDate; 
        taskDetailsPriority.textContent = this.#priority; 
        
        this.#taskDetailsContainer.appendChild(taskDetailsTitle); 
        this.#taskDetailsContainer.appendChild(taskDetailsDescription); 
        this.#taskDetailsContainer.appendChild(taskDetailsDueDate); 
        this.#taskDetailsContainer.appendChild(taskDetailsPriority); 
    }

    deleteTaskDetails() {
        this.#taskDetailsContainer.textContent = ""; 
    }
}

