import { Button } from "@mui/material";
import { useHomePage } from "../hooks/useHomePage";

export const SwitchToGoerliButton: React.FC = () => {
    const { switchToGoerliNetwork } = useHomePage();

    return (
        <Button
            sx={{ backgroundColor: "#212121" }}
            variant="outlined"
            color="primary"
            onClick={switchToGoerliNetwork}>
            Switch to Goerli network
        </Button>
    );
};
