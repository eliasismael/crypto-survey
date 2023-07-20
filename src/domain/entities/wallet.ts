export interface WalletContextModel {
    currentAccount: string;
    setCurrentAccount: React.Dispatch<React.SetStateAction<string>>;
    accountBalance: string;
    setAccountBalance: React.Dispatch<React.SetStateAction<string>>;
    currentNetwork: string;
    setCurrentNetwork: React.Dispatch<React.SetStateAction<string>>;
    init: () => Promise<void>;
    switchToGoerliNetwork: () => Promise<void>;
}
