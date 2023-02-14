import express from "express";
import * as bodyParser from "body-parser";

import BuildResourceRouter from "./routers/ResourcesRouter";


const app: express.Application = express();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });

const init = async (): Promise<void> => {
  app.use(bodyParser.json());
  app.use(BuildResourceRouter());
}

init();