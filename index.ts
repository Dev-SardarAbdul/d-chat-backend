require("dotenv").config();
("use strict");
import koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

import path from "path";
import favicon from "koa-favicon";
import logger from "./logger";
import { connectDB } from "./src/configs/database";
import crons from "./src/configs/cron-jobs";
import { initializeSocket } from "./src/configs/socket";
import BLockchainUtils from "./src/utils/blockchain-utils";
import BlockchainConstants from "./src/constants/blockchain";
import { routers } from "./src/utils/routers";
import TGBotUtils from "./src/utils/tg-bot";

const app = new koa();

app.use(cors());
app.use(bodyParser());
// app.use(refererMiddleware);

const server = app.listen(process.env.PORT || 8080, () =>
  logger.info(`Server has started. http://localhost:${process.env.PORT}`)
);

connectDB();
crons.initializeCronJobs();
initializeSocket(server);
// TGBotUtils.runTg();

app.use(favicon(__dirname + "/public/favicon.ico"));

BLockchainUtils.loadBlockchain(BlockchainConstants.RPC[5], 5);

routers.forEach((router) => {
  app.use(router.routes()).use(router.allowedMethods());
});
