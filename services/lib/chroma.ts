import { ChromaClient } from "chromadb";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";

export const chromaHost = () => {
  const host = process.env.REMOTE_CONTAINERS
    ? "host.docker.internal"
    : "127.0.0.1";
  const port = process.env.CHROMADB_PORT ? process.env.CHROMADB_PORT : 8000;
  return `http://${host}:${port}`;
};

export const deleteCollection = (collection: string) => {
  const client = new ChromaClient({ path: chromaHost() });
  return client.deleteCollection({ name: collection });
};

export const collectionIsNotEmpty = async (collection: string) => {
  try {
    const client = new ChromaClient({ path: chromaHost() });
    const response = await client.getCollection({ name: collection });
    return response.count();
  } catch (e) {
    return false;
  }
};

export const createStoreFromExistingCollection = async (collection: string) => {
  return await Chroma.fromExistingCollection(new OpenAIEmbeddings(), {
    collectionName: collection,
    url: chromaHost(),
  });
};

export const createStoreFromDocuments = async (
  docs: Document[],
  collection: string
) => {
  return await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
    collectionName: collection,
    url: chromaHost(),
    collectionMetadata: {
      "hnsw:space": "cosine",
    },
  });
};

export const createStore = async (
  collection: string,
  fn: () => Promise<Document[]>
) => {
  const docs = await fn();
  return await createStoreFromDocuments(docs, collection);
};

export const retrieveStore = async (collection: string) => {
  return await createStoreFromExistingCollection(collection);
};

export const createStoreOrRetrieve = async (
  collection: string,
  fn: () => Promise<Document[]>
) => {
  if (await collectionIsNotEmpty(collection)) {
    return await retrieveStore(collection);
  }
  return await createStore(collection, fn);
};
