import React, { useState, createContext, useEffect, useContext } from "react";
import { ethers } from "ethers";

interface ContextType {
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
    currentAccount: string;
    setCurrentAccount: React.Dispatch<React.SetStateAction<string>>;
    accountBalance: string;
    setAccountBalance: React.Dispatch<React.SetStateAction<string>>;
    currentNetwork: string;
    setCurrentNetwork: React.Dispatch<React.SetStateAction<string>>;
    btnConnectionText: string;
    setBtnConnectionText: React.Dispatch<React.SetStateAction<string>>;
    init: () => Promise<void>;
    switchToGoerliNetwork: () => Promise<void>;
}

const WalletContext = createContext<ContextType | undefined>(undefined);

function WalletConnectionProvider({ children }: { children: React.ReactNode }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [currentAccount, setCurrentAccount] = useState<string>("");
    const [accountBalance, setAccountBalance] = useState<string>("");
    const [currentNetwork, setCurrentNetwork] = useState<string>("");
    const [btnConnectionText, setBtnConnectionText] =
        useState("Connect Wallet");

    const init = async () => {
        if (window.ethereum) {
            try {
                const accountResult = await getAccount();
                // Esto s para decirle a typescript que no continue si accountResult no es un string
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
                setErrorMessage(`Cant connect to Metamask: ${error}`);
                console.log(`Cant connect to Metamask: ${error}`);
            }
        } else {
            setErrorMessage("Need to install MetaMask");
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
            setErrorMessage(error.message);
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
            setErrorMessage(error.message);
        }
    };

    const getCurrentNetwork = async (): Promise<string | undefined> => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const currentNetwork = await provider.getNetwork();
            const currentNetworkName = currentNetwork.name;
            return currentNetworkName;
        } catch (error: any) {
            console.log(error);
        }
    };

    const switchToGoerliNetwork = async () => {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x5" }],
            });
        } catch (error) {
            console.log("No se pudo cambiar a goerli: ", error);
        }

        init();
    };

    const accountsChangedHandler = () => {
        init();
    };

    const chainChangedHandler = () => {
        window.location.reload();
    };

    // Estar atento a los cambios de red o de address
    useEffect(() => {
        // Connect automaticaly when is was alredy connectly manualed
        window.ethereum.on("accountsChanged", accountsChangedHandler);
        window.ethereum.on("chainChanged", chainChangedHandler);
    }, []);

    return (
        <WalletContext.Provider
            value={{
                errorMessage,
                setErrorMessage,
                currentAccount,
                setCurrentAccount,
                accountBalance,
                setAccountBalance,
                currentNetwork,
                setCurrentNetwork,
                btnConnectionText,
                setBtnConnectionText,
                // connectWalletHandler,
                init,
                switchToGoerliNetwork,
            }}>
            {children}
        </WalletContext.Provider>
    );
}

const useWalletContext = () => {
    const context = useContext(WalletContext);

    if (!context) {
        throw new Error(
            "useWalletContext must be used within a ContextProvider "
        );
    }

    return context;
};

export { WalletContext, WalletConnectionProvider, useWalletContext };
