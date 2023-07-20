import axios from "axios";
import { dbLocation } from "../db/location";

export const getSurvey = async () => {
    const res = await axios.get(dbLocation);
    return res.data;
};
