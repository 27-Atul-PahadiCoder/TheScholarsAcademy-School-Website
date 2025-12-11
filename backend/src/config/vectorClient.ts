import { Pinecone, Vector } from "@pinecone-database/pinecone";
import { env } from "./env";
import { logger } from "../utils/logger";

type VectorPayload = Vector<Record<string, string | number>>;

let pinecone: Pinecone | null = null;
let isReady = false;

export const initVectorClient = async () => {
  if (isReady && pinecone) return pinecone.Index(env.PINECONE_INDEX);

  pinecone = new Pinecone({ apiKey: env.PINECONE_API_KEY });
  const index = pinecone.Index(env.PINECONE_INDEX);
  await index.describeIndexStats();
  isReady = true;
  logger.info("Connected to vector index");
  return index;
};

export const vectorOperations = {
  upsert: async (vectors: VectorPayload[]) => {
    if (!pinecone) {
      await initVectorClient();
    }
    const index = pinecone!.Index(env.PINECONE_INDEX);
    await index.upsert(vectors, { namespace: env.PINECONE_NAMESPACE });
  },
  query: async (vector: number[], topK = 5) => {
    if (!pinecone) {
      await initVectorClient();
    }
    const index = pinecone!.Index(env.PINECONE_INDEX);
    return index.query({
      vector,
      topK,
      namespace: env.PINECONE_NAMESPACE,
      includeMetadata: true,
    });
  },
};
