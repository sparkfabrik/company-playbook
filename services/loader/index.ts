import "dotenv/config";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { createStore } from "../lib/chroma.js";

const COLLECTION = "rag-playbook";

export const getDocs = async () => {
  const loader = new DirectoryLoader(`../content`, {
    ".md": (path) => new TextLoader(path),
  });
  const docs = await loader.load();

  // Split it chunks.
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 1500,
    chunkOverlap: 0,
  });
  const split = await splitter.splitDocuments(docs);
  return split;
};

createStore(COLLECTION, getDocs);
