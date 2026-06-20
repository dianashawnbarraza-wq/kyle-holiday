import { Routes, Route } from "react-router-dom";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { ScrollToHash } from "./components/ScrollToHash";
import { HomePage } from "./pages/HomePage";
import { PetPlayTagsPage } from "./pages/PetPlayTagsPage";
import { ArtPage } from "./pages/ArtPage";
import { LeatherworkPage } from "./pages/LeatherworkPage";
import { ContactPage } from "./pages/ContactPage";

export default function App() {
  return (
    <>
      <ScrollToHash />
      <SiteNav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pet-play-tags" element={<PetPlayTagsPage />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/leatherwork" element={<LeatherworkPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}
