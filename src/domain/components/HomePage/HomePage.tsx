import { useWalletContext } from "../../../infrastructure/contexts/walletConnectionContext";
import { Button, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { surveyData } from "../../../infrastructure/api/apiConsumer";
import { useState, useEffect } from "react";

function HomePage() {
    const { currentAccount, currentNetwork, init, switchToGoerliNetwork } =
        useWalletContext();

    const [formatedAccount, setFormatedAccount] = useState("");

    const formatAccount = (inputString: string) => {
        const firstFour = inputString.slice(0, 4);
        const lastFour = inputString.slice(-4);

        return `${firstFour}...${lastFour}`;
    };

    useEffect(() => {
        const formatedAccount = formatAccount(currentAccount);
        setFormatedAccount(formatedAccount);
    }, [currentAccount]);

    return (
        <Container
            sx={{
                padding: "16px",
            }}>
            <Grid
                container
                spacing={2}
                flexDirection={"column"}
                alignItems={"center"}>
                <Grid item xs={12}>
                    <Typography
                        variant="h4"
                        component="h1"
                        sx={{
                            marginBottom: 1,
                            color: "#fff",
                            textShadow: "0 0 10px rgb(255,255,255,0.3)",
                        }}>
                        Crypto Survey!
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "white",
                            textShadow: "0 0 8px rgb(255,255,255,0.2)",

                            textAlign: "center",
                        }}>
                        We are interested in knowing your knowledge about the
                        crypto world
                    </Typography>
                    <br />
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#fff",
                            textShadow: "0 0 8px rgb(255,255,255,0.2)",
                            textAlign: "center",
                        }}>
                        You will be rewarded with a QUIZ token, just make sure
                        you are on the goerli network
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    {surveyData && (
                        <img
                            src={surveyData.image}
                            height={200}
                            style={{ borderRadius: "30px" }}
                        />
                    )}
                </Grid>

                <Grid
                    item
                    xs={12}
                    sm={6}
                    style={{ marginTop: "16px", textAlign: "center" }}>
                    <Link
                        to={
                            currentAccount && currentNetwork === "goerli"
                                ? "/survey"
                                : "#"
                        }>
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: "6px",
                                backgroundColor: "#212121",
                            }}
                            disabled={
                                currentAccount && currentNetwork === "goerli"
                                    ? false
                                    : true
                            }>
                            Start Survey
                        </Button>
                    </Link>

                    {!currentAccount && (
                        <Button
                            onClick={init}
                            disabled={currentAccount ? true : false}
                            variant="contained"
                            color="primary"
                            style={{
                                margin: "8px",
                                backgroundColor: "#212121",
                                color: "#fff",
                            }}>
                            Connect Metamask
                        </Button>
                    )}

                    {currentAccount && currentNetwork !== "goerli" ? (
                        <Button
                            variant="contained"
                            color="primary"
                            style={{
                                // marginLeft: "8px",
                                backgroundColor: "#212121",
                                color: "#fff",
                            }}
                            onClick={switchToGoerliNetwork}>
                            Switch to Goerli network
                        </Button>
                    ) : null}

                    <br />
                    <br />

                    <Typography
                        variant="body1"
                        color={"white"}
                        sx={{
                            position: "relative",
                            top: "10%",
                            left: "2%",
                        }}>
                        Account: {formatedAccount}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HomePage;
