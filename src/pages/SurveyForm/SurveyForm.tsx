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

import { Link } from "react-router-dom";

// Data from API
import { questions } from "../../infrastructure/api/apiConsumer";

// Functions
import { registerAnswerID } from "../../application/use-cases/Buttons/registerAnswerID";
import { setAllButtonsToUnpressed } from "../../application/use-cases/Buttons/setAllButtonsToUnpressed";

// Types and instances
import { ButtonsState, ButtonsRef } from "../../domain/entities/Buttons";
import { buttons } from "../../application/use-cases/Buttons/getInitialStateButtons";

// Type for props
import { UserModel } from "../../domain/entities/User";
type Props = { user: UserModel };

// Styles
import "../styles/SurveyForm.css";

function SurveyForm(props: Props): JSX.Element {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isIntervalActive, setIsIntervalActive] = useState(true);
    const [seeResultsAvailable, setSeeResultsAvaiable] = useState(false);

    // Button state (pressed and what response it contains)
    const [buttonsState, setButtonsState] = useState<ButtonsState>(buttons);

    // To determine which one was pressed
    const buttonsRefs = useRef<ButtonsRef>({
        button1: null,
        button2: null,
        button3: null,
    });

    const handleOptionButtonClick = (buttonID: string) => {
        // To uncheck the other one that can be selected before
        setAllButtonsToUnpressed(setButtonsState);

        // Mark the button as pressed
        setButtonsState((prevState) => ({
            ...prevState,
            [buttonID]: {
                ...prevState[buttonID as keyof typeof buttonsState],
                pressed: true,
            },
        }));
    };

    // When going to the next question
    const onSubmit = (evt?: React.FormEvent<HTMLFormElement>): void => {
        evt?.preventDefault();
        /* The event may not exist because responses are sent
         automatically when the time is up if the user doesn't */

        setAllButtonsToUnpressed(setButtonsState);

        registerAnswerID(props.user, buttonsRefs);

        const isLastQuestions: boolean =
            currentQuestionIndex === questions.length - 1;

        if (isLastQuestions) {
            setIsIntervalActive(false);
            setSeeResultsAvaiable(true);
        } else {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
    };

    // Subtract time
    useEffect(() => {
        let interval: NodeJS.Timer | null = null;
        const SECOND_IN_MILISECONDS = 1000;

        if (isIntervalActive) {
            setTimeLeft(questions[currentQuestionIndex].lifetimeSeconds);

            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 0) {
                        /* If the user did not submit the answer to the 
                        current question submit it when the time reaches 0 */
                        onSubmit();
                    }

                    const newTime = prevTime - 1 >= 0 ? prevTime - 1 : 0;
                    return newTime;
                });
            }, SECOND_IN_MILISECONDS);
        } else {
            setTimeLeft(0);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [currentQuestionIndex, isIntervalActive]);

    return (
        <Box className="SurveyForm__main-container">
            <Typography color={"white"} sx={{ marginBottom: 4 }}>
                Question {currentQuestionIndex + 1} of {questions.length}
            </Typography>

            {/* IMG */}
            <Card className="SurveyForm__card">
                <CardMedia
                    sx={{ height: "25vh" }}
                    component="img"
                    image={questions[currentQuestionIndex].image}
                    alt="Image"
                />

                <CardContent>
                    <Typography color={"black"} sx={{ textAlign: "center" }}>
                        {questions[currentQuestionIndex].text}
                    </Typography>
                </CardContent>
            </Card>

            <Typography color={"white"} sx={{ mb: 4 }}>
                Time left: {timeLeft}
            </Typography>

            {/* FORM */}
            <form
                className="SurveyForm__form"
                onSubmit={(evt) => onSubmit(evt)}>
                {/* Render buttons*/}
                {questions[currentQuestionIndex].options.map(
                    (option, index) => (
                        <Button
                            key={index}
                            variant="outlined"
                            color={
                                buttonsState[`button${index + 1}`].pressed
                                    ? "secondary"
                                    : "primary"
                            }
                            onClick={() =>
                                handleOptionButtonClick(`button${index + 1}`)
                            }
                            data-answerid={option.id}
                            ref={(button) =>
                                (buttonsRefs.current[
                                    `button${index + 1}` as keyof ButtonsRef
                                ] = button)
                            }>
                            {option.text}
                        </Button>
                    )
                )}

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
