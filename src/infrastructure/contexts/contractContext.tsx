import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

import {
    quizContractAddress,
    quizContractAbi,
} from "../contractUtils/contractUtils";

type QuizContractType = {
    quizContract: ethers.Contract | undefined;
    instanceContract: () => Promise<void>;
    submitAnswers: SubmitFunction;
};

type SubmitFunction = (
    surveyId: number,
    surveyAnswers: number[]
) => Promise<void>;

const QuizContractContext = createContext<QuizContractType | undefined>(
    undefined
);

function QuizContractContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [quizContract, setQuizContract] = useState<
        ethers.Contract | undefined
    >(undefined);

    const instanceContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const quizContract = new ethers.Contract(
            quizContractAddress,
            quizContractAbi,
            signer
        );

        setQuizContract(quizContract);
    };

    const submitAnswers: SubmitFunction = async (
        surveyId,
        surveyAnswers
    ): Promise<void> => {
        if (!quizContract) return;

        //To include the submit function in the type of the contract
        const contractWithSubmitFunction = quizContract as ethers.Contract & {
            submit: SubmitFunction;
        };

        // To avoid conflicts with how the numbers are sent and how the contract receives them
        const surveyAnswersToUint = surveyAnswers.map((num) =>
            num === -1 ? 0 : num
        );

        await contractWithSubmitFunction.submit(surveyId, surveyAnswersToUint);
    };

    useEffect(() => {
        instanceContract();
    }, []);

    const value: QuizContractType = {
        quizContract,
        instanceContract,
        submitAnswers,
    };

    return (
        <QuizContractContext.Provider value={value}>
            {children}
        </QuizContractContext.Provider>
    );
}

const useQuizContractContext = () => {
    const context = useContext(QuizContractContext);

    if (!context) {
        throw new Error(
            "useQuizContractContext must be used within a ContextProvider "
        );
    }

    return context;
};

export {
    QuizContractContext,
    QuizContractContextProvider,
    useQuizContractContext,
};
