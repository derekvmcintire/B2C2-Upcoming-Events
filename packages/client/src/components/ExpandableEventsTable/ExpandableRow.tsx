import { Collapse, Progress, Table } from "@mantine/core";
import React from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import EventCard from "../EventCard";
import { getHypeColor } from "../EventCard/utility";
import { formatEventDate } from "../../utils/dates";
import { EventType } from "../../types";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";

interface ExpandableRowProps {
  event: EventType;
  toggleRow: (id: string) => void;
  expandedRows: any;
  registrations: any;
  requestDataCallback: any;
}

export default function ExpandableRow({
  event,
  toggleRow,
  expandedRows,
  registrations,
  requestDataCallback,
}: ExpandableRowProps) {
  const { date } = event;
  // Format the event date and split into weekday and date string
  const formattedDate = formatEventDate(date);
  const [_weekday, dateString, _year] = formattedDate.split(", ");

  const registeredNames = registrations
    ? getEntriesByEventId(registrations, Number(event.eventId))
    : [];

  const interestedRiders = event.interestedRiders?.length || 0;

  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);
  const location = isMobile ? event.state : `${event.city}, ${event.state}`;

  const hypeLevel = registeredNames.length + interestedRiders;

  return (
    <React.Fragment key={event.eventId}>
      <Table.Tr
        style={{ cursor: "pointer" }}
        onClick={() => toggleRow(event.eventId)}
      >
        <Table.Td ta="left">
          {expandedRows.has(event.eventId) ? (
            <FaChevronDown size={16} />
          ) : (
            <FaChevronRight size={16} />
          )}
        </Table.Td>
        <Table.Td ta="left" fw="600">
          {dateString}
        </Table.Td>
        <Table.Td ta="left">{event.name}</Table.Td>
        <Table.Td ta="left">{location}</Table.Td>
        <Table.Td ta="left">
          <Progress
            radius="xs"
            size="md"
            value={hypeLevel * 10}
            color={getHypeColor(hypeLevel)}
          />
        </Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td colSpan={5} p={0}>
          <Collapse in={expandedRows.has(event.eventId)}>
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
