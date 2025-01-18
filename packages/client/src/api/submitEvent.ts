import { simple } from "simple-fetch-ts";
import { EventSubmission } from "../types";

const url = 'https://b2c2-events-api.vercel.app/api/submitEvent';

export const submitEvent = async (submission: EventSubmission) => {
  const response = await simple(url)
    .body<EventSubmission>(submission)
    .post();

    console.log('response is: ', response);
  
  return response.data;
}