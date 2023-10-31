import { IUser } from "./User";
import { StateSetter } from "./customTypes";

export interface IWalletContext {
  user: IUser;
  currentAccount: string;
  setCurrentAccount: StateSetter<string>;
  accountBalance: string;
  setAccountBalance: StateSetter<string>;
  currentNetwork: string;
  setCurrentNetwork: StateSetter<string>;
  init: () => Promise<void>;
  switchToGoerliNetwork: () => Promise<void>;
}
