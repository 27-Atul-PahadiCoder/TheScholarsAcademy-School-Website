import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./env";
import { logger } from "../utils/logger";
let pinecone = null;
let isReady = false;
export const initVectorClient = async () => {
    if (isReady && pinecone)
        return pinecone.Index(env.PINECONE_INDEX);
    pinecone = new Pinecone({ apiKey: env.PINECONE_API_KEY });
    const index = pinecone.Index(env.PINECONE_INDEX);
    await index.describeIndexStats();
    isReady = true;
    logger.info("Connected to vector index");
    return index;
};
export const vectorOperations = {
    upsert: async (vectors) => {
        if (!pinecone) {
            await initVectorClient();
        }
        const index = pinecone.Index(env.PINECONE_INDEX);
        await index.upsert(vectors, { namespace: env.PINECONE_NAMESPACE });
    },
    query: async (vector, topK = 5) => {
        if (!pinecone) {
            await initVectorClient();
        }
        const index = pinecone.Index(env.PINECONE_INDEX);
        return index.query({
            vector,
            topK,
            namespace: env.PINECONE_NAMESPACE,
            includeMetadata: true,
        });
    },
};
//# sourceMappingURL=vectorClient.js.map