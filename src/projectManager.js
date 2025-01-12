import { Project } from "./project";
import { TaskButton } from "./taskButton";

export class ProjectManager {
    #newProjectButton = document.querySelector("button#newProject");
    #projectDialog = document.querySelector("dialog#projectDialog"); 
    #projectTitle = document.querySelector("input#projectTitle"); 
    #projectSubmitButton = document.querySelector("button#projectDialogSubmit"); 
    #projectCloseButton = document.querySelector("button#projectDialogClose");  

    #projectList = new Map(); 
    #projectContainer = document.querySelector("div.project-container");

    #taskContainer = document.querySelector("div.task-container"); 

    #currentProject; 

    #taskButton;

    #defaultProject; 

    constructor(title) {
        this.#newProjectButton.addEventListener("click", (e) => {
            this.#projectDialog.showModal(); 
        });

        this.#projectSubmitButton.addEventListener("click", (e) => {
            e.preventDefault(); 
            if (this.#projectTitle.value !== "") {
                this.createProject(this.#projectTitle.value)
                this.#projectDialog.close(); 
            }
            else {

            }
        });

        this.#projectCloseButton.addEventListener("click", (e) => {
            this.#projectDialog.close(); 
        }) 
    }

    createDefaultProject(title) {
        const project = new Project(title); 

        const projectOnDOM = document.createElement("button");
        projectOnDOM.textContent = title; 
        projectOnDOM.classList.add("project");

        projectOnDOM.addEventListener("click", (e) => this.setCurrentProject(project));

        this.#projectContainer.appendChild(projectOnDOM); 
        this.#projectList.set(project, projectOnDOM); 

        this.#defaultProject = project; 
        return project;
    }

    createProject(title) {
        const project = new Project(title); 

        const projectOnDOM = document.createElement("button");
        projectOnDOM.textContent = title; 
        projectOnDOM.classList.add("project"); 

        const deleteButton = document.createElement("button"); 
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation(); 
            this.#deleteProject(project); 
        });
        projectOnDOM.appendChild(deleteButton); 

        projectOnDOM.addEventListener("click", (e) => this.setCurrentProject(project));

        this.#projectContainer.appendChild(projectOnDOM); 
        this.#projectList.set(project, projectOnDOM); 


        return project;
    }

    #deleteProject(project) {
        this.#projectList.get(project).remove(); 
        this.#projectList.delete(project); 
        this.setCurrentProject(this.#defaultProject); 
    }

    setTaskButton(button) {
        this.#taskButton = button;
    }

    setCurrentProject(project) {
        this.#taskButton.setProject(project); 
        this.#currentProject = project; 
        this.#taskContainer.textContent = ""; 
        this.#currentProject.populateScreen(); 
        console.log("hi"); 
    }

    getCurrentProject() {
        return this.#currentProject; 
    }
}