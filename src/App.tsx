import { Navigate, Route, Routes } from "react-router-dom";
import { PageSEO } from "./components/PageSEO";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { ScrollToHash } from "./components/ScrollToHash";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ShopPage } from "./pages/ShopPage";
import { ShopThanksPage } from "./pages/ShopThanksPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ArtPage } from "./pages/ArtPage";
import { LeatherworkPage } from "./pages/LeatherworkPage";
import { ContactPage } from "./pages/ContactPage";
import { EventsPage } from "./pages/EventsPage";

export default function App() {
  return (
    <>
      <PageSEO />
      <ScrollToHash />
      <SiteNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/thanks" element={<ShopThanksPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route
            path="/pet-play-tags"
            element={<Navigate to="/shop" replace />}
          />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/leatherwork" element={<LeatherworkPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
