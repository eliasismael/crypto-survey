// Hooks
import { useState, useEffect } from "react";
// Context
import { useWalletContext } from "../../../infrastructure/connections/wallet/context/walletContext";
import { useContractContext } from "../../../infrastructure/connections/contract/hooks/useContractContext";
// Data
import { surveyData } from "../../../infrastructure/connections/api/apiConsumer";
import { questions } from "../../../infrastructure/connections/api/apiConsumer";
// Functions
import { submitAnswers } from "../../../application/functions/contract/submitAnswers";
// Models
import { IUser } from "../../../domain/models/User";

export const useResults = (user: IUser) => {
  // Context
  const { currentAccount } = useWalletContext();
  const { contract } = useContractContext();

  // States
  const [resultsSubmitted, setResultsSubmitted] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answersID, setAnswersID] = useState<number[]>([]);

  // Functions
  const handleAnswersSubmit = async () => {
    try {
      const surveyID = surveyData.id;
      if (!contract) return;

      await submitAnswers({
        contract: contract,
        surveyId: surveyID,
        surveyAnswers: answersID,
      });

      setResultsSubmitted(true);
    } catch (error) {
      alert(error);
    }
  };

  // Get answers selected
  useEffect(() => {
    const answersID: number[] = user.seeAnswersID();
    const answersSelected = answersID.map((answerID, index) => {
      const options = questions[index].options;
      const option = options.find((option) => option.id === answerID);

      return option?.text || "Not answered";
    });

    setAnswersID(answersID);
    setAnswers(answersSelected);
  }, [questions]);

  return { currentAccount, resultsSubmitted, answers, handleAnswersSubmit };
};
