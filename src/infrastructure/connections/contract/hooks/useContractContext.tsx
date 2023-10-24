import { IContractContext } from "../../../../domain/models/contract";
import { ContractContext } from "../context/contractContext";

import { useContext } from "react";

export const useContractContext = (): IContractContext => {
    const context = useContext(ContractContext);

    if (!context) {
        throw new Error(
            "useContractContext must be used within a ContextProvider"
        );
    }

    return context;
};
