export interface SurveyData {
    id: number;
    title: string;
    image: string;
    questions: Question[];
}

export interface Question {
    text: string;
    image: string;
    lifetimeSeconds: number;
    options: Option[];
}

export interface Option {
    text: string;
    id: number;
}
