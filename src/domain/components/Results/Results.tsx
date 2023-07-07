// Hooks
import { useEffect, useState } from "react";

// Contexts
import { useWalletContext } from "../../../infrastructure/contexts/walletConnectionContext";
import { useQuizContractContext } from "../../../infrastructure/contexts/contractContext";

// Library
import { Button, Box, Typography } from "@mui/material";

// Data from API
import { questions, surveyData } from "../../../infrastructure/api/apiConsumer";

type Props = { user: { seeAnswersID: () => string[] | number[] } };

function Results(props: Props): JSX.Element {
    const { currentAccount } = useWalletContext();
    const { submitAnswers } = useQuizContractContext();

    const [resultsSubmited, setResultsSubmited] = useState(false);
    const [answers, setAnswers] = useState<Array<string>>([]);

    const [answersID, setAnswersID] = useState<Array<number>>([]);

    const handleAnswersSubmit = async () => {
        try {
            const surveyID = surveyData.id;
            await submitAnswers(surveyID, answersID);
            setResultsSubmited(true);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        const strAnswersID = props.user.seeAnswersID();
        const numAnswersID = strAnswersID.map(Number);

        const updatedAnswers = numAnswersID.map((answerID, i) => {
            const option = questions[i].options.find(
                (option) => option.id === answerID
            );

            const answer = option ? option.text : "Not answered";
            return answer;
        });

        setAnswersID(numAnswersID);
        setAnswers(updatedAnswers);
    }, [props.user]);

    return (
        <Box
            sx={{
                backgroundColor: "#333",
                padding: "20px",
                borderRadius: "4px",
            }}>
            {/* Title */}
            <Typography
                color="white"
                variant="h4"
                sx={{ marginBottom: "20px", textAlign: "center" }}>
                {currentAccount ? "Answers" : "No account found"}
            </Typography>

            {/* Questions and answers */}
            {questions.map((question, i) => (
                <Box key={i} sx={{ marginBottom: "20px" }}>
                    <Typography color="cyan" variant="h6">
                        Question: {question.text}
                    </Typography>

                    <Typography color="white" variant="body1">
                        Answer: {answers[i]}
                    </Typography>
                </Box>
            ))}

            <Box sx={{ display: "grid", placeItems: "center" }}>
                {/* Submit Button */}

                <Button
                    sx={{ marginTop: "20px", textAlign: "center" }}
                    onClick={handleAnswersSubmit}
                    disabled={resultsSubmited}>
                    Submit results
                </Button>

                {/* When the answers were submited */}

                {resultsSubmited && (
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
