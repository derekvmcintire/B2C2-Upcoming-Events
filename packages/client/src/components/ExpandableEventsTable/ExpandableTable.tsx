import { useMemo, useState } from "react";
import { Table, Card, Button } from "@mantine/core";
import {
  EventDiscipline,
  EventType,
  FetchRegistrationsResponse,
} from "../../types";
import ExpandableRow from "./ExpandableRow";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_BREAK_POINT } from "../../constants";

interface ExpandableTableProps {
  events: EventType[];
  registrations: FetchRegistrationsResponse | undefined;
  requestDataCallback: (eventType: EventDiscipline) => void;
}

/**
 * ExpandableTable component displays a table with expandable rows.
 *
 * @param events - An array of events to be displayed in the table.
 * @param registrations - An array of registrations associated with the events.
 * @param requestDataCallback - A callback function to request additional data.
 */
const ExpandableTable = ({
  events,
  registrations,
  requestDataCallback,
}: ExpandableTableProps) => {
  const isMobile = useMediaQuery(MOBILE_BREAK_POINT);

  const eventIds = useMemo(() => {
    return events.map((event) => event.eventId);
  }, events);

  const [expandedRows, setExpandedRows] = useState<Set<string>>(
    new Set(eventIds),
  );

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
    <ExpandableRow
      event={row}
      toggleRow={toggleRow}
      expandedRows={expandedRows}
      registrations={registrations}
      requestDataCallback={requestDataCallback}
    />
  ));

  return (
    <Card p="md">
      {!expandedRows.size ? (
        <Button
          variant="subtle"
          onClick={() => setExpandedRows(new Set(eventIds))}
        >
          Expand All
        </Button>
      ) : (
        <Button variant="subtle" onClick={() => setExpandedRows(new Set())}>
          Collapse All
        </Button>
      )}
      <Table striped highlightOnHover verticalSpacing="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Name</Table.Th>
            {!isMobile && <Table.Th>Location</Table.Th>}
            <Table.Th>{isMobile ? "Hype" : "Hype Level"}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default ExpandableTable;
