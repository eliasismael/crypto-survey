// Hooks
import React, { useState, useEffect, createContext } from "react";

// Library
import { ethers } from "ethers";

// Contract data
import { CONTRACT_ABI } from "../constants/abi";
import { CONTRACT_ADDRESS } from "../constants/address";

// Models
import { IContractContext } from "../../../../domain/models/contract";

interface ContractContextProps {
    children: React.ReactNode;
}

const ContractContext = createContext<IContractContext | undefined>(undefined);

const ContractContextProvider = (props: ContractContextProps) => {
    const { children } = props;

    const [contract, setContract] = useState<ethers.Contract | null>(null);

    const instanceContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );

        setContract(contract);
    };

    useEffect(() => {
        instanceContract();
    }, []);

    const values: IContractContext = {
        contract: contract,
        instanceContract,
    };

    return (
        <ContractContext.Provider value={values}>
            {children}
        </ContractContext.Provider>
    );
};

export { ContractContext, ContractContextProvider };
