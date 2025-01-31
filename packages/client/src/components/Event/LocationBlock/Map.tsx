import { Flex } from '@mantine/core';

const DEFAULT_RWGPS_MAP = 'public/map-placeholder.png';

export default function Map() {
  return (
    <Flex>
      <iframe src={DEFAULT_RWGPS_MAP} title="Ride with GPS Map" />
    </Flex>
  );
}
