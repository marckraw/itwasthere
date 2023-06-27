'use client'

import React from "react";
import { useChat } from 'ai/react'
import {countTokensFromMessages} from "@/src/services/utils/utils.service";

export default function Chat() {
  const {error, isLoading, messages, input, handleInputChange, handleSubmit, } = useChat({
    headers: {
      'Authorization': process.env.NEXT_PUBLIC_AUTHORIZATION_SECRET || ""
    }
  })

  if(error) {
    console.log("Eeopee")
    console.log(error)
  }

  if(isLoading) {
    console.log("Is loading ? ")
    console.log(isLoading)
  }

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.length > 0
        ? messages.map(m => (
            <div key={m.id} className="whitespace-pre-wrap"
                 style={{
                    border: m.role === 'user' ? "1px solid green" : "1px solid red",
                    padding: '12px',
                    marginBottom: '18px'
                }}
            >
                <div>
                    <strong>{m.role === 'user' ? 'User: ' : 'AI: '}</strong>
                </div>
              {m.content}
            </div>
          ))
        : null}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <div>Tokens: {countTokensFromMessages([...messages, {role: 'user', content: input}])}</div>
      </form>
    </div>
  )
}
