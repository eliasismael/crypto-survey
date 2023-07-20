import { SubmitFunction } from "../../../domain/entities/contract";

export const submitAnswers: SubmitFunction = async (
    contract,
    surveyId,
    surveyAnswers
): Promise<void> => {
    if (!contract) return;

    // To avoid conflicts with how the numbers are sent and how the contract receives them
    const answersToUint = surveyAnswers.map((num) => (num === -1 ? 0 : num));

    await contract.submit(surveyId, answersToUint);
};
