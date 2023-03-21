import { MainNavigation } from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

export function RootLayout() {
  // const navigation = useNavigation(); - umożliwia dostęp do stanu pbierania: loading, idle, submimtting

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}
