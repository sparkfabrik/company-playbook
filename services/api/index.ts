import "dotenv/config";
import fastify from "fastify";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  RunnablePassthrough,
  RunnableSequence,
  RunnableWithMessageHistory,
} from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { formatDocumentsAsString } from "langchain/util/document";
import { retrieveStore } from "../lib/chroma";
import { openai } from "../lib/openai";

// Create Fastify server instance
const server = fastify();
const COLLECTION = "rag-playbook";

// Query parameters validation schema
const getSchema = {
  querystring: {
    type: 'object',
    properties: {
      question: { type: 'string' }
    },
    required: ['question']
  }
};


/////////////////////////////////////////////////////////////// SERVER CODE

// GET round for user query
server.get<{ Querystring: { question: string } }>('/api/ask', { schema: getSchema }, async (request, reply) => {
  const { question } = request.query;
  const response = {
    'answer': await answer(question)
  }
  reply.send(response);
});

// Start server
const start = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};



/////////////////////////////////////////////////////////////// LOGIC

// Remember to a GITHUB_ACCESS_TOKEN in your .env file - https://github.com/settings/tokens?type=beta.
const answer = async (question: string) => {
    const store = await retrieveStore(COLLECTION);
    const results = await store.similaritySearch(question, 3);
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0,
      messages: [
        {
          role: "assistant",
          content: `You are a helpful AI assistant.
  
      Your mission is to help users finding relevant information about the company playbook.
      You are always kind and helpful, and you should always provide an answer that is meaningful and relevant.
      If you cannot answer the question with the following context, don't lie or make up stuff: just say you can't answer the qustion and suggest to use the menu.
      You do your best to remember all the details the user shares with you.`,
        },
        {
          role: "user",
          content: `Answer the following question using the provided context.
  
            Question: ${question}
  
            Context: ${results.map((r) => r.pageContent).join("\n")}`,
        },
      ],
    });
    return response.choices[0].message.content;
  };
  

start();
