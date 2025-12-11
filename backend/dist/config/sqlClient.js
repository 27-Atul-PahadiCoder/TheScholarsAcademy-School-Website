import knex from "knex";
import { env } from "./env";
import { logger } from "../utils/logger";
let client = null;
export const connectSql = async () => {
    if (client)
        return client;
    client = knex({
        client: "pg",
        connection: env.SQL_DATABASE_URL,
        pool: { min: 0, max: 10 },
    });
    await client.raw("select 1");
    logger.info("Connected to SQL store");
    return client;
};
export const getSqlClient = () => {
    if (!client) {
        throw new Error("SQL client is not initialized");
    }
    return client;
};
//# sourceMappingURL=sqlClient.js.map