import { TaskButton } from "./taskButton.js";
import { ProjectManager } from "./projectManager.js";
import { LocalStorageManager } from "./localStorageManager.js";
import "./styles/indexStyles.css"; 
import "./styles/projectStyles.css"; 
import "./styles/taskStyles.css"; 

const taskButton = new TaskButton(); 
const projectManager = new ProjectManager();
const localStorageManager = new LocalStorageManager(); 
projectManager.setTaskButton(taskButton); 
const defaultProject = projectManager.createDefaultProject("default"); 
projectManager.setCurrentProject(defaultProject)
const currentProject = projectManager.getCurrentProject(); 

taskButton.setProject(currentProject);

window.addEventListener("beforeunload", (e) => {
    console.log("here!"); 
    localStorageManager.populateStorage(projectManager.getProjects()); 
});

document.addEventListener("DOMContentLoaded", () => {
    if (localStorageManager.isStorageEmpty()) {
        return; 
    }
    const localProjects = localStorageManager.getStorage();
    for (const localProject of localProjects) {
        const project = projectManager.createProject(localProject[0]); 
        for (let i = 1; i < localProject.length; i++) {
            project.createTask(localProject[i].taskTitle, localProject[i].taskDescription, localProject[i].taskDate, localProject[i].taskPriority);
        }
    }
});