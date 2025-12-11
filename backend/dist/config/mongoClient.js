import mongoose from "mongoose";
import { env } from "./env";
import { logger } from "../utils/logger";
let isConnected = false;
export const connectMongo = async () => {
    if (isConnected)
        return mongoose.connection;
    await mongoose.connect(env.MONGODB_URI);
    isConnected = true;
    logger.info("Connected to Mongo store");
    return mongoose.connection;
};
export const getMongoConnection = () => {
    if (!isConnected) {
        throw new Error("Mongo connection not ready");
    }
    return mongoose.connection;
};
//# sourceMappingURL=mongoClient.js.map