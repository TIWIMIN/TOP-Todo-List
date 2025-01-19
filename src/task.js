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
            e.stopPropagation();
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
        
        this.assignColor(this.#taskOnDOM);

        this.#taskOnDOM.appendChild(this.#taskOnDOMTitle); 
        
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
            return "high"; 
        }
        else if (priority == "two") {
            return "medium"; 
        }
        else if (priority == "three") {
            return "low"; 
        }
        return ""; 
    }

    assignColor(task) {
        if (task.classList.contains("priorityOne")) {
            task.classList.remove("priorityOne");
        }
        if (task.classList.contains("priorityTwo")) {
            task.classList.remove("priorityTwo"); 
        }
        if (task.classList.contains("priorityThree")) {
            task.classList.remove("priorityThree"); 
        }

        if (this.#priority == "one") {
            task.classList.add("priorityOne");
        }
        else if (this.#priority == "two") {
            task.classList.add("priorityTwo");
        }
        else if (this.#priority == "three") {
            task.classList.add("priorityThree"); 
        }
    }

    getTaskOnDOM() {
        return this.#taskOnDOM; 
    }

    showTaskDetails() {
        this.deleteTaskDetails(); 

        const taskDetailsTitle = document.createElement("div"); 
        const taskDetailsDescription = document.createElement("div"); 
        const taskDetailsDueDate = document.createElement("div")
        const taskDetailsPriority = document.createElement("div");

        const taskDetailsInfo = document.createElement("div"); 
        const taskDetailsTitleCircle = document.createElement("div"); 

        const taskDetailsInfoDate = document.createElement("div"); 
        const taskDetailsInfoPriority = document.createElement("div"); 

        taskDetailsTitle.classList.add("task-details-title"); 
        taskDetailsDueDate.classList.add("task-details-date"); 
        taskDetailsPriority.classList.add("task-details-priority"); 
        taskDetailsDescription.classList.add("task-details-description"); 
        
        taskDetailsInfo.classList.add("task-details-info"); 
        taskDetailsTitleCircle.classList.add("task-details-title-circle"); 

        taskDetailsInfoDate.classList.add("task-details-info-date"); 
        taskDetailsInfoPriority.classList.add("task-details-info-priority"); 
        taskDetailsInfoDate.textContent = "date"; 
        taskDetailsInfoPriority.textContent = "priority"; 

        this.#taskDetailsContainer.appendChild(taskDetailsTitleCircle); 
        this.#taskDetailsContainer.appendChild(taskDetailsTitle); 
        taskDetailsInfo.appendChild(taskDetailsDueDate); 
        taskDetailsInfo.appendChild(taskDetailsPriority); 
        taskDetailsInfo.appendChild(taskDetailsInfoDate); 
        taskDetailsInfo.appendChild(taskDetailsInfoPriority); 
        this.#taskDetailsContainer.appendChild(taskDetailsInfo);  
        this.#taskDetailsContainer.appendChild(taskDetailsDescription); 


        taskDetailsTitle.textContent = this.#title; 
        taskDetailsDescription.textContent = this.#description; 
        taskDetailsDueDate.textContent = this.#taskOnDOMDate.textContent; 
        taskDetailsPriority.textContent = this.#parsePriority(this.#priority); 

        this.makeTaskDetailsEditable(this.#taskOnDOMTitle, taskDetailsTitle);
        this.makeTaskDetailsEditable(null, taskDetailsDescription)
        this.makeTaskDetailsEditable(this.#taskOnDOMDate, taskDetailsDueDate); 
        this.makeTaskDetailsEditable(this.#taskOnDOMPriority, taskDetailsPriority);


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
                this.#dueDate = format(new Date(hiddenDateOnDOM.value), "yyyy-MM-dd"); 
            });
        }

        else if (taskAttribute === this.#taskOnDOMPriority) {
            const hiddenPriorityOnDOMOne = document.createElement("input"); 
            const hiddenPriorityOnDOMTwo = document.createElement("input"); 
            const hiddenPriorityOnDOMThree = document.createElement("input");
            
            const hiddenPriorityContainer = document.createElement("div"); 

            Object.assign(hiddenPriorityOnDOMOne, {
                type: "radio",
                name: "hiddenPriority", 
                checked: "true", 
                value: "one",
            });

            Object.assign(hiddenPriorityOnDOMTwo, {
                type: "radio",
                name: "hiddenPriority", 
                value: "two",
            });

            Object.assign(hiddenPriorityOnDOMThree, {
                type: "radio",
                name: "hiddenPriority", 
                value: "three",
            });

            hiddenPriorityContainer.appendChild(hiddenPriorityOnDOMOne); 
            hiddenPriorityContainer.appendChild(hiddenPriorityOnDOMTwo); 
            hiddenPriorityContainer.appendChild(hiddenPriorityOnDOMThree); 

            taskDetail.addEventListener("click", (e) => {
                taskDetail.textContent = ""; 
                taskDetail.appendChild(hiddenPriorityContainer); 
            });

            hiddenPriorityContainer.addEventListener("click", (e) => {
                if (e.target.name === "hiddenPriority") {
                    e.stopPropagation(); 
                    taskDetail.textContent = this.#parsePriority(e.target.value); 
                    this.#taskOnDOMPriority.textContent = this.#parsePriority(e.target.value);
                    this.#priority = e.target.value;  
                }
            });

            this.assignColor(this.#taskOnDOM);
        }
        

        else {
            taskDetail.addEventListener("click", () => {
                taskDetail.setAttribute("contenteditable", "true"); 
                taskDetail.focus(); 
            });

            taskDetail.addEventListener("blur", () => {
                this.#description = taskDetail.textContent;
                if (taskAttribute) {
                    taskAttribute.textContent = taskDetail.textContent
                    this.#title = taskDetail.textContent; 
                }
                taskDetail.removeAttribute("contenteditable"); 
            });
        }



    }

    deleteTaskDetails() {
        this.#taskDetailsContainer.textContent = ""; 
    }

    getTaskInfo() {
        return [this.#title, this.#description, this.#dueDate, this.#priority]; 
    }
    
}

