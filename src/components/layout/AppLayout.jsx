import { Outlet } from "react-router-dom";
import Header from "./Header";
import CallLinks from "./CallLinks";
import AttributionCapture from "./AttributionCapture";

const AppLayout = () => {
  return (
    <>
      <AttributionCapture />
      <Header />
      <CallLinks />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
