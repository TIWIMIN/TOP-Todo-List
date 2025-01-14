import { Project } from "./project";
import { TaskButton } from "./taskButton";
import { format } from 'date-fns'; 


export class ProjectManager {
    #newProjectButton = document.querySelector("button#newProject");
    #projectDialog = document.querySelector("dialog#projectDialog"); 
    #projectTitle = document.querySelector("input#projectTitle"); 
    #projectSubmitButton = document.querySelector("button#projectDialogSubmit"); 
    #projectCloseButton = document.querySelector("button#projectDialogClose");  

    #projectList = new Map(); 
    #projectContainer = document.querySelector("div.project-container");

    #taskContainer = document.querySelector("div.task-container"); 
    #taskDetailsContainer = document.querySelector("div.task-details-container"); 

    #currentProject; 

    #taskButton;

    #defaultProject; 

    #today = format(new Date(), 'MMMM do, yyyy'); 

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
        projectOnDOM.textContent = this.#today; 
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

        this.setCurrentProject(project);


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
        this.#taskDetailsContainer.textContent = ""; 
    }

    getCurrentProject() {
        return this.#currentProject; 
    }

    getProjects() {
        return this.#projectList; 
    }
}