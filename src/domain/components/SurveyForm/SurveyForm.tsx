// Hooks
import React, { useState, useEffect, useRef } from "react";
// Library
import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
// Data from API
import { questions } from "../../../infrastructure/api/apiConsumer";

import { Link } from "react-router-dom";

interface ButtonState {
    pressed: boolean;
    answerID: number;
}

interface ButtonsRef {
    button1: null | HTMLButtonElement;
    button2: null | HTMLButtonElement;
    button3: null | HTMLButtonElement;
}

type Props = { user: { addAnswerID: (num: any) => void } };

function SurveyForm(props: Props): JSX.Element {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState(0);

    // Button state (pressed and what response it contains)
    const [buttonsState, setButtonsState] = useState<{
        button1: ButtonState;
        button2: ButtonState;
        button3: ButtonState;
    }>({
        button1: {
            pressed: false,
            answerID: 0,
        },
        button2: {
            pressed: false,
            answerID: 0,
        },
        button3: {
            pressed: false,
            answerID: 0,
        },
    });

    // This is to determine which one was pressed
    const buttonsRef = useRef<ButtonsRef>({
        button1: null,
        button2: null,
        button3: null,
    });

    const [seeResultsAvailable, setSeeResultsAvaiable] = useState(false);

    // FUNCTIONS:

    const handleOptionButtonClick = (
        evt: React.MouseEvent<HTMLButtonElement>,
        buttonID: string
    ) => {
        // To uncheck the other one that can be selected before
        setAllButtonsToUnpressed();

        // Mark the button as pressed
        setButtonsState((prevState) => ({
            ...prevState,
            [buttonID]: {
                ...prevState[buttonID as keyof typeof buttonsState],
                pressed: true,
            },
        }));
    };

    // When passing the question or before pressing another button
    const setAllButtonsToUnpressed = (): void => {
        setButtonsState((prevState) => {
            const buttonsUnpressed = Object.keys(prevState).reduce(
                (acc, buttonKey) => {
                    acc[buttonKey as keyof typeof prevState] = {
                        ...prevState[buttonKey as keyof typeof prevState],
                        pressed: false,
                    };
                    return acc;
                },
                {} as typeof prevState
            );

            return buttonsUnpressed;
        });
    };

    // When going to the next question
    const onSubmit = (evt?: React.FormEvent<HTMLFormElement>): void => {
        // The event may not exist because responses are sent automatically
        // when the time is up if the user doesn't

        evt?.preventDefault();

        setAllButtonsToUnpressed();
        registerAnswerID();

        if (currentQuestionIndex === questions.length - 1) {
            setSeeResultsAvaiable(true);
        } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    const registerAnswerID = (): void => {
        const buttonElements: HTMLButtonElement[] = Object.values(
            buttonsRef.current
        );

        const pressedButton = buttonElements.find((buttonElement) =>
            buttonElement.classList.contains("MuiButton-outlinedSecondary")
        );

        // pressedButton may not exist if responses were sent automatically
        const answerID = pressedButton?.getAttribute("data-answerid");
        const result = answerID || -1;

        props.user.addAnswerID(result);
    };

    // Subtract time
    useEffect(() => {
        if (questions[currentQuestionIndex]) {
            setTimeLeft(questions[currentQuestionIndex].lifetimeSeconds);
        }

        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 0) {
                    // If the user did not submit the answer to the current question, submit it when the time reaches 0
                    onSubmit();
                }

                const newTime = prevTime - 1 >= 0 ? prevTime - 1 : 0;
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentQuestionIndex]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}>
            <Card sx={{ mb: 4, width: "300px" }}>
                <CardMedia
                    component="img"
                    sx={{
                        height: "200px",
                    }}
                    image={questions[currentQuestionIndex].image}
                    alt="Image"
                />
                <CardContent>
                    <Typography color={"black"} sx={{ textAlign: "center" }}>
                        {questions[currentQuestionIndex].text}
                    </Typography>
                </CardContent>
            </Card>

            <Typography
                color={"white"}
                sx={{
                    mb: 4,
                }}>
                Time left: {timeLeft}
            </Typography>

            <form
                onSubmit={(evt) => onSubmit(evt)}
                style={{
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}>
                {/* Button 1 */}
                <Button
                    variant="outlined"
                    color={
                        buttonsState.button1.pressed ? "secondary" : "primary"
                    }
                    onClick={(evt) => handleOptionButtonClick(evt, "button1")}
                    data-answerid={
                        questions[currentQuestionIndex].options[0].id
                    }
                    ref={(button) => (buttonsRef.current.button1 = button)}>
                    {questions[currentQuestionIndex].options[0].text}
                </Button>

                {/* Button 2 */}
                <Button
                    variant="outlined"
                    color={
                        buttonsState.button2.pressed ? "secondary" : "primary"
                    }
                    onClick={(evt) => handleOptionButtonClick(evt, "button2")}
                    data-answerid={
                        questions[currentQuestionIndex].options[1].id
                    }
                    ref={(button) => (buttonsRef.current.button2 = button)}>
                    {questions[currentQuestionIndex].options[1].text}
                </Button>

                {/* Button 3 */}
                <Button
                    variant="outlined"
                    color={
                        buttonsState.button3.pressed ? "secondary" : "primary"
                    }
                    onClick={(evt) => handleOptionButtonClick(evt, "button3")}
                    data-answerid={
                        questions[currentQuestionIndex].options[2].id
                    }
                    ref={(button) => (buttonsRef.current.button3 = button)}>
                    {questions[currentQuestionIndex].options[2].text}
                </Button>

                <Button type="submit" disabled={seeResultsAvailable}>
                    Continue
                </Button>
            </form>

            {seeResultsAvailable ? (
                <Link to={"/results"}>
                    <Button>See answers</Button>
                </Link>
            ) : null}
        </Box>
    );
}

export default SurveyForm;
