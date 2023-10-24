import { Box, Typography } from "@mui/material";

export const ResultsSubmited: React.FC = () => {
    return (
        <Box>
            <Typography color={"white"} sx={{ textAlign: "center" }}>
                Answers submited
            </Typography>

            <Typography
                variant="body1"
                color={"white"}
                sx={{ textAlign: "center" }}>
                Congratulations! You won 1 QUIZ Token. Chek your wallet!
            </Typography>
        </Box>
    );
};
