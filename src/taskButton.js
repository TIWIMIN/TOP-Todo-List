export class TaskButton {
    #newTaskButton = document.querySelector("button#newTask"); 
    #taskDialog = document.querySelector("dialog#taskDialog");
    #taskForm = document.querySelector("#taskDialog form"); 
    #taskFormData; 
    #taskFormSubmitButton = document.querySelector("button#taskDialogSubmit"); 
    #taskFormCloseButton = document.querySelector("button#taskDialogClose");
    #taskContainerHeaderTitle = document.querySelector("div.task-container-header-title");
    
    #currentProject = null; 

    constructor() {
        this.#newTaskButton.addEventListener("click", (e) => {
            this.#taskDialog.showModal(); 
        });

        this.#taskFormSubmitButton.addEventListener("click", (e) => {
            e.preventDefault(); 
            this.#taskFormData = new FormData(this.#taskForm); 
            if (this.#isFormValid(this.#taskFormData) && this.#currentProject !== null) {
                const tempTaskFormData = [
                    this.#taskFormData.get("taskTitle"), 
                    this.#taskFormData.get("taskDescription"),
                    this.#taskFormData.get("taskDate"), 
                    this.#taskFormData.get("taskPriority"),
                ]
                this.#currentProject.createTask(...tempTaskFormData); 
                this.#currentProject.populateScreen(); 
                this.#taskDialog.close(); 
            }
            else {
                // alert that form is invalid
            }
        });

        this.#taskFormCloseButton.addEventListener("click", (e) => {
            this.#taskDialog.close(); 
        });
    }

    setProject(project) {
        this.#currentProject = project; 
        this.#taskContainerHeaderTitle.textContent = project.getTitle(); 
    }

    #isFormValid(taskFormData) {
        if (taskFormData.get("taskTitle").length > 0) {
            return true;
        }
        return false;
    }
}