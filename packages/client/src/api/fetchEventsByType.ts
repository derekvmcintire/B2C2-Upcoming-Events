import { simple } from "simple-fetch-ts";
import { GetEventsResponse } from "../types";

const url = 'https://b2c2-events-api.vercel.app/api/getEventsByType';

export const fetchEventsByType = async (type: string): Promise<GetEventsResponse> => {
  const apiKey = import.meta.env.API_SECRET_KEY;
  const response = await simple(url)
    .params({type: type})
    .headers({"x-api-key": apiKey})
    .fetch<GetEventsResponse>();

  return response.data;
}