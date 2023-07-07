import React, { useState, useEffect, createContext, useContext } from "react";
import { ethers } from "ethers";

import {
    quizContractAddress,
    quizContractAbi,
} from "../contractUtils/contractUtils";

// To use the funcion submit whitout errors
type ContractType<T> = T & {
    [key: string]: (...args: any[]) => Promise<any>;
};

const QuizContractContext = createContext<
    | {
          quizContract: ContractType<{
              submit: (
                  surveyId: number,
                  surveyAnswers: number[]
              ) => Promise<void>;
          }>;

          instanceContract: () => Promise<void>;

          submitAnswers: (
              surveyId: number,
              surveyAnswers: number[]
          ) => Promise<void>;
      }
    | undefined
>(undefined);

function QuizContractContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [quizContract, setQuizContract] = useState<ContractType<{
        submit: (surveyId: number, surveyAnswers: number[]) => Promise<void>;
    }> | null>(null);

    const instanceContract = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const quizContract: any = new ethers.Contract(
            quizContractAddress,
            quizContractAbi,
            signer
        );

        setQuizContract(quizContract);
        // quizContract = quizContractInstance;
    };

    const submitAnswers = async (
        surveyId: number,
        surveyAnswers: number[]
    ): Promise<void> => {
        if (!quizContract) return;

        //To include the submit function in the type of the contract
        const contractWithSubmitFunction = quizContract as ContractType<{
            submit: (
                surveyId: number,
                surveyAnswers: number[]
            ) => Promise<void>;
        }>;

        // To avoid conflicts with how the numbers are sent and how the contract receives them
        const surveyAnswersToUint = surveyAnswers.map((num) => {
            const numToUint = num === -1 ? 0 : num;
            return numToUint;
        });

        await contractWithSubmitFunction.submit(surveyId, surveyAnswersToUint);
    };

    useEffect(() => {
        instanceContract();
    }, []);

    // if (quizContract) {
    return (
        <QuizContractContext.Provider
            value={{
                quizContract,
                instanceContract,
                submitAnswers,
            }}>
            {children}
        </QuizContractContext.Provider>
    );
    // }
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
