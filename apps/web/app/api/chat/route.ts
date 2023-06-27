// ./app/api/chat/route.ts
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import {NextResponse} from "next/server";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // if(req.headers.get('Authorization') !== process.env.AUTHORIZATION_SECRET) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  // }
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json()

  console.log("These are messages passed to completion: ")
  console.log(messages)

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role
    }))
  })


  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)

  console.log("This is stream ? ")
  console.log(stream)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}
