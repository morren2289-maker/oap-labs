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

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    "X-Content-Type-Options",
    "nosniff"
  );

  res.setHeader(
    "X-Frame-Options",
    "DENY"
  );

  res.setHeader(
    "Referrer-Policy",
    "no-referrer"
  );

  next();
});
app.use(loggerMiddleware);
app.use(cors({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500"
    ],
    methods: [
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH"
],
    allowedHeaders: ["Content-Type",
            "x-demo-userid"]
}));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(
  "/api/v1/users",
  usersRoutes
);

app.use(
  "/api/v1/resources",
  resourcesRoutes
);

app.use(
  "/api/v1/reviews",
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