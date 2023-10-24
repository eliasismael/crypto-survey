import axios from "axios";
import { DB_LOCATION } from "../database/location";
import { SurveyData, Question } from "./types";

export const getSurvey = async () => {
    const response = await axios.get(DB_LOCATION);
    return response.data;
};

// export const survey = await getSurvey();
// export const surveyData: SurveyData = survey.data.survey;

// export const questions: Question[] = surveyData.questions;
