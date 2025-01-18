import { simple } from "simple-fetch-ts";
import { formatDateToString } from "../utils/dates";
import { FetchEventsWithRegisteredRidersResponse } from "../types";

const url = 'https://www.crossresults.com/api/b2c2lookup.php';

export const fetchEventsWithRegisteredRiders = async (eventType: string, after: Date = new Date()): Promise<any> => {
  const afterAsString = formatDateToString(after);

  const response = await simple(url)
    .params({ eventType, after: afterAsString })
    .fetch<FetchEventsWithRegisteredRidersResponse>();

  return response.data;
}