import swaggerUi from "swagger-ui-express";
import express from "express";
import cors from "cors";

import resourcesRoutes from "./routes/resources.routes";
import usersRoutes from "./routes/users.routes";
import reviewsRoutes from "./routes/reviews.routes";

import { swaggerSpec } from "./swagger";
import { loggerMiddleware } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { migrate } from "./db/migrate";
const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(
  "/api/users",
  usersRoutes
);

app.use(
  "/api/resources",
  resourcesRoutes
);

app.use(
  "/api/reviews",
  reviewsRoutes
);

app.use(errorHandler);

async function bootstrap() {
  await migrate();

  app.listen(3000, () => {
    console.log("Server started");
  });
}

bootstrap().catch((error) => {
  console.error("Fatal startup error:", error);
  process.exit(1);
});