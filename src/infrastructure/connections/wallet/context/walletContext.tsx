import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

import { IWalletContext } from "../../../../domain/models/wallet";

interface WalletContextProps {
    children: React.ReactNode;
}

const WalletContext = createContext<IWalletContext | undefined>(undefined);

function WalletContextProvider(props: WalletContextProps) {
    const { children } = props;

    const [currentAccount, setCurrentAccount] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const [currentNetwork, setCurrentNetwork] = useState("");

    const init = async () => {
        if (window.ethereum) {
            try {
                const account = await getAccount();
                if (!account) return;

                const balance = await getAccountBalance(account);
                const network = await getCurrentNetwork();

                setCurrentAccount(account);

                if (balance) setAccountBalance(balance);
                if (network) setCurrentNetwork(network);
            } catch (error) {
                console.error(`Cant connect to Metamask: ${error}`);
            }
        } else {
            console.error("Need to install MetaMask");
        }
    };

    const getAccount = async () => {
        try {
            const accounts: string[] = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const currentAccount = accounts[0].toString();
            return currentAccount;
        } catch (error) {
            console.error(error);
        }
    };

    const getAccountBalance = async (account: string) => {
        try {
            const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [account, "latest"],
            });
            const balanceToEthers = ethers.formatEther(balance);
            return balanceToEthers;
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentNetwork = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const { name } = await provider.getNetwork();
            return name;
        } catch (error) {
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

        return () => {
            window.ethereum.on("accountsChanged", () => {});
            window.ethereum.on("chainChanged", () => {});
        };
    }, []);

    const value = {
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

const useWalletContext = (): IWalletContext => {
    const context = useContext(WalletContext);

    if (!context) {
        throw new Error(
            "useWalletContext must be used within a ContextProvider "
        );
    }

    return context;
};

export {
    WalletContext,
    WalletContextProvider as WalletConnectionProvider,
    useWalletContext,
};
