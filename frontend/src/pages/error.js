import PageContent from "../components/PageContent";
import { useRouteError } from "react-router";
import { MainNavigation } from "../components/MainNavigation";

export function ErrorPage() {
  const error = useRouteError(); // ma dostęp do statusu tzn kodu blędu
  let title = "An error occured";
  let message = "Something went wrong";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find resource or page ";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
