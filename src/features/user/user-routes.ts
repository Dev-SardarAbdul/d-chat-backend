import UserController from "./user-controller";
import koaRouter from "koa-router";

export const userRouter = new koaRouter();

userRouter.post("/sign-up", UserController.signUp);
