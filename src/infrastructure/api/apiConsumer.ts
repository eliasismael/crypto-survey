import { getSurvey } from "./surveyApi";
import { SurveyData, Question } from "./types";

export const survey = await getSurvey();
export const surveyData: SurveyData = survey.data.survey;

export const questions: Question[] = surveyData.questions;
