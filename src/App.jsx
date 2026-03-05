import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import CityPage from "./pages/CityPage";
import { CityProvider } from "./context/CityContext";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* French (default) */}
            <Route index element={<CityPage city="casablanca" lang="fr" />} />
            <Route path="agence-web-tanger" element={<CityPage city="tanger" lang="fr" />} />
            <Route path="agence-web-marrakech" element={<CityPage city="marrakech" lang="fr" />} />

            {/* English */}
            <Route path="en" element={<CityPage city="casablanca" lang="en" />} />
            <Route path="en/web-agency-tanger" element={<CityPage city="tanger" lang="en" />} />
            <Route path="en/web-agency-marrakech" element={<CityPage city="marrakech" lang="en" />} />

            {/* Arabic */}
            <Route path="ar" element={<CityPage city="casablanca" lang="ar" />} />
            <Route path="ar/agence-web-tanger" element={<CityPage city="tanger" lang="ar" />} />
            <Route path="ar/agence-web-marrakech" element={<CityPage city="marrakech" lang="ar" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
