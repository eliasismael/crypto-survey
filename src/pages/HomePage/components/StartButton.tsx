// Hooks
import { useHomePage } from "../hooks/useHomePage";
// Library
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const StartButton: React.FC = () => {
    const { currentAccount, currentNetwork } = useHomePage();
    return (
        <Link
            to={
                currentAccount && currentNetwork === "goerli" ? "/survey" : "#"
            }>
            <Button
                sx={{ margin: "6px" }}
                variant="outlined"
                color="primary"
                disabled={
                    currentAccount && currentNetwork === "goerli" ? false : true
                }>
                Start Survey
            </Button>
        </Link>
    );
};
