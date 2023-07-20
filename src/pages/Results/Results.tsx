// Hooks
import { useEffect, useState } from "react";

// Contexts
import { useWalletContext } from "../../infrastructure/contexts/wallet/walletConnectionContext";
import { useQuizContractContext } from "../../infrastructure/contexts/contract/contractContext";

// Library
import { Button, Box, Typography } from "@mui/material";
import { ethers } from "ethers";

// Data from API
import { questions, surveyData } from "../../infrastructure/api/apiConsumer";
import { UserModel } from "../../domain/entities/User";

// Styles
import "../styles/Results.css";

import { submitAnswers } from "../../application/use-cases/contract/submitAnswers";

type PropsType = { user: UserModel };

function Results(props: PropsType): JSX.Element {
    const { currentAccount } = useWalletContext();
    const { contract } = useQuizContractContext();

    const [resultsSubmitted, setResultsSubmitted] = useState(false);
    const [answers, setAnswers] = useState<Array<string>>([]);
    const [answersID, setAnswersID] = useState<Array<number>>([]);

    const handleAnswersSubmit = async () => {
        try {
            const surveyID = surveyData.id;

            // Send answers to the contract
            await submitAnswers(
                contract as ethers.Contract,
                surveyID,
                answersID
            );

            setResultsSubmitted(true);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const answersID: number[] = props.user.seeAnswersID();

        const answersSelected = answersID.map((answerID, index) => {
            const option = questions[index].options.find(
                (option) => option.id === answerID
            );

            return option?.text || "Not answered";
        });

        setAnswersID(answersID);
        setAnswers(answersSelected);
    }, [props.user]);

    return (
        <Box className="Results__main-container">
            {/* Title */}
            <Typography className="Results__title" variant="h4">
                {currentAccount ? "Answers" : "No account found"}
            </Typography>

            {/* Questions and answers */}
            {questions.map((question, i) => (
                // Container
                <Box className="Results__answers-container" key={i}>
                    {/* Question text */}
                    <Typography
                        className="Results__answer-container__question-text"
                        color="primary"
                        variant="h6">
                        {/* Question span */}
                        <Typography
                            className="Results__answer-container__question-span"
                            color="white"
                            variant="h6">
                            Question:
                        </Typography>

                        {question.text}
                    </Typography>

                    <Typography
                        // Answer text
                        className="Results__answer-container__answer-text"
                        variant="body1">
                        {/* Answer span */}
                        <Typography className="Results__answer-container__answer-span">
                            Answer:
                        </Typography>

                        {answers[i]}
                    </Typography>
                </Box>
            ))}

            <Box className="Results__bottom__container">
                {/* Submit Button */}
                <Button
                    className="Results__bottom__button-submit"
                    onClick={handleAnswersSubmit}
                    disabled={resultsSubmitted}>
                    Submit results
                </Button>

                {/* When the answers were submited */}

                {resultsSubmitted && (
                    <Box>
                        <Typography
                            color={"white"}
                            sx={{ textAlign: "center" }}>
                            Answers submited
                        </Typography>

                        <Typography
                            variant="body1"
                            color={"white"}
                            sx={{ textAlign: "center" }}>
                            Congratulations! You won 1 QUIZ Token. Chek your
                            wallet!
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Results;
