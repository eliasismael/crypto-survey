// Hooks
import React, { useState, useRef, useEffect } from "react";
import { useSubstractTime } from "../hooks/useSubstractTime";
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
import { questions } from "../../../infrastructure/api/apiConsumer";
// Functions
import { registerAnswerID } from "../../../application/functions/Buttons/registerAnswerID";
import { setAllButtonsToUnpressed } from "../../../application/functions/Buttons/setAllButtonsToUnpressed";
// Types and instances
import { ButtonRefs } from "../../../domain/models/Buttons";
// import { buttons } from "../../../application/functions/Buttons/getInitialStateButtons";
// Type for props
import { IUser } from "../../../domain/models/User";
// Helpers
import { getIndex } from "../../../application/helpers/getIndex";
import { createButtons } from "../../../application/functions/Buttons/createButtons";

import { getButtonsRefs } from "../../../application/functions/Buttons/getButtonsRefs";

interface SurveyFormProps {
  user: IUser;
}

const SurveyForm: React.FC<SurveyFormProps> = (props) => {
  const { user } = props;

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [seeResultsAvailable, setSeeResultsAvaiable] = useState(false);

  const [buttons, setButtons] = useState(() => createButtons(3));

  // To determine which one was pressed
  // const buttonsRefs = useRef<ButtonsRef>({
  //   button1: null,
  //   button2: null,
  //   button3: null,
  // });

  const buttonsRefs = useRef<ButtonRefs>(getButtonsRefs(buttons));

  // useSubstractTime
  const timeLeft = useSubstractTime(
    currentQuestion.lifetimeSeconds,
    1000,
    () => onSubmitHandler(),
    [currentQuestion]
  );

  const handleOptionButtonClick = (
    buttonID: string,
    answerid: string | number
  ) => {
    console.log(buttonID);
    console.log(answerid);
    // To uncheck the other one that can be selected before
    setAllButtonsToUnpressed(setButtons);

    // Mark the button as pressed
    setButtons((prevState) => ({
      ...prevState,
      [buttonID]: {
        ...prevState[buttonID as keyof typeof buttons],
        pressed: true,
      },
    }));
  };

  // When going to the next question
  const onSubmitHandler = (evt?: React.FormEvent<HTMLFormElement>) => {
    /* The event may not exist because responses are sent
         automatically when the time is up if the user doesn't */
    evt?.preventDefault();

    setAllButtonsToUnpressed(setButtons);
    registerAnswerID(user, buttonsRefs);

    const isLastQuestions =
      getIndex(questions, currentQuestion) === questions.length - 1;

    if (isLastQuestions) {
      setSeeResultsAvaiable(true);
    } else {
      const currentIndex = getIndex(questions, currentQuestion);
      const newQuestion = questions[currentIndex + 1];
      setCurrentQuestion(newQuestion);
    }
  };

  useEffect(() => console.log(buttons), []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography color={"white"} sx={{ marginBottom: 4 }}>
        Question {getIndex(questions, currentQuestion) + 1} of{" "}
        {questions.length}
      </Typography>

      {/* IMG */}
      <Card
        sx={{
          mb: "20px",
          width: "70%",
          borderRadius: "20px",
          border: "2px solid #212121",
        }}
      >
        <CardMedia
          sx={{ height: "25vh" }}
          component="img"
          image={currentQuestion.image}
          alt="Image"
        />

        <CardContent>
          <Typography color={"black"} sx={{ textAlign: "center" }}>
            {currentQuestion.text}
          </Typography>
        </CardContent>
      </Card>

      <Typography color={"white"} sx={{ mb: 4 }}>
        Time left: {timeLeft}
      </Typography>

      {/* FORM */}
      <form
        style={{
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
        onSubmit={(evt) => onSubmitHandler(evt)}
      >
        {/* Render buttons*/}
        {currentQuestion.options.map((option, index) => (
          <Button
            key={option.id}
            variant="outlined"
            color={
              buttons[`button${index + 1}`].pressed ? "secondary" : "primary"
            }
            onClick={() =>
              handleOptionButtonClick(`button${index + 1}`, option.id)
            }
            data-answerid={option.id}
            ref={(button) => {
              const buttonId = `button${index + 1}`;
              return (buttonsRefs.current[buttonId] = button);
            }}
          >
            {option.text}
          </Button>
        ))}

        <Button type="submit" disabled={seeResultsAvailable}>
          Continue
        </Button>
      </form>

      {seeResultsAvailable && (
        <Link to={"/results"}>
          <Button>See answers</Button>
        </Link>
      )}
    </Box>
  );
};

export default SurveyForm;
