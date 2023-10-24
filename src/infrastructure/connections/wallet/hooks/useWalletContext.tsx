import { useContext } from "react";
import { WalletContext } from "../context/walletContext";

import { IWalletContext } from "../../../../domain/models/wallet";

export const useWalletContext = (): IWalletContext => {
    const context = useContext(WalletContext);

    if (!context) {
        throw new Error(
            "useWalletContext must be used within a ContextProvider "
        );
    }

    return context;
};
