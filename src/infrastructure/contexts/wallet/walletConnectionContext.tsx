import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

import { WalletContextModel } from "../../../domain/entities/wallet";

const WalletContext = createContext<WalletContextModel | undefined>(undefined);

function WalletConnectionProvider({ children }: { children: React.ReactNode }) {
    const [currentAccount, setCurrentAccount] = useState<string>("");
    const [accountBalance, setAccountBalance] = useState<string>("");
    const [currentNetwork, setCurrentNetwork] = useState<string>("");

    const init = async () => {
        if (window.ethereum) {
            try {
                const accountResult = await getAccount();
                if (!accountResult) return;

                const accountBalanceResult = await getAccountBalance(
                    accountResult
                );
                const networkResult = await getCurrentNetwork();

                setCurrentAccount(accountResult);

                if (accountBalanceResult) {
                    setAccountBalance(accountBalanceResult);
                }

                if (networkResult) {
                    setCurrentNetwork(networkResult);
                }
            } catch (error) {
                console.error(`Cant connect to Metamask: ${error}`);
            }
        } else {
            console.error("Need to install MetaMask");
        }
    };

    const getAccount = async (): Promise<string | undefined> => {
        try {
            const accounts: string[] = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const currentAccount: string = accounts[0].toString();
            return currentAccount;
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const getAccountBalance = async (
        currentAccount: string
    ): Promise<string | undefined> => {
        try {
            const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [currentAccount, "latest"],
            });
            const balanceToEthers = ethers.formatEther(balance);
            return balanceToEthers;
        } catch (error: any) {
            console.error(error.message);
        }
    };

    const getCurrentNetwork = async (): Promise<string | undefined> => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const currentNetwork = await provider.getNetwork();
            const currentNetworkName = currentNetwork.name;
            return currentNetworkName;
        } catch (error: any) {
            console.error(error);
        }
    };

    const switchToGoerliNetwork = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x5" }],
            });
        } catch (error) {
            console.error("Can't switch to goerli: ", error);
        }

        init();
    };

    const accountsChangedHandler = () => init();
    const chainChangedHandler = () => window.location.reload();

    useEffect(() => {
        window.ethereum.on("accountsChanged", accountsChangedHandler);
        window.ethereum.on("chainChanged", chainChangedHandler);
    }, []);

    const value: WalletContextModel = {
        currentAccount,
        setCurrentAccount,
        accountBalance,
        setAccountBalance,
        currentNetwork,
        setCurrentNetwork,
        init,
        switchToGoerliNetwork,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
}

const useWalletContext = (): WalletContextModel => {
    const context = useContext(WalletContext);

    if (!context) {
        throw new Error(
            "useWalletContext must be used within a ContextProvider "
        );
    }

    return context;
};

export { WalletContext, WalletConnectionProvider, useWalletContext };
