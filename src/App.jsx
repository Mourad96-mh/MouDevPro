import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import TarifsPage from "./pages/TarifsPage";
import CasablancaPage from "./pages/CasablancaPage";
import RabatPage from "./pages/RabatPage";
import MarrakechPage from "./pages/MarrakechPage";
import EcommercePage from "./pages/EcommercePage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import { CityProvider } from "./context/CityContext";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Homepage — national */}
            <Route index element={<HomePage />} />

            {/* French city pages */}
            <Route path="agence-web-rabat" element={<CityPage city="rabat" lang="fr" />} />
            <Route path="agence-web-marrakech" element={<CityPage city="marrakech" lang="fr" />} />

            {/* English */}
            <Route path="en" element={<CityPage city="casablanca" lang="en" />} />
            <Route path="en/web-agency-rabat" element={<CityPage city="rabat" lang="en" />} />
            <Route path="en/web-agency-marrakech" element={<CityPage city="marrakech" lang="en" />} />

            {/* Arabic */}
            <Route path="ar" element={<CityPage city="casablanca" lang="ar" />} />
            <Route path="ar/agence-web-rabat" element={<CityPage city="rabat" lang="ar" />} />
            <Route path="ar/agence-web-marrakech" element={<CityPage city="marrakech" lang="ar" />} />

            {/* Standalone pages */}
            <Route path="tarifs" element={<TarifsPage />} />
            <Route path="casablanca" element={<CasablancaPage />} />
            <Route path="rabat" element={<RabatPage />} />
            <Route path="marrakech" element={<MarrakechPage />} />
            <Route path="ecommerce" element={<EcommercePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
