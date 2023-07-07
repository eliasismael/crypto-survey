import { getSurvey } from "./surveyApi";
import { SurveyData, Question } from "./types";

export const surveyData: SurveyData = await getSurvey();

export const questions: Question[] = surveyData.questions;
