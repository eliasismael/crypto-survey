import axios from "axios";

const surveyApi = axios.create({
    baseURL: "http://localhost:3000/survey",
});

export const getSurvey = async () => {
    const res = await surveyApi.get("/");
    return res.data;
};
