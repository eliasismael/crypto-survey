import { Typography } from "@mui/material";
import { useHomePage } from "../hooks/useHomePage";

export const FormatedAccount: React.FC = () => {
    const { formatedAccount } = useHomePage();

    return (
        <Typography
            variant="body1"
            color={"white"}
            sx={{
                marginTop: "20px",
            }}>
            Account: {formatedAccount}
        </Typography>
    );
};
