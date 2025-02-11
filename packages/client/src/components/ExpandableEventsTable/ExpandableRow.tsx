import { Collapse, Progress, Table } from "@mantine/core";
import React, { useMemo } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import EventCard from "../Event/Card";
import { getHypeColor, getHypeLevel } from "../../utils/hype";
import { formatEventDate, formatShortDate } from "../../utils/dates";
import { EventType, FetchRegistrationsResponse } from "../../types";
import { getEntriesByEventId } from "../../utils/findRegisteredRiders";
import { LABELS } from "../../constants";
import LabelsList from "../Event/EventLabel/LabelsList";

interface ExpandableRowProps {
  event: EventType;
  toggleRow: (id: string) => void;
  expandedRows: Set<string>;
  registrations: FetchRegistrationsResponse | undefined;
}

/**
 * Renders an expandable row for an event in the table.
 *
 * @param event - The event object.
 * @param toggleRow - Function to toggle the expanded state of the row.
 * @param expandedRows - Set of expanded row IDs.
 * @param registrations - Array of registrations for the event.
 * @returns The JSX element representing the expandable row.
 */
export default function ExpandableRow({
  event,
  toggleRow,
  expandedRows,
  registrations,
}: ExpandableRowProps) {
  const {
    city,
    date,
    eventId,
    interestedRiders,
    committedRiders,
    name,
    state,
    labels,
  } = event;

  const registeredNames = useMemo(
    () =>
      registrations ? getEntriesByEventId(registrations, Number(eventId)) : [],
    [registrations, eventId],
  );
  const formattedDate = useMemo(() => formatEventDate(date), [date]);

  const [weekday, dateString] = formattedDate.split(", ");

    

  const numberOfIntRiders = interestedRiders?.length || 0;
  const numberOfCommittedRiders = committedRiders?.length || 0;

  const hypeLevel = getHypeLevel(
    registeredNames.length,
    numberOfIntRiders,
    numberOfCommittedRiders,
  );

  const getLocationText = () => {
    return labels?.includes(LABELS.VIRTUAL.id)
      ? LABELS.VIRTUAL.text
      : `${city}, ${state}`;
  };

  return (
    <React.Fragment key={eventId}>
      <Table.Tr
        data-testid={eventId}
        style={{ cursor: "pointer" }}
        onClick={() => toggleRow(eventId)}
      >
        <Table.Td ta="left">
          {expandedRows.has(eventId) ? (
            <FaChevronDown size={8} />
          ) : (
            <FaChevronRight size={8} />
          )}
        </Table.Td>
        <Table.Td ta="left" fw="600" className="hideOnDesktop">
          {formatShortDate(new Date(date))}
        </Table.Td>
        <Table.Td ta="left" fw="600" className="hideOnMobile">
          {`${weekday} ${dateString}`}
        </Table.Td>
        <Table.Td ta="left">{name}</Table.Td>
        <Table.Td ta="left" className="hideOnMobile">{getLocationText()}</Table.Td>
          <Table.Td ta="left" className="hideOnMobile">
            <LabelsList noText xs />
          </Table.Td>
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
            <EventCard key={event.eventId} registrations={registrations} />
          </Collapse>
        </Table.Td>
      </Table.Tr>
    </React.Fragment>
  );
}
