export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MONGOOSE_URL: string;
      SECRET_KEY: string;
      ADMIN_TOKEN: string;
      BOT_TOKEN: string;
    }
  }
}
