// Hooks
import { useSurveyForm } from "../hooks/useSurveyForm";
import { useSubstractTime } from "../hooks/useSubstractTime";
// UI
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
// Router
import { Link } from "react-router-dom";
// Data from API
import { questions } from "../../../infrastructure/api/apiConsumer";
// Models
import { IUser } from "../../../domain/models/User";
// Components
import { OptionButton } from "../components/OptionButton";

interface SurveyFormProps {
  user: IUser;
}

const SurveyForm: React.FC<SurveyFormProps> = (props) => {
  const {
    currentQuestion,
    seeResultsAvailable,
    buttons,
    buttonRefs,
    onSelectOptionHandler,
    onSubmitHandler,
  } = useSurveyForm(props.user);

  const timeLeft = useSubstractTime(
    currentQuestion.lifetimeSeconds,
    1000,
    () => onSubmitHandler(),
    [currentQuestion]
  );

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
        Question {questions.indexOf(currentQuestion) + 1} of {questions.length}
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
        {currentQuestion.options.map((option, index) => {
          const currentButton = `button${index + 1}`;

          return (
            <OptionButton
              key={option.id}
              content={option.text}
              color={buttons[currentButton].pressed ? "secondary" : "primary"}
              onClickHandler={() => onSelectOptionHandler(currentButton)}
              dataAnswerId={option.id}
              buttonRef={(button) =>
                (buttonRefs.current[currentButton] = button)
              }
            />
          );
        })}

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
