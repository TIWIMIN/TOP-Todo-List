import { Project } from "./project.js";
import { TaskButton } from "./taskButton.js";
import { ProjectManager } from "./projectManager.js";
import "./indexStyles.css"; 

const taskButton = new TaskButton(); 
const projectManager = new ProjectManager();
projectManager.setTaskButton(taskButton); 
const defaultProject = projectManager.createDefaultProject("default"); 
projectManager.setCurrentProject(defaultProject)
const currentProject = projectManager.getCurrentProject(); 

taskButton.setProject(currentProject);
