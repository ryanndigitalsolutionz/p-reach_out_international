
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LogoIntro from "./components/branding/LogoIntro.jsx";
import HomePage from "./features/public-site/HomePage.jsx";

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
      <Route path="/" element={<HomePage />} />

      {/* Replace this fallback as more routes are implemented. */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}
