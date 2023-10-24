// Library
import { Button, Box, Typography } from "@mui/material";
// Data from API
import { questions } from "../../../infrastructure/api/apiConsumer";
import { IUser } from "../../../domain/models/User";
// Components
import { AnswerContainer } from "../components/AnswerContainer";
import { ResultsSubmited } from "../components/ResultsSubmited";
import { useResults } from "../hooks/useResults";

const Results: React.FC<{ user: IUser }> = (props) => {
    const { user } = props;
    const { currentAccount, resultsSubmitted, answers, handleAnswersSubmit } =
        useResults(user);

    return (
        <Box sx={{ padding: "2em", borderRadius: "4px" }}>
            {/* TITLE*/}
            <Typography
                sx={{
                    marginBottom: "0px",
                    textAlign: "center",
                }}
                color={"white"}
                variant="h4">
                {currentAccount ? "Answers" : "No account found"}
            </Typography>

            {/* QUESTIONS AND ANSWERS */}
            {questions.map((question, index) => (
                <AnswerContainer
                    key={question.text}
                    question={question}
                    answers={answers}
                    index={index}
                />
            ))}

            {/* BOTTOM */}
            <Box sx={{ display: "grid", placeItems: "center" }}>
                <Button
                    sx={{ marginTop: "20px", textAlign: "center" }}
                    onClick={handleAnswersSubmit}
                    disabled={resultsSubmitted}>
                    Submit results
                </Button>

                {resultsSubmitted && <ResultsSubmited />}
            </Box>
        </Box>
    );
};

export default Results;
