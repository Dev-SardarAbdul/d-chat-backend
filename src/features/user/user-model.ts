import IUser from "../../types/user";
import UserModel from "./user-schema";

namespace UserService {
  export const createOrGet = async (walletAddress: string): Promise<IUser> => {
    try {
      let user = await UserModel.findOne({
        walletAddress: walletAddress.toLowerCase(),
      });

      if (user) return user;

      const createdUser = await UserModel.create({
        walletAddress: walletAddress.toLocaleLowerCase(),
      });
      return createdUser;
    } catch (error: any) {
      if (error?.code === 11000) {
        throw "Trying to add duplicate acconut";
      } else {
        throw error;
      }
    }
  };
}

export default UserService;
