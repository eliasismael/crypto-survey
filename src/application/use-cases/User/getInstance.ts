import { User, IUser } from "../../../domain/models/User";

export const getUserInstance = (currentAccount: string): IUser => {
    return new User(currentAccount);
};
