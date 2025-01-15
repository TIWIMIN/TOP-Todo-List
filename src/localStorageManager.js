import { ProjectManager } from "./projectManager";

export class LocalStorageManager {
    
    constructor() { 
    }

    isStorageEmpty(type) {
        if (localStorage.length < 1) {
            return true; 
        }
        return false; 
    }

    populateStorage(projectList) {
        localStorage.clear(); 
        let counter = -1; 
        for (const project of projectList.keys()) {
            counter += 1; 
            let tempArray = []; 
            tempArray.push(project.getTitle());
            console.log(`Processing project: ${project.getTitle()}`);
            for (const task of project.getTasks().keys()) {
                console.log(`Processing task: ${task.getTaskInfo()}`);
                const tempTask = {
                    taskTitle: task.getTaskInfo()[0], 
                    taskDescription: task.getTaskInfo()[1], 
                    taskDate: task.getTaskInfo()[2], 
                    taskPriority: task.getTaskInfo()[3]
                }
                tempArray.push(tempTask); 
            }
            let tempJSON = JSON.stringify(tempArray); 
            localStorage.setItem(counter, tempJSON); 
            console.log(`Saved project ${counter} to localStorage.`);
        }
    }

    getStorage() {
        let projects = []; 
        for (let i = 1; i < localStorage.length; i++) {
            projects.push(JSON.parse(localStorage.getItem(i))); 
            console.log(JSON.parse(localStorage.getItem(i))); 
        }   
        return projects; 
    }
}