import "dotenv/config";

import { marked } from "marked";
import xss from "xss";
import { capitalize, uniqBy } from "es-toolkit";

import { retrieveStore } from "../lib/chroma";
import { openai } from "../lib/openai";

const COLLECTION = "rag-playbook";
const SIMILARITY = 3;
const PLAYBOOK_URL = "https://playbook.sparkfabrik.com";

export const answer = async (question: string) => {
  const store = await retrieveStore(COLLECTION);
  const results = await store.similaritySearch(question, SIMILARITY);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    messages: [
      {
        role: "assistant",
        content: `
          You are a helpful AI assistant.
          Your mission is to help users finding relevant information about the company playbook.

          You are always kind and helpful, and you should always provide an answer that is meaningful and relevant.
          If you cannot answer the question with the following context, don't lie or make up stuff: just say you can't answer the qustion and suggest to use the menu.
          Also, never mentioned the "provided context" in your answers!
          
          In case there is no question, please answer suggesting the user to ask a question.
          You can format your answer using only Markdown syntax.
          
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

  return xss(await marked.parse(response.choices[0].message.content || ""));
};


// Function to retrieve metadata from Chroma store and transform source_file paths
export const sources = async (question: string) => {
  const store = await retrieveStore(COLLECTION);
  const results = uniqBy(await store.similaritySearch(question, SIMILARITY), r => r.metadata.source);

  // Translate the files to urls and generate titles
  return results.map(r => {
    const match = r.metadata.source.match(/^.*\/content\/(.+)\.md$/);

    if (match && match[1]) {
      const uri = match[1];
      const url = `${PLAYBOOK_URL}/${uri}`;

      const slug = uri.match(/.+\/(.+)/);
      const title = slug && slug[1] ? slugToTitle(slug[1]) : "Homepage";
      
      return { url, title };
    }

    return null;
  }).filter(Boolean); // Remove nulls from results
};

// Helper function to convert slug to human-readable title
const slugToTitle = (slug: string): string => slug.split('-').map(capitalize).join(' ');
