import "dotenv/config";
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

const COLLECTION = "rag-playbook";
const SIMILARITY = 3;

// Remember to a GITHUB_ACCESS_TOKEN in your .env file - https://github.com/settings/tokens?type=beta.
export const answer = async (question: string) => {
  const store = await retrieveStore(COLLECTION);
  const results = await store.similaritySearch(question, SIMILARITY);
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
    Also, never mentioned the "provided context" in your answers!
    In case there is no question, please answer suggesting the user to ask a question.
    You must format your answer using only HTML anchors, bold and italic elements. Never never never use markdown, only HTML tags. If needed, convert markdown syntax to HTML.
    Please do your best to provide links that you find in the context if they are relevant. Be concise.
    You do your best to remember all the details the user shares with you.`,
      },
      {
        role: "user",
        content: `Answer the following question using the provided context.

          Context: ${results.map((r) => r.pageContent).join("\n")}

          Question: ${question}`,
      },
    ],
  });
  return response.choices[0].message.content;
};


// Function to retrieve metadata from Chroma store and transform source_file paths
export const sources = async (question: string) => {
  const store = await retrieveStore(COLLECTION);
  const results = await store.similaritySearch(question, SIMILARITY);

  // Rimuove duplicati basati sul campo source_file
  const uniqueResults = Array.from(new Set(results.map(r => r.metadata.source)))
    .map(source => results.find(r => r.metadata.source === source)!);

  // Translate the files to urls and generate titles
  const transformedResults = uniqueResults.map(r => {
    const match = r.metadata.source.match(/\/home\/alessio\/Projects\/company-playbook\/content\/(.+)\.md/);
    if (match && match[1]) {
      const uri = match[1];
      const url = `https://playbook.sparkfabrik.com/${uri}`;
      const slug = uri.match(/.+\/(.+)/);
      let title = "Homepage";
      if (slug && slug[1]) {
        title = slugToTitle(slug[1])
      }
      
      return { url, title };
    }
    return null;
  }).filter(Boolean); // Remove nulls from results

  return transformedResults;
};



// Helper function to convert slug to human-readable title
const slugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};