
import swaggerUi
from "swagger-ui-express";
import resourcesRoutes
from "./routes/resources.routes";
import { swaggerSpec }
from "./swagger";
import express from "express";
import cors from "cors";
import usersRoutes
from "./routes/users.routes";
import { loggerMiddleware }
from "./middleware/logger.middleware";

import { errorHandler }
from "./middleware/error.middleware";
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

app.use(errorHandler);
app.listen(3000, () => {

  console.log(
    "Server started"
  );
});
