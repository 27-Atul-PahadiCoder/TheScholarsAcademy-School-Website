import { app } from "./app.js";
import { env, startupError } from "./config/env.js";
// import { connectSql } from "./config/sqlClient.js";
import connectMongo from "./config/mongoClient.js";
// import { initVectorClient } from "./config/vectorClient.js";
import { initMediaController } from "./modules/media/media.controller.js";
import { initAdminController } from "./modules/admin/admin.controller.js";
import { logger } from "./utils/logger.js";

if (startupError) {
  logger.error({ error: startupError }, "FATAL: Backend failed to start");
  process.exit(1);
}

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

export default app;
