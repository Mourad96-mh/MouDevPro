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
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
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
            <Route path="rabat" element={<RabatPage />} />
            <Route path="marrakech" element={<MarrakechPage />} />

            {/* English */}
            <Route path="en" element={<CityPage city="casablanca" lang="en" />} />
            <Route path="en/rabat" element={<CityPage city="rabat" lang="en" />} />
            <Route path="en/marrakech" element={<CityPage city="marrakech" lang="en" />} />

            {/* Arabic */}
            <Route path="ar" element={<CityPage city="casablanca" lang="ar" />} />
            <Route path="ar/rabat" element={<CityPage city="rabat" lang="ar" />} />
            <Route path="ar/marrakech" element={<CityPage city="marrakech" lang="ar" />} />

            {/* Standalone pages */}
            <Route path="tarifs" element={<TarifsPage />} />
            <Route path="casablanca" element={<CasablancaPage />} />
            <Route path="ecommerce" element={<EcommercePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
