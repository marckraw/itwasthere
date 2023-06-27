import { TodoistApi } from "@doist/todoist-api-typescript"

const todoistApi = new TodoistApi(process.env.NEXT_PUBLIC_TODOIST_API_TOKEN as string)

export {todoistApi}