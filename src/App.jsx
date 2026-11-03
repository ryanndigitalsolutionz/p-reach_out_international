import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LogoIntro from "./components/branding/LogoIntro.jsx";
import SiteFooter from "./components/footer/SiteFooter.jsx";
import CrisisPage from "./components/CrisisPage.jsx";

import HomePage from "./features/public-site/HomePage.jsx";
import AboutPage from "./features/public-site/AboutPage.jsx";
import OurOffer from "./features/public-site/OurOffer.jsx";
import LibraryPage from "./features/public-site/LibraryPage.jsx";
import ProgramsPage from "./features/public-site/ProgramsPage.jsx";
import FAQ from "./features/public-site/FAQ.jsx";
import ContactPage from "./features/public-site/ContactPage.jsx";

import Dashboard from "./features/member-access/Dashboard.jsx";

import Login from "./utils/authentication/Login.jsx";
import Signup from "./utils/authentication/Signup.jsx";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  if (!introComplete) {
    return (
      <LogoIntro
        onComplete={() => setIntroComplete(true)}
      />
    );
  }

  return (
    <Routes>
      {/* Public Homepage */}
      <Route
        path="/"
        element={
          <>
            <HomePage />
            <AboutPage embedded />
            <OurOffer embedded />
            <LibraryPage embedded />
            <ProgramsPage embedded />
            <FAQ embedded />
            <ContactPage embedded />
            <SiteFooter />
          </>
        }
      />

      {/* Public Information Pages */}
      <Route path="/about" element={<AboutPage />} />

      <Route
        path="/our-offer"
        element={<OurOffer />}
      />

      <Route
        path="/services"
        element={<OurOffer />}
      />

      <Route path="/library" element={<LibraryPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Support Area */}
      <Route
        path="/counselling"
        element={
          <>
            <OurOffer />
            <SiteFooter />
          </>
        }
      />

      {/* Inactive Authentication — no public footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Member Access */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/crisis" element={<CrisisPage />} />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
