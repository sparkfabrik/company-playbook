import fastify from "fastify";
import cors from '@fastify/cors';
import { answer, sources } from "./lib/qna";
// import { loadDocuments } from "./lib/loader";

// Create Fastify server instance
const server = fastify();

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

// GET round for user query
server.get<{ Querystring: { question: string } }>('/ask', { schema: getSchema }, async (request, reply) => {
  const { question } = request.query;
  const response = {
    'answer': await answer(question),
    'sources': await sources(question),
  }
  reply.send(response);
});

// // PUT webhook to trigger documents reloading
// server.put('/api/load-documents', async (request, reply) => {
//     try {
//       await loadDocuments();
//       reply.send({ status: 'success', message: 'Documents loaded successfully' });
//     } catch (error) {
//       console.error(error);
//       reply.status(500).send({ status: 'error', message: 'Failed to load documents' });
//     }
//   });

  
// Start server
const start = async () => {
  await server.register(cors, { 
    origin: '*'
  });
  try {
    await server.listen({ port: 3000 });
    console.log('Server listening on http://localhost:3000');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};


start();
