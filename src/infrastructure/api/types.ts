export type SurveyData = {
    id: number;
    title: string;
    image: string;
    questions: Question[];
};

export type Question = {
    text: string;
    image: string;
    lifetimeSeconds: number;
    options: Option[];
};

export type Option = {
    text: string;
    id: number;
};
