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
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { formatDocumentsAsString } from "langchain/util/document";
import { VectorStore } from "@langchain/core/vectorstores";
import { RunnableConfig } from "@langchain/core/runnables";
import "dotenv/config";

/**
Usage example with an memory history storage:

  const messageHistories: Record<string, InMemoryChatMessageHistory> = {};
  const store = await createStore();
  const llm = new ChatOpenAI({ model: "gpt-3.5-turbo", temperature: 0.5 });
  const response = await chatWithMemory(assistantPrompt, question, {
    history: messageHistories,
    historyConfig: { configurable: { sessionId: "1234qwer" } },
    vectorStore: {
      retriever: store,
      retrieverConfig: { maxResults: 3 },
    },
    llm,
  });
 */
export const chatWithMemory = async (
  prompt: string,
  question: string,
  config: {
    history: Record<string, InMemoryChatMessageHistory>;
    historyConfig: RunnableConfig;
    vectorStore: {
      retriever: VectorStore;
      retrieverConfig: { maxResults: number };
    };
    llm: BaseChatModel;
  },
) => {
  const retriever = config.vectorStore.retriever.asRetriever(
    config.vectorStore.retrieverConfig.maxResults ?? 3,
  );

  const contextualizeQSystemPrompt = `Given a chat history and the latest user question
  which might reference context in the chat history, formulate a standalone question
  which can be understood without the chat history. Do NOT answer the question,
  just reformulate it if needed and otherwise return it as is.`;
  const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);

  const contextualizeQChain = contextualizeQPrompt
    .pipe(config.llm)
    .pipe(new StringOutputParser());

  const qaPrompt = ChatPromptTemplate.fromMessages([
    ["system", prompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ]);

  const ragChain = RunnableSequence.from([
    RunnablePassthrough.assign({
      context: (input: Record<string, unknown>) => {
        if ("chat_history" in input) {
          return contextualizeQChain
            .pipe(retriever)
            .pipe(formatDocumentsAsString);
        }
        return "";
      },
    }),
    qaPrompt,
    config.llm,
  ]);

  const withMessageHistory = new RunnableWithMessageHistory({
    runnable: ragChain,
    getMessageHistory: async (sessionId) => {
      if (config.history[sessionId] === undefined) {
        config.history[sessionId] = new InMemoryChatMessageHistory();
      }
      return config.history[sessionId];
    },
    inputMessagesKey: "question",
    historyMessagesKey: "chat_history",
  });

  return await withMessageHistory.invoke({ question }, config.historyConfig);
};
