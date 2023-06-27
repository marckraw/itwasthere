import {todoistApi} from "./todoist.api";
import {format, compareAsc, parseISO} from 'date-fns'

const getProjects = async () => {
    return await todoistApi.getProjects()
}

const getActiveTasks = async () => {
    return await todoistApi.getTasks()
}

const getTasksForToday = async () => {
    const today = format(new Date(), "yyyy-MM-dd")
    const activeTasks = await getActiveTasks()

    return activeTasks.filter(task => {
        const dueDate = task.due?.date // '2023-06-21'
        const isCompleted = task.isCompleted
        const url = task.url
        const content = task.content
        const description = task.description
        const priority = task.priority

        console.log(`dueDate: ${dueDate}, today: ${today}`);
        
        if(!dueDate) {
            return false
        }

        const compareResult = compareAsc(new Date(parseISO(dueDate)), new Date(parseISO(today)))

        const isTodayOrOverdue = compareResult <= 0

        if(isTodayOrOverdue) {
            return true
        } else {
            return false
        }
    })
}

export const todoistService = {
    getProjects,
    getActiveTasks,
    getTasksForToday
}
