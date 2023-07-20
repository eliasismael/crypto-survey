import { ethers } from "ethers";

export interface ContractContextModel {
    contract: ethers.Contract | undefined;
    instanceContract: () => Promise<void>;
}

export type SubmitFunction = (
    contract: ethers.Contract,
    surveyId: number,
    surveyAnswers: number[]
) => Promise<void>;
