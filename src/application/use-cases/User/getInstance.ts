import {
    User,
    UserModel,
    GetUserInstanceType,
} from "../../../domain/entities/User";

export const getUserInstance: GetUserInstanceType = (
    currentAccount: string
): UserModel => {
    return new User(currentAccount);
};
