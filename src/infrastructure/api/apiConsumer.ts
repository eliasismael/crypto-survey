import { getSurvey } from "./surveyApi";
import { SurveyData, Question } from "./types";

export const survey = await getSurvey();
export const surveyData: SurveyData = survey.data.survey;

console.log("surveyDaya", surveyData);

export const questions: Question[] = survey.data.survey.questions;
