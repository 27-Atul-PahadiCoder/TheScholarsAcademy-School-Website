import { app } from "./app";
import { loadEnv, env } from "./config/env";
// import { connectSql } from "./config/sqlClient";
import connectMongo from "./config/mongoClient";
// import { initVectorClient } from "./config/vectorClient";
import { initMediaController } from "./modules/media/media.controller";
import { initAdminController } from "./modules/admin/admin.controller";
import { logger } from "./utils/logger";

loadEnv();

const port = env.PORT;

async function bootstrap() {
  // await Promise.all([connectSql(), connectMongo(), initVectorClient()]);
  await connectMongo();

  initMediaController();
  initAdminController();

  app.listen(port, () => {
    logger.info({ port }, "Admin API listening");
  });
}

bootstrap().catch((error) => {
  logger.error({ error }, "Failed to start backend");
  process.exit(1);
});
