import {
  useNavigate,
  Form,
  json,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const data = useActionData(); // dostęp do danych zwróconych z action
  const navigation = useNavigation();
  const isSubmitting = (navigation.state = "submitting");
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} action="" className={classes.form}>
      {/* mogę użyć action i wysłać request do innego route *, tj. action= = "/any-path", jesli sie chce wysłać do aktywnego route to nie dodaje sie actions /}
      {/* Form z react router dom, który po zaakceptowaniu nie jesy wysyłany do backendu a do actions */}
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) {
  // wysyłanie dwóch akcji(requestów) do różnych url, z różnymi metodami, z zawsze takimi samymi danymi
  const data = await request.formData(); // zawiera dane z przesłanego Forma
  const method = request.method;
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    data: data.get("data"),
    description: data.get("description"),
  }; // title, image, data, description - to jest name konkretnego inputa z Forma
  let url = "http://localhots:8080/events";
  if (method === "PATCH") {
    const eventId = params.eventId; // w route definitions jest eventId (w App.js)
    url = "http://localhots:8080/events/" + eventId;
  }
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    // 422 - validation errors
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not send event" }, { status: 500 }); // error response
  }
  return redirect("/events"); // funkcja, która tworzy obiekt response, który przekieruje użytkownika na daną stronę
} // kod wykonuje sie w przeglądarce, tak samo jak loadery
