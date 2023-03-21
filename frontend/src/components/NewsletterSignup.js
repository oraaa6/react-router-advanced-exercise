import classes from "./NewsletterSignup.module.css";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

export function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);
  return (
    <fetcher.Form // nie przenosi do innej sciezki w porownaniu do Form z react router dom
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      {/* dlaczego nie użyłam tutaj Form z react router dom? Ponieważ newsletter jest widoczny na każdej ścieżce, a wejście w daną ścieżkę z Formem i akcją powoduje wykonanie sie akcji, więc akcja wykonywalaby się od raz po wejsciu w ścieżkę. Jednak useFetcher ma opcje forma, gdzie wysyłany jest request dopiero wtedy, kiedy akcja nastąpi*/}
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}
