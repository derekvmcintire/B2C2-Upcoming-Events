import { simple } from "simple-fetch-ts";
import { GetEventsResponse } from "../types";

const url = 'https://b2c2-events-api.vercel.app/api/getEventsByType'

export const fetchEventsByType = async (type: string): Promise<GetEventsResponse> => {
  const response = await simple(url)
    .params({type: type})
    .fetch<GetEventsResponse>();

  return response.data;
}