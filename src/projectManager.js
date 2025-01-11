import { Project } from "./project";

export class ProjectManager {
    #newProjectButton = document.querySelector("button#newProject");
    #projectDialog = document.querySelector("dialog#projectDialog"); 
    #projectTitle = document.querySelector("input#projectTitle"); 
    #projectSubmitButton = document.querySelector("button#projectSubmit"); 
    #projectCloseButton = document.querySelector("button#projectClose");  

    #projectList = new Map(); 
    #projectContainer = document.querySelector("div#project-container");

    constructor() {
        this.#newProjectButton.addEventListener("click", (e) => {
            this.#projectDialog.showModal(); 
        });
    }

    createProject(title) {
        const project = Project(title); 

        const projectOnDOM = document.createElement("div");
        projectOnDOM.textContent = title; 
        projectOnDOM.classList.add("project"); 

        const deleteButton = document.createElement("button"); 
        deleteButton.addEventListener("click", (e) => {
            this.#deleteProject(project); 
        });
        projectOnDOM.appendChild(deleteButton); 

        this.#projectContainer.appendChild(projectOnDOM); 
        this.#projectList.set(project, projectOnDOM); 
    }

    #deleteProject(project) {
        this.#projectList.get(project).remove(); 
        this.#projectList.delete(project); 
    }
}