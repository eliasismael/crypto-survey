import { Button } from "@mui/material";
import { useHomePage } from "../hooks/useHomePage";

export const ConnectButton: React.FC = () => {
    const { init, currentAccount } = useHomePage();

    return (
        <Button
            sx={{ margin: "8px" }}
            onClick={init}
            disabled={currentAccount ? true : false}
            variant="outlined"
            color="primary">
            Connect Metamask
        </Button>
    );
};
