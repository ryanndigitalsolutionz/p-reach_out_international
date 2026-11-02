import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LogoIntro from "./components/branding/LogoIntro.jsx";

import HomePage from "./features/public-site/HomePage.jsx";
import AboutPage from "./features/public-site/AboutPage.jsx";
import OurOffer from "./features/public-site/OurOffer.jsx";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  // The intro runs before any application route is displayed.
  if (!introComplete) {
    return (
      <LogoIntro
        onComplete={() => setIntroComplete(true)}
      />
    );
  }

  return (
    <Routes>
      {/* Main public homepage */}
      <Route
        path="/"
        element={
          <>
            <HomePage />
            <AboutPage embedded />
            <OurOffer embedded />
          </>
        }
      />

      {/* Standalone public pages */}
      <Route
        path="/about"
        element={<AboutPage />}
      />

      <Route
        path="/our-offer"
        element={<OurOffer />}
      />

      {/* Header navigation compatibility */}
      <Route
        path="/services"
        element={<OurOffer />}
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
