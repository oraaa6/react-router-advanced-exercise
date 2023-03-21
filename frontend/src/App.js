import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/home-page";
import {
  EventDetailPage,
  loader as eventDetail,
  action as deleteEventAction,
} from "./pages/event-detail-page";
import { EventsPage, loader as eventsLoader } from "./pages/events-page";
import { NewEventPage } from "./pages/new-event-page";
import { EditEventPage } from "./pages/edit-event-page";
import { RootLayout } from "./pages/root-layout";
import { RootEvents } from "./pages/events-root";
import { ErrorPage } from "./pages/error";
import { action as manipulateEventAction } from "./components/EventForm";
import { NewsletterPage, action as newsletterAction } from "./pages/newsletter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // children jest Outletem
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <RootEvents />, // nested layout
        children: [
          // children jest Outletem
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader, // funkcja która zostanie wykonana po wejściu w daną sciezkę i przed wyrenderowaniem komponentu. Zwróci pobrane dane i są one już dostępne dla komponentu <EventsPage />
            // dobrze jest trzymac loadery w plikach komponentów, które dotyczą tj tu: Events Page, zeby nie wszystko było w App
          },
          {
            path: ":eventId",
            id: "event-detail", // id jest potrzebne do identyfikacji loadera. Loader wyszukuje najbliższe dostępne dane loadera, a najwyższym poziomem, na którym szuka danych, jest definicja route, da którego ten komponent został załadowany
            loader: eventDetail, // pobiera dane zarówno dla dynamicznej scieżki :eventId, jak i eventId/edit
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction, // pozwala na uzycie tego samego forma do różnych akcji
              },
            ],
          },

          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction, // pozwala na uzycie tego samego forma do różnych akcji
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);
// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App() {
  return <RouterProvider router={router} />;
}

export default App;
