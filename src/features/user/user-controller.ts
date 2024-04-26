import crypto, { SHA256 } from "crypto-js";
import { Context } from "koa";
import jwt from "jsonwebtoken";
import logger from "../../../logger";
import { env } from "process";
import { RouterContext } from "koa-router";
import UserService from "./user-model";
import IUser from "../../types/user";

namespace UserController {
  export const signUp = async (ctx: RouterContext) => {
    try {
      let user = ctx.request.body as Partial<IUser>;
      // const secretKey = process.env.SECRET_KEY!;
      // const decryptedBytes = crypto.AES.decrypt(body, secretKey);

      // const decryptedUid = decryptedBytes.toString(crypto.enc.Utf8);

      // const token = jwt.sign(
      //   { id: decryptedUid },
      //   JSON.stringify(SHA256(process.env.ADMIN_TOKEN!).words),
      //   { expiresIn: "1d" }
      // );

      const createdUser = await UserService.createOrGet(user.walletAddress!);

      ctx.body = {
        response: "success",
        data: createdUser,
      };
    } catch (error: any) {
      logger.error({ error, inputs: ctx.request.body });

      ctx.throw(500, error?.message ?? error);
    }
  };

  export const signIn = async (ctx: Context) => {
    try {
      ctx.body = {
        response: "success",
        data: {},
      };
    } catch (error: any) {
      logger.error({ error, inputs: ctx.request.body });
      ctx.throw(500, error?.message ?? error);
    }
  };
}

export default UserController;
