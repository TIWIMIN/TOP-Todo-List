import { ProjectManager } from "./projectManager";

export class LocalStorageManager {
    
    #projectList; 
    constructor(projectList) {
        this.#projectList = projectList; 
    }

    saveToLocalStorage(projectList) {
        let counter = -1; 
        let json = "{"; 
        for (const project of projectList.keys()) {
            counter += 1; 
            let tempArray; 
            for (const task of project.getTasks()) {
                const tempTask = {
                    projectName: project.title, 
                    taskTitle: task.getTaskInfo()[0], 
                    
                }
            }
        }
    }
}