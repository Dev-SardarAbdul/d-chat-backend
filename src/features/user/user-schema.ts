import env from "../../constants/environment";
import { Schema, model } from "mongoose";
import IUser from "../../types/user";

let userSchema = new Schema<IUser>(
  {
    walletAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model(`${env.PROJECT_NAME}-users`, userSchema);

export default UserModel;
