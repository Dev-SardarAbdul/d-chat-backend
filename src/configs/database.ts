import mongoose from "mongoose";
import logger from "../../logger";

require("dotenv").config();

export const connectDB = async () => {
  try {
    const url = process.env.MONGOOSE_URL!;
    const conn = await mongoose.connect(url);
    logger.info(`Mongoose Connected ${conn.connection.host}`);
  } catch (error: any) {
    logger.error(error.message);
    process.exit(1);
  }
};
