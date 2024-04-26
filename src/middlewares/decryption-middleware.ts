import { AES, enc } from "crypto-js";
import { Next } from "koa";
import { RouterContext } from "koa-router";

export const decryptionMiddleware = async (ctx: RouterContext, next: Next) => {

    try {
        const body: any = ctx.request.body;
        const secretKey = process.env.SECRET_KEY!;

        if (!body) throw "Bad request";

        const decryptedBody = AES.decrypt(body!.data, secretKey);

        const decryptedString = decryptedBody.toString(enc.Utf8);

        if (!decryptedString) throw 'Failed to decrypt data';

        const decryptedObj = tryParse(decryptedString) ?? decryptedString;

        ctx.request.body = decryptedObj;

        await next();
    } catch (error: any) {
        ctx.status = 400; // Bad request
        ctx.body = { error: error };
    }
}

function tryParse(jsonString: string) {
    try {
        const parsed = JSON.parse(jsonString);
        return parsed;
    } catch (error) {
        throw "Bad request";
    }
}
