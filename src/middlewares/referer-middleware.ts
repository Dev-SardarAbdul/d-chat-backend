import { Next } from "koa";
import { RouterContext } from "koa-router";
import env from './../constants/environment';

const refererMiddleware = async (ctx: RouterContext, next: Next) => {
  const referer = ctx.headers.referer;
  if (!referer || !env.WHITE_LIST.includes(referer)) {
    ctx.status = 403; // Forbidden
    ctx.body = 'You will get banned';
    return;
  }

  await next();
};

export default refererMiddleware;
