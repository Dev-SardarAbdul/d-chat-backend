import { Next } from "koa";
import { RouterContext } from "koa-router";
import jwt from 'jsonwebtoken';

export const validateAuthorization = async (
  ctx: RouterContext,
  next: Next,
) => {
  const authHeader = ctx.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ctx.throw(401, 'Unauthorized: Missing or invalid authorization header');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    ctx.state.user = decoded; // Store decoded user data for access in subsequent handlers
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      ctx.throw(401, 'Unauthorized: Invalid or expired token');
    } else {
      ctx.throw(500, 'Internal Server Error'); // Handle unexpected errors
    }
  }

  await next();
};
