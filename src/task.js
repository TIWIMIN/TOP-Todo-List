import { format } from "date-fns"; 

export class Task {
    #title;
    #description; 
    #dueDate; 
    #priority; 
    #taskOnDOM;

    #taskDetailsContainer = document.querySelector("div.task-details-container");  
    
    #taskOnDOMTitle; 
    #taskOnDOMDate; 
    #taskOnDOMPriority; 

    #today = format(new Date(), 'MMM dd, yyyy'); 

    constructor(title, description, dueDate, priority) {
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate; 
        this.#priority = priority; 

        this.#taskOnDOM = document.createElement("button"); 
        this.#taskOnDOM.classList.add("task");



        this.#taskOnDOM.addEventListener("click", (e) => {
            this.showTaskDetails(); 
        })

        this.#taskOnDOMTitle = document.createElement("div"); 
        this.#taskOnDOMDate = document.createElement("div");
        this.#taskOnDOMPriority = document.createElement("div"); 

        this.#taskOnDOMTitle.classList.add("taskOnDOMTitle"); 
        this.#taskOnDOMDate.classList.add("taskOnDOMDate"); 
        this.#taskOnDOMPriority.classList.add("taskOnDOMPriority"); 

        this.#taskOnDOMTitle.textContent = this.#title; 
        this.#taskOnDOMDate.textContent = this.#parseDate(this.#dueDate);
        this.#taskOnDOMPriority.textContent = this.#parsePriority(this.#priority); 

        this.#taskOnDOM.appendChild(this.#taskOnDOMTitle); 
        this.#taskOnDOM.appendChild(this.#taskOnDOMDate); 
        this.#taskOnDOM.appendChild(this.#taskOnDOMPriority); 
        
    }

    #parseDate(date) {
        // add feature that prevents inputting dates earlier than current date
        if (date !== "") {
            return "due " + format(new Date(date), 'MMM dd, yyyy');
        }
        else return "no due date" 
    }

    #parsePriority(priority) {
        if (priority == "one") {
            return "low priority"; 
        }
        else if (priority == "two") {
            return "medium priority"; 
        }
        else if (priority == "three") {
            return "high priority"; 
        }
        return ""; 
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
        taskDetailsDueDate.textContent = this.#taskOnDOMDate.textContent; 
        taskDetailsPriority.textContent = this.#priority; 

        this.makeTaskDetailsEditable(this.#taskOnDOMTitle, taskDetailsTitle);
        this.makeTaskDetailsEditable(null, taskDetailsDescription)
        this.makeTaskDetailsEditable(this.#taskOnDOMDate, taskDetailsDueDate); 
        
        this.#taskDetailsContainer.appendChild(taskDetailsTitle); 
        this.#taskDetailsContainer.appendChild(taskDetailsDescription); 
        this.#taskDetailsContainer.appendChild(taskDetailsDueDate); 
        this.#taskDetailsContainer.appendChild(taskDetailsPriority); 


    }

    makeTaskDetailsEditable(taskAttribute, taskDetail) {
        // syncs the task element on DOM with the changes make in the details section
        if (taskAttribute === this.#taskOnDOMDate) {
            const hiddenDateOnDOM = document.createElement("input");
            hiddenDateOnDOM.setAttribute("type", "date");
            hiddenDateOnDOM.setAttribute("value", "default"); 
            taskDetail.addEventListener("click", (e) => {
                e.stopPropagation(); 
                taskDetail.textContent = ""; 
                taskDetail.appendChild(hiddenDateOnDOM); 
                hiddenDateOnDOM.focus();  
            });
            hiddenDateOnDOM.addEventListener("blur", (e) => {
                taskDetail.textContent = taskAttribute.textContent;
            })
            hiddenDateOnDOM.addEventListener("change", (e) => {
                console.log(hiddenDateOnDOM.value); 
                taskDetail.textContent = format(new Date(hiddenDateOnDOM.value), 'MMM dd, yyyy');
                taskAttribute.textContent = format(new Date(hiddenDateOnDOM.value), 'MMM dd, yyyy'); 
            });
        }
        

        else {
            taskDetail.addEventListener("click", () => {
                taskDetail.setAttribute("contenteditable", "true"); 
                taskDetail.focus(); 
            });

            taskDetail.addEventListener("blur", () => {
                if (taskAttribute) {
                    taskAttribute.textContent = taskDetail.textContent
                }
                taskDetail.removeAttribute("contenteditable"); 
            });
        }



    }

    deleteTaskDetails() {
        this.#taskDetailsContainer.textContent = ""; 
    }
}

