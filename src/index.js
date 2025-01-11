import { Project } from "./project.js";
import { TaskButton } from "./taskButton.js";
import { ProjectManager } from "./projectManager.js";


const test = new Project(); 
const taskButton = new TaskButton(); 
const projectManager = new ProjectManager(); 
taskButton.setProject(test);
test.createTask("hi", "hi", "hi", "hi"); 
test.populateScreen(); 