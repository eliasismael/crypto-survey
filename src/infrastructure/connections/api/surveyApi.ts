import axios from "axios";
import { DB_LOCATION } from "../../database/location";

export const getSurvey = async () => {
  const response = await axios.get(DB_LOCATION);
  return response.data;
};
