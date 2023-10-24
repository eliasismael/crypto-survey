// Libraries
import { Container, Typography, Grid } from "@mui/material";
// Data
import { surveyData } from "../../../infrastructure/api/apiConsumer";

// Styles
import "../styles/HomePage.css";

import { useHomePage } from "../hooks/useHomePage";
import { StartButton } from "../components/StartButton";
import { ConnectButton } from "../components/ConnectButton";
import { SwitchToGoerliButton } from "../components/SwitchToGoerliButton";
import { FormatedAccount } from "../components/FormatedAccount";

const HomePage: React.FC = () => {
    const { currentAccount, currentNetwork } = useHomePage();

    return (
        <Container sx={{ padding: "20px" }}>
            <Grid
                container
                spacing={2}
                flexDirection={"column"}
                alignItems={"center"}>
                {/* TITLE */}
                <Grid item xs={12}>
                    <Typography
                        sx={{
                            marginBottom: "8px",
                            textShadow: "0 0 4px rgb(255, 255, 255, 0.3)",
                        }}
                        color={"white"}
                        variant="h4">
                        Crypto Survey!
                    </Typography>
                </Grid>

                {/* TEXT */}
                <Grid item xs={12} sm={6}>
                    <Typography
                        sx={{
                            textShadow: "0 0 8px rgb(255, 255, 255, 0.2)",
                            textAlign: "center",
                        }}
                        color={"white"}
                        variant="body2">
                        We are interested in knowing your knowledge about the
                        crypto world
                        <br />
                        <br />
                        You will be rewarded with a QUIZ token, just make sure
                        you are on the goerli network
                    </Typography>
                </Grid>

                {/* IMG */}
                <Grid item xs={12} sm={6}>
                    {surveyData && (
                        <img
                            style={{
                                height: "150px",
                                borderRadius: "20px",
                                boxShadow: "0px 2px 6px #fff",
                            }}
                            src={surveyData.image}
                        />
                    )}
                </Grid>

                {/* BUTTONS */}
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        marginTop: "16px",
                        textAlign: "center",
                    }}>
                    {/* Start */}
                    <StartButton />

                    {/* Connect */}
                    {!currentAccount && <ConnectButton />}

                    {/* Switch */}
                    {currentAccount && currentNetwork !== "goerli" && (
                        <SwitchToGoerliButton />
                    )}

                    {/* Current account */}
                    <FormatedAccount />
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
