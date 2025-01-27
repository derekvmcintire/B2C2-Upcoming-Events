import { Collapse, Progress, Table } from "@mantine/core";
import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import EventCard from "../EventCard";
import { getHypeColor, getHypeLevel } from "../../utils/hype";
import { formatEventDate } from "../../utils/dates";
import {
  EventDiscipline,
  EventType,
  FetchRegistrationsResponse,
} from "../../types";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";

interface ExpandableRowProps {
  event: EventType;
  toggleRow: (id: string) => void;
  expandedRows: Set<string>;
  registrations: FetchRegistrationsResponse | undefined;
  requestDataCallback: (eventType: EventDiscipline) => void;
}

/**
 * Renders an expandable row for an event in the table.
 *
 * @param event - The event object.
 * @param toggleRow - Function to toggle the expanded state of the row.
 * @param expandedRows - Set of expanded row IDs.
 * @param registrations - Array of registrations for the event.
 * @param requestDataCallback - Callback function to request data.
 * @returns The JSX element representing the expandable row.
 */
export default function ExpandableRow({
  event,
  toggleRow,
  expandedRows,
  registrations,
  requestDataCallback,
}: ExpandableRowProps) {
  const { city, date, eventId, interestedRiders, name, state } = event;
  const formattedDate = formatEventDate(date);
  const [weekday, dateString] = formattedDate.split(", ");

  const registeredNames = registrations
    ? getEntriesByEventId(registrations, Number(eventId))
    : [];

  const numberOfIntRiders = interestedRiders?.length || 0;
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const location = isMobile ? state : `${city}, ${state}`;
  const hypeLevel = getHypeLevel(registeredNames.length, numberOfIntRiders);

  return (
    <React.Fragment key={eventId}>
      <Table.Tr
        style={{ cursor: "pointer" }}
        onClick={() => toggleRow(eventId)}
      >
        <Table.Td ta="left">
          {expandedRows.has(eventId) ? (
            <FaChevronDown size={16} />
          ) : (
            <FaChevronRight size={16} />
          )}
        </Table.Td>
        <Table.Td ta="left" fw="600">
          {`${weekday} ${dateString}`}
        </Table.Td>
        <Table.Td ta="left">{name}</Table.Td>
        <Table.Td ta="left">{location}</Table.Td>
        <Table.Td ta="left">
          <Progress
            radius="xs"
            size="md"
            value={hypeLevel}
            color={getHypeColor(hypeLevel)}
          />
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td colSpan={5} p={0}>
          <Collapse in={expandedRows.has(eventId)}>
            <EventCard
              key={event.eventId}
              event={event}
              registrations={registrations}
              requestDataCallback={requestDataCallback}
            />
          </Collapse>
        </Table.Td>
      </Table.Tr>
    </React.Fragment>
  );
}
