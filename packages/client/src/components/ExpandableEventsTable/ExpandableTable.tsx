import { useEffect, useMemo, useState } from "react";
import { Table, Card, Button } from "@mantine/core";
import { EventType, FetchRegistrationsResponse } from "../../types";
import ExpandableRow from "./ExpandableRow";
import { DEFAULT_DISCIPLINE } from "../../constants";
import { EventProvider } from "../../context/event-context";
import { getEventIdsFromUrl, updateUrlParams } from "../../utils/url";

interface ExpandableTableProps {
  events: EventType[];
  registrations: FetchRegistrationsResponse | undefined;
}

/**
 * ExpandableTable component displays a table with expandable rows.
 *
 * @param events - An array of events to be displayed in the table.
 * @param registrations - An array of registrations associated with the events.
 */
const ExpandableTable = ({ events, registrations }: ExpandableTableProps) => {

  const eventIds = useMemo(() => {
    return events.map((event) => event.eventId);
  }, [events]);

  const initialSelectedEvents = useMemo(() => {
    return getEventIdsFromUrl(); // Runs once during initial render
  }, []);

  const [expandedRows, setExpandedRows] = useState<Set<string>>(
    new Set(initialSelectedEvents),
  );

  useEffect(() => {
    // update the url when expandedRows or events change
    const tabValue = events[0]?.eventType || DEFAULT_DISCIPLINE;
    const expandedIds = [...expandedRows];
    updateUrlParams(tabValue, expandedIds);
  }, [expandedRows, events]);

  /**
   * Toggles the row with the specified ID in the expandedRows set.
   * If the row is already expanded, it will be collapsed. If it is collapsed, it will be expanded.
   * @param id - The ID of the row to toggle.
   */
  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  /**
   * Represents the rows of the expandable events table.
   *
   * @type {JSX.Element[]}
   */
  const rows: JSX.Element[] = events.map((row) => (
    <EventProvider key={row.eventId} initialEvent={row}>
      <ExpandableRow
        event={row}
        toggleRow={toggleRow}
        expandedRows={expandedRows}
        registrations={registrations}
      />
    </EventProvider>
  ));

  return (
    <Card data-testid="expandable-table">
      {!expandedRows.size ? (
        <Button
          data-testid="detail-view-button"
          variant="subtle"
          onClick={() => setExpandedRows(new Set(eventIds))}
        >
          Detail View
        </Button>
      ) : (
        <Button
          data-testid="quick-view-button"
          variant="subtle"
          onClick={() => setExpandedRows(new Set())}
        >
          Quick View
        </Button>
      )}
      <Table striped verticalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th className="hideOnMobile">Location</Table.Th>
            <Table.Th className="hideOnMobile">Labels</Table.Th>
            <Table.Th className="hideOnMobile">Hype Level</Table.Th>
            <Table.Th className="hideOnDesktop">Hype</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default ExpandableTable;
