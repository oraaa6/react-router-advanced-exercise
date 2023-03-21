import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router";
import EventsList from "../components/EventsList";

export function EventsPage() {
  const { events } = useLoaderData(); // ten hook umożliwia dostęp do danych, które są pobrane w loaderze. Funkcja loadera zwraca promise, a useLoaderData to rozwiązuje i zwraca pobrane dane.
  //Mozna go użyc w miejscu gdzie jest używany komponen i przekazac dane do komponentu badz w samym komponencie (tu: EventsList)
  // nie można tego używac w ścieżkach wyżej

  // if (data.isError) {
  //   return <p>{data.message}</p>;
  // }
  // SUSPENSE - pokazuje fallback, zanim dane dotrą, czyli tak jakby takie initial data
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadEvents} />}
      </Await>
    </Suspense>
  );
} //---> ładowanie komponentu przed danymi

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
export async function loader() {
  defer({
    events: loadEvents, // dzięki defer, komponent się załaduje, nawet jeśli wszystkie dane nie są pobrane
  });
}
