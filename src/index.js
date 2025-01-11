import { Project } from "./project.js";
import { TaskButton } from "./taskButton.js";


const test = new Project(); 
const taskButton = new TaskButton(); 
taskButton.setProject(test);
test.createTask("hi", "hi", "hi", "hi"); 
test.populateScreen(); 