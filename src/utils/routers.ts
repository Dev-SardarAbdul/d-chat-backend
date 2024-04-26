import { userRouter } from "../features/user/user-routes";
import Router, { RouterContext } from "koa-router";

// Add the routers of all features into this array

const rootRouter = new Router();

rootRouter.get("/", (ctx: RouterContext) => (ctx.status = 200));

export const routers = [rootRouter, userRouter];
