import "dotenv/config";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { createStore } from "../lib/chroma.js";

const COLLECTION = "rag-playbook";
const LOADER_FILES_EXTENSION = ".md";
const LOADER_CHUNK_SIZE = 1500;
const LOADER_CHUNK_OVERLAP = 0;

const getDocs = async () => {
  // Define content loader
  const loader = new DirectoryLoader(`../content`, {
    [String(process.env.LOADER_FILES_EXTENSION ?? LOADER_FILES_EXTENSION)]: (path) => new TextLoader(path),
  });

  // Split content in chunks
  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: Number(process.env.LOADER_CHUNK_SIZE ?? LOADER_CHUNK_SIZE),
    chunkOverlap: Number(process.env.LOADER_CHUNK_OVERLAP ?? LOADER_CHUNK_OVERLAP),
  });

  return await splitter.splitDocuments(await loader.load());
};

export const loadDocuments = async () => {
  await createStore(COLLECTION, getDocs);
}
