import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail"); // daje dostęp do danych pobieranych w loaderze. Dziala podobnie jak useLoaderData, z różnicą taką, że przyjmuje identyfikator route jako argument
  return (
    <>
      <Suspense fallback={<p>Loading....</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading....</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export async function action({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhots:8080/events/" + id, {
    method: request.method,
  });
  if (!response.ok) {
    throw json({ message: "Could not delete event" }, { status: 500 }); // error response
  }
  return redirect("/events"); // funkcja, która tworzy obiekt response, który przekieruje użytkownika na daną stronę
} // kod wykonuje sie w przeglądarce, tak samo jak loadery

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" }; // tak też można zrobic, ale jest od tego ErrorElement
    // throw { message: "Could not fetch events" };
    // throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
    //   status: 500,
    // }); // zeby rozróżnić błędy, możemy wyrzucić new Response i zawrzeć kod błędu
    return json({ message: "Could not fetch events" }, { status: 500 }); // zamiast new Response, lepiej jest użyć metody json z routera. W srodku daje się dane które mają byc w responsie. nie trzeba tego konwertowac na jsona, bo to robi samo
  } else {
    const resData = await response.json();
    return resData.events;
    // kod wykonywany w przegladarce, a nie serwerze. dlatego można wykorzystać każde API przeglądarki w loaderach np - localStorage, cookies itd. Ale nie można używac hooków w loaderach
  }
}

export async function loader({ request, params }) {
  // loader dostaracza nam obiekt request i obiekt params, który zawiera paramerty route'a, czyli to co ma useParams hook
  const id = params.eventId;
  return defer({
    event: await loadEvent(id), // czeka az te dane się załadują przed komponentem - dzięki async
    events: loadEvents(), // dane załladują się po komponencie
  }); // ładowanie danych podczas czekania na inne dane
}
