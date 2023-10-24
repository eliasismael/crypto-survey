import { SubmitFunction } from "../../../domain/models/contract";

export const submitAnswers: SubmitFunction = async (args) => {
    const { contract, surveyId, surveyAnswers } = args;

    if (!contract) {
        console.error("Can't find the contract to submit the answers");
        return;
    }

    // To avoid conflicts with how the numbers are sent and how the contract receives them
    const answersToUint = surveyAnswers.map((num) => (num === -1 ? 0 : num));
    await contract.submit(surveyId, answersToUint);
};
