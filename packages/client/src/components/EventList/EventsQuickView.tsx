import { Accordion, Flex, Table } from '@mantine/core';
import { EventType } from '../../types';
import EventCard from '../EventCard';
import { formatEventDate } from '../../utils/dates';

interface QuickViewProps {
  event: EventType;
  registrations: any;
  requestDataCallback: any;
  isEventStriped: boolean;
}

export default function QuickView({ event, registrations, requestDataCallback, isEventStriped }: QuickViewProps) {
  const { date } = event;
  // Format the event date and split into weekday and date string
  const formattedDate = formatEventDate(date);
  const [weekday, dateString, year] = formattedDate.split(", ");

  const row =  (
    <Table.Tr key={event.eventId}>
      <Table.Td ta="left">{dateString}</Table.Td>
      <Table.Td ta="left">{event.name}</Table.Td>
      <Table.Td ta="left">{event.city}</Table.Td>
      <Table.Td ta="left">{event.state}</Table.Td>
    </Table.Tr>
  );

  const table = (
    <Table>
      <Table.Thead w="25%">
      </Table.Thead>
      <Table.Tbody>{row}</Table.Tbody>
    </Table>
  );

    return (
    <Accordion.Item key={event.eventId} value={event.eventId}>
      <Accordion.Control >{table}</Accordion.Control>
      <Accordion.Panel>
      <EventCard
              key={event.eventId}
              event={event}
              registrations={registrations}
              requestDataCallback={requestDataCallback}
              isStripe={isEventStriped}
            />
      </Accordion.Panel>
    </Accordion.Item>
    )
}
