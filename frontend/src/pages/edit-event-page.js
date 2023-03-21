import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router";

export function EditEventPage() {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;

  return <EventForm event={event} method={"patch"} />;
}
