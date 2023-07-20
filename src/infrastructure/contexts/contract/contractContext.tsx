// Hooks
import React, { useState, useEffect, createContext, useContext } from "react";

// Library
import { ethers } from "ethers";

// Contract data
import { contractAddress, contractAbi } from "./contractData";

// Types
import { ContractContextModel } from "../../../domain/entities/contract";

const ContractContext = createContext<ContractContextModel | undefined>(
    undefined
);
// At first it will be undefined, but after the component is rendered the contract will be instanced

function ContractContextProvider({ children }: { children: React.ReactNode }) {
    const [contract, setContract] = useState<ethers.Contract | undefined>(
        undefined
    );

    const instanceContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
        );

        setContract(contract);
    };

    //To instance the contract when the pade is loaded
    useEffect(() => {
        instanceContract();
    }, []);

    // Values to give access to the childs components
    const values: ContractContextModel = {
        contract: contract,
        instanceContract,
    };

    return (
        <ContractContext.Provider value={values}>
            {children}
        </ContractContext.Provider>
    );
}

// Custom Hook to use the values of the contract
const useQuizContractContext = (): ContractContextModel => {
    const context = useContext(ContractContext);

    if (!context) {
        throw new Error(
            "useContractContext must be used within a ContextProvider"
        );
    }

    return context;
};

export { ContractContext, ContractContextProvider, useQuizContractContext };
