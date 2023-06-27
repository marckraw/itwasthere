import {todoistService} from "@/src/services/todoist/todoist.service";
import {linearService} from "@/src/services/linear/linear.service";
import {TodoistIcon} from "@/src/components/icons/todoist";
import {LinearIcon} from "@/src/components/icons/linear";

const fetchLinearTasks = async () => {
    const response = await linearService.getMyIssuesForToday()

    return response
}

const fetchTodaysTask = async () => {
    const response = await todoistService.getTasksForToday()

    return response;
}


const TodayTasks = async () => {
    const activeTasks = await fetchTodaysTask()
    const linearTasks = await fetchLinearTasks()

    return (
        <>
            <h1>Tasks for <span style={{color: 'orange'}}><strong>today</strong></span> or <span style={{color: 'orangered'}}><strong>overdue:</strong></span></h1>
            <div>{activeTasks.map(task => {
                return (
                    <div key={task.id} style={{border: "1px solid red", margin: "8px", padding: "12px", borderRadius: '15px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h2>{task.content}</h2>
                            <TodoistIcon />
                        </div>
                        <p><strong>Description:</strong> {task.description}</p>

                        <a href={task.url} target="_blank" rel="noopener" style={{color: 'red'}}>See it in todoist</a>
                    </div>
                )
            })}
            </div>
            <div>
                {linearTasks.map(task => {
                    return (
                        <div key={task.id} style={{border: "1px solid black", margin: "8px", padding: "12px", borderRadius: '15px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <h2>{task.title}</h2>
                                <LinearIcon />
                            </div>
                            <p><strong>Description:</strong> {task.description}</p>
                            <a href={task.url}  target="_blank" rel="noopener" style={{color: 'black'}}>See it in linear</a>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TodayTasks