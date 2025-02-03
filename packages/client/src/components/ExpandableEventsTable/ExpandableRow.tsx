import { Collapse, Progress, Table } from "@mantine/core";
import React, { useMemo } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import EventCard from "../Event/Card";
import { getHypeColor, getHypeLevel } from "../../utils/hype";
import { formatEventDate, formatShortDate } from "../../utils/dates";
import {
  EventDiscipline,
  EventType,
  FetchRegistrationsResponse,
} from "../../types";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";
import EventLabel from "../Event/EventLabel";
import { getLabelConfig } from "../../utils/label";

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
  const {
    city,
    date,
    eventId,
    eventType,
    interestedRiders,
    committedRiders,
    name,
    state,
  } = event;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const registeredNames = useMemo(
    () =>
      registrations ? getEntriesByEventId(registrations, Number(eventId)) : [],
    [registrations, eventId],
  );
  const formattedDate = useMemo(() => formatEventDate(date), [date]);

  const [weekday, dateString] = formattedDate.split(", ");
  const eventDate = isMobile
    ? formatShortDate(new Date(date))
    : `${weekday} ${dateString}`;

  const numberOfIntRiders = interestedRiders?.length || 0;
  const numberOfCommittedRiders = committedRiders?.length || 0;

  const hypeLevel = getHypeLevel(
    registeredNames.length,
    numberOfIntRiders,
    numberOfCommittedRiders,
  );

  const chevronSize = isMobile ? 8 : 16;

  const labelConfig = getLabelConfig(eventType);

  return (
    <React.Fragment key={eventId}>
      <Table.Tr
        style={{ cursor: "pointer" }}
        onClick={() => toggleRow(eventId)}
      >
        <Table.Td ta="left">
          {expandedRows.has(eventId) ? (
            <FaChevronDown size={chevronSize} />
          ) : (
            <FaChevronRight size={chevronSize} />
          )}
        </Table.Td>
        <Table.Td ta="left" fw="600">
          {eventDate}
        </Table.Td>
        <Table.Td ta="left">{name}</Table.Td>
        {!isMobile && <Table.Td ta="left">{`${city}, ${state}`}</Table.Td>}
        {!isMobile && (
          <Table.Td ta="left">
            <EventLabel xs labelConfig={labelConfig} />
          </Table.Td>
        )}
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
        <Table.Td colSpan={6} p={0}>
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
