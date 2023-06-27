import { encode } from "@nem035/gpt-3-encoder";

interface Message {
  role: 'user' | 'assistant' | 'system',
  content: string
}

export const countTokensFromMessages = (messages: Message[]) => {
  return messages.reduce((acc, message) => {
    return acc + countTokens(message.content)
  }, 0)
}

export const countTokens = (str: string) => {
  if (str.length > 0) {
    const encoded = encode(str);

    return encoded.length;
  } else {
    return 0;
  }
};
