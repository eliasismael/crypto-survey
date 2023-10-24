import { Question } from "../../../infrastructure/api/types";
import { Box, Typography } from "@mui/material";

interface AnswerContainerProps {
    key: string;
    question: Question;
    answers: string[];
    index: number;
}

export const AnswerContainer: React.FC<AnswerContainerProps> = (props) => {
    const { key, question, answers, index } = props;

    return (
        <Box sx={{ marginBottom: "20px" }} key={key}>
            {/* QUESTION */}
            <Typography
                sx={{ textShadow: "-2px 2px 2px black" }}
                color="primary"
                variant="h6">
                {/* span */}
                <Typography
                    sx={{ fontWeight: "400", letterSpacing: "2px" }}
                    color="white"
                    variant="h6">
                    Question:
                </Typography>

                {question.text}
            </Typography>

            {/* ANSWER */}
            <Typography
                sx={{ fontWeight: "300" }}
                color={"white"}
                variant="body1">
                <Typography
                    sx={{ display: "inline", marginRight: "8px" }}
                    color={"white"}>
                    Answer:
                </Typography>

                {answers[index]}
            </Typography>
        </Box>
    );
};
