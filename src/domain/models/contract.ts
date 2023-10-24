import { ethers } from "ethers";

export interface IContractContext {
    contract: ethers.Contract | null;
    instanceContract: () => Promise<void>;
}

export interface SubmitFunctionArgs {
    contract: ethers.Contract;
    surveyId: number;
    surveyAnswers: number[];
}

export type SubmitFunction = (args: SubmitFunctionArgs) => Promise<void>;
