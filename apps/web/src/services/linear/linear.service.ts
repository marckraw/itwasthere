import {linearClient} from "./linear.api";
import {format, compareAsc, parseISO} from "date-fns";

export async function getMyIssues() {
    const me = await linearClient.viewer;
    const myIssues = await me.assignedIssues();

    return myIssues
}

export async function getMyIssuesForToday() {
    const today = format(new Date(), "yyyy-MM-dd")
    const myIssues = await getMyIssues();

    const todaysIssues = myIssues
        .nodes
        .filter(issue => {
            const dueDate = issue.dueDate

            if(!issue.dueDate) {
                return false
            }

            if(issue.completedAt) {
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

    return todaysIssues
}

const getMe = async () => {
    const me = await linearClient.viewer;
    return me
}

const getMyOrg = async () => {
    const org = await linearClient.organization;
    return org
}

const getProjects = async () => {
    const projects = await linearClient.projects();
    return projects
}

const getProjectByNames = async (names: string[]) => {
    const GraphQLFilter = {
        or: names.map(name => {
            return {
                name: { contains: name }
            }
        })
    }

    const projects = await linearClient.projects({ filter: GraphQLFilter });

    return projects
}



export const linearService = {
    getProjects,
    getProjectByNames,
    getMe,
    getMyOrg,
    getMyIssues,
    getMyIssuesForToday
}



