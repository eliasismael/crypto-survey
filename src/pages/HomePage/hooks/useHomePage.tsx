// Context
import { useWalletContext } from "../../../infrastructure/connections/wallet/context/walletContext";
// Hooks
import { useState, useEffect } from "react";
// Helpers
import { formatAccount } from "../../../application/helpers/formatAccount";

export const useHomePage = () => {
    const { currentAccount, currentNetwork, init, switchToGoerliNetwork } =
        useWalletContext();

    const [formatedAccount, setFormatedAccount] = useState("");

    useEffect(() => {
        const formatedAccount = formatAccount(currentAccount);
        setFormatedAccount(formatedAccount);
    }, [currentAccount]);

    return {
        currentAccount,
        currentNetwork,
        init,
        switchToGoerliNetwork,
        formatedAccount,
    };
};
