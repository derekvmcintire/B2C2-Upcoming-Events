import { simple } from "simple-fetch-ts";
import { EventSubmission } from "../types";

const url = 'https://b2c2-events-api.vercel.app/api/submitEvent';

export const submitEvent = async (submission: EventSubmission) => {
  const apiKey = import.meta.env.API_SECRET_KEY;
  const response = await simple(url)
    .body<EventSubmission>(submission)
    .headers({"x-api-key": apiKey})
    .post();

    console.log('response is: ', response);
  
  return response.data;
}