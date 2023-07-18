import axios from "axios";

const surveyApi = axios.create({
    baseURL: "",
});

export const getSurvey = async () => {
    const res = await surveyApi.get(
        "https://api.myjson.online/v1/records/d3a22161-1d31-473e-b098-900bc284066c"
    );
    return res.data;
};
