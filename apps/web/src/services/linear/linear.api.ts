import { LinearClient } from '@linear/sdk'

// Api key authentication
const linearClient = new LinearClient({
    apiKey: process.env.NEXT_PUBLIC_LINEAR_PERSONAL_ACCESS_KEY
})

export {linearClient}