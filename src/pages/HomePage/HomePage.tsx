// Hooks
import { useState, useEffect } from "react";

// Libraries
import { Button, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

// Data
import { surveyData } from "../../infrastructure/api/apiConsumer";
import { useWalletContext } from "../../infrastructure/contexts/wallet/walletConnectionContext";

// Functions
import { formatAccount } from "../../application/helpers/formatAccount";

// Styles
import "../styles/HomePage.css";

function HomePage(): JSX.Element {
    const { currentAccount, currentNetwork, init, switchToGoerliNetwork } =
        useWalletContext();

    const [formatedAccount, setFormatedAccount] = useState("");

    useEffect(() => {
        const formatedAccount = formatAccount(currentAccount);
        setFormatedAccount(formatedAccount);
    }, [currentAccount]);

    return (
        <Container className="HomePage__main-container">
            <Grid
                container
                spacing={2}
                flexDirection={"column"}
                alignItems={"center"}>
                <Grid item xs={12}>
                    {/* TITLE */}
                    <Typography className="HomePage__title" variant="h4">
                        Crypto Survey!
                    </Typography>
                </Grid>

                {/* TEXT */}
                <Grid item xs={12} sm={6}>
                    <Typography className="HomePage__text" variant="body2">
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
                        <img className="HomePage__img" src={surveyData.image} />
                    )}
                </Grid>

                {/* BUTTONS */}

                {/* Start */}
                <Grid className="HomePage__bottom" item xs={12} sm={6}>
                    <Link
                        to={
                            currentAccount && currentNetwork === "goerli"
                                ? "/survey"
                                : "#"
                        }>
                        <Button
                            className="HomePage__bottom__start-button"
                            variant="outlined"
                            color="primary"
                            disabled={
                                currentAccount && currentNetwork === "goerli"
                                    ? false
                                    : true
                            }>
                            Start Survey
                        </Button>
                    </Link>

                    {/* Connect */}
                    {!currentAccount && (
                        <Button
                            className="HomePage__bottom__connect-button"
                            onClick={init}
                            disabled={currentAccount ? true : false}
                            variant="outlined"
                            color="primary">
                            Connect Metamask
                        </Button>
                    )}

                    {/* Switch */}
                    {currentAccount && currentNetwork !== "goerli" ? (
                        <Button
                            className="HomePage__bottom__switch-button"
                            variant="outlined"
                            color="primary"
                            onClick={switchToGoerliNetwork}>
                            Switch to Goerli network
                        </Button>
                    ) : null}

                    {/* Current account */}
                    <Typography
                        variant="body1"
                        color={"white"}
                        sx={{
                            marginTop: "20px",
                        }}>
                        Account: {formatedAccount}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HomePage;
