import { useMemo, useState } from "react";
import { Table, Card, Button } from "@mantine/core";
import { EventType } from "../../types";
import ExpandableRow from "./ExpandableRow";

const ExpandableTable = ({
  events,
  registrations,
  requestDataCallback,
}: {
  events: EventType[];
  registrations: any;
  requestDataCallback: any;
}) => {
  const eventIds = useMemo(() => {
    return events.map((event) => event.eventId);
  }, events);

  const [expandedRows, setExpandedRows] = useState(new Set(eventIds));

  const toggleRow = (id: any) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const rows = events.map((row) => (
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

      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Location</Table.Th>
            <Table.Th>Hype Level</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default ExpandableTable;
