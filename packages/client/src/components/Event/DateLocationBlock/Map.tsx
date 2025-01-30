import { useEventContext } from "../../../context/event-context";

const Map = (): JSX.Element => {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { city, state } = event;
  const locationQuery = `${city}, ${state}, USA`;
  const encodedLocation = encodeURIComponent(locationQuery);

  return (
    <div>
      <iframe
        title="Event Location"
        width="100%"
        height="300"
        src={`https://www.openstreetmap.org/?mlat=37.8&mlon=-96&zoom=4&query=${encodedLocation}`}
        style={{ border: "none" }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
