import EventLabel from ".";
import { LABELS } from "../../../constants";
import { useEventContext } from "../../../context/event-context";
import { getLabelConfig } from "../../../utils/label";

export default function LabelsList() {
  const eventContext = useEventContext();
  const { event } = eventContext;
  const { eventType, labels = [] } = event;

  return (
    <>
      {labels.length > 0 ? (
        <>
          {labels.map((labelId: string) => {
            return (
              <EventLabel key={labelId} labelConfig={getLabelConfig(labelId)} />
            );
          })}
        </>
      ) : (
        <EventLabel
          labelConfig={eventType === "special" ? LABELS.SPECIAL : LABELS.RACE}
        />
      )}
    </>
  );
}
