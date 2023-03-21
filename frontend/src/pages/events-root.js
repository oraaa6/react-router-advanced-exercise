import { EventsNavigation } from "../components/EventsNavigation";
import { Outlet } from "react-router-dom";

export function RootEvents() {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
