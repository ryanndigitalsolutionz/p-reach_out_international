
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LogoIntro from "./components/branding/LogoIntro.jsx";
import SiteFooter from "./components/footer/SiteFooter.jsx";
import CrisisPage from "./components/extras/CrisisPage.jsx";

import HomePage from "./features/public-site/HomePage.jsx";
import AboutPage from "./features/public-site/AboutPage.jsx";
import OurOffer from "./features/public-site/OurOffer.jsx";
import LibraryPage from "./features/public-site/LibraryPage.jsx";
import ProgramsPage from "./features/public-site/ProgramsPage.jsx";
import FAQ from "./features/public-site/FAQ.jsx";
import ContactPage from "./features/public-site/ContactPage.jsx";

import Dashboard from "./features/member-access/Dashboard.jsx";
import Milestones from "./features/member-access/Milestones.jsx";
import PRNews from "./features/member-access/P-R_News.jsx";
import Resources from "./features/member-access/Resources.jsx";
import Journal from "./features/member-access/journals/Journal.jsx";

import CheckInSummary from "./features/member-access/check-in/Check-In_Summary.jsx";
import Questionnaire from "./features/member-access/check-in/Questionnaire.jsx";
import BookedSession from "./features/member-access/check-in/BookedSession.jsx";

import GroupSummary from "./features/member-access/groups/Group-Summary.jsx";
import PeopleHubStatus from "./features/member-access/people-hub/PeopleHubStatus.jsx";

import Login from "./utils/authentication/Login.jsx";
import Signup from "./utils/authentication/Signup.jsx";

function App() {
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
      <Route path="/our-offer" element={<OurOffer />} />
      <Route path="/services" element={<OurOffer />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/programs" element={<ProgramsPage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Public Support Area */}
      <Route
        path="/counselling"
        element={
          <>
            <OurOffer />
            <SiteFooter />
          </>
        }
      />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Member Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Check-In */}
      <Route path="/check-in" element={<CheckInSummary />} />
      <Route
        path="/check-in/questionnaire"
        element={<Questionnaire />}
      />
      <Route
        path="/check-in/booked-sessions"
        element={<BookedSession />}
      />

      {/* Personal Progress */}
      <Route path="/milestones" element={<Milestones />} />

      {/* Groups */}
      <Route path="/groups" element={<GroupSummary />} />

      {/* People Hub */}
      <Route path="/people-hub" element={<PeopleHubStatus />} />

      {/* P-R News */}
      <Route path="/p-r-news" element={<PRNews />} />

      {/* Resources */}
      <Route path="/resources" element={<Resources />} />

      {/* Journals */}
      <Route path="/journal" element={<Journal />} />

      {/* Crisis Support */}
      <Route path="/crisis" element={<CrisisPage />} />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
