import { Outlet } from "react-router-dom";
import Header from "./Header";
import CallLinks from "./CallLinks";

const AppLayout = () => {
  return (
    <>
      <Header />
      <CallLinks />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
