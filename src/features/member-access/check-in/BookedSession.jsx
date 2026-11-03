
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuArrowLeft,
  LuCalendarDays,
  LuClock,
  LuVideo,
  LuUsers,
} from "react-icons/lu";

import Spinner from "../../../components/ui/Spinner.jsx";

const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08PHxAdqIExpq273-yqnM2xoCaFZrNwuI5Tj_9Mi1EYgq4duCKj4mjV_zBYlQVJ9uJgor1jWRa?gv=true";

function ServiceSwitch({ activeService, onChange }) {
  const options = [
    {
      id: "individual",
      label: "1 on 1",
      icon: LuVideo,
    },
    {
      id: "group",
      label: "Group",
      icon: LuUsers,
    },
  ];

  return (
    <div
      className="grid w-full max-w-md grid-cols-2 gap-2 rounded-2xl border p-1.5"
      style={{
        backgroundColor: "#101D20",
        borderColor: "rgba(255,255,255,0.1)",
      }}
      role="tablist"
      aria-label="Counselling type"
    >
      {options.map((option) => {
        const Icon = option.icon;
        const active = activeService === option.id;

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            id={`counselling-tab-${option.id}`}
            aria-selected={active}
            aria-controls={`counselling-panel-${option.id}`}
            onClick={() => onChange(option.id)}
            className="flex min-h-14 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-colors duration-200"
            style={{
              backgroundColor: active ? "#E6D8C4" : "transparent",
              color: active ? "#172522" : "#B5C4C3",
              border: active
                ? "1px solid #C59A70"
                : "1px solid transparent",
            }}
          >
            <Icon size={19} />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function IndividualBooking() {
  return (
    <section
      id="counselling-panel-individual"
      role="tabpanel"
      aria-labelledby="counselling-tab-individual"
      className="space-y-5"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-[#D6AC82]">
            <LuVideo size={18} />
            <span className="text-xs font-bold uppercase tracking-[0.16em]">
              Private online sessions
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-semibold text-[#F5EFE6] sm:text-3xl">
            Individual counselling
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-7 text-[#AAB9B5]">
            Arrange a one-to-one online counselling appointment with
            the P-REACH OUT team.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-3 text-xs text-[#C3D1CC]">
          <span className="inline-flex items-center gap-1.5">
            <LuClock size={15} />
            45 minutes
          </span>

          <span className="inline-flex items-center gap-1.5">
            <LuVideo size={15} />
            Google Meet
          </span>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-[1.5rem] p-1.5 sm:p-2"
        style={{
          background:
            "repeating-linear-gradient(135deg, #153E42 0px, #153E42 24px, #1D5961 24px, #1D5961 48px, #6D422B 48px, #6D422B 72px, #98613B 72px, #98613B 96px, #163C3B 96px, #163C3B 120px)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="overflow-hidden rounded-[1.15rem] border border-white/10 bg-white"
          style={{
            boxShadow: "0 12px 36px rgba(0,0,0,0.25)",
          }}
        >
          <iframe
            src={BOOKING_URL}
            title="P-REACH OUT individual counselling appointment booking"
            width="100%"
            height="850"
            loading="lazy"
            frameBorder="0"
            allow="fullscreen"
            style={{
              display: "block",
              width: "100%",
              minHeight: "700px",
              height: "850px",
              border: 0,
              backgroundColor: "#ffffff",
            }}
          />
        </div>
      </div>

      <p className="text-xs leading-6 text-[#92A6A0]">
        Your appointment is arranged through Google Calendar.
        Google Meet details will be provided through the booking
        confirmation.
      </p>
    </section>
  );
}

function GroupComingSoon() {
  return (
    <section
      id="counselling-panel-group"
      role="tabpanel"
      aria-labelledby="counselling-tab-group"
      className="relative flex min-h-[480px] flex-col items-center justify-center overflow-hidden rounded-3xl border px-5 py-12 text-center sm:min-h-[550px] sm:px-10"
      style={{
        background:
          "linear-gradient(145deg, #102426 0%, #142E32 48%, #392B22 100%)",
        borderColor: "rgba(255,255,255,0.12)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(32,116,125,0.17)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(166,101,53,0.18)" }}
      />

      <div className="relative z-10 flex max-w-lg flex-col items-center">
        <div
          className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            borderColor: "rgba(255,255,255,0.13)",
            color: "#D6AC82",
          }}
        >
          <LuUsers size={29} />
        </div>

        <Spinner
          size="lg"
          label="Preparing group counselling..."
          showLabel={false}
        />

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#D6AC82]">
          P-REACH OUT Group Sessions
        </p>

        <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#F5EFE6] sm:text-4xl">
          Something meaningful is taking shape.
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#B5C4C3]">
          We're preparing a space where members can come together,
          share experiences and support one another through guided
          group counselling.
        </p>

        <div
          className="mt-8 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#E5C9A8]"
          style={{
            borderColor: "rgba(214,172,130,0.35)",
            backgroundColor: "rgba(214,172,130,0.08)",
          }}
        >
          Coming Soon
        </div>
      </div>
    </section>
  );
}

function BookedSession() {
  const [activeService, setActiveService] = useState("individual");

  return (
    <main
      className="member-access relative min-h-screen overflow-hidden px-4 py-8 text-[#F5EFE6] sm:px-6 sm:py-12 lg:px-10"
      style={{ backgroundColor: "#091416" }}
    >
      {/* Earth and ocean background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{ backgroundColor: "rgba(24,91,100,0.19)" }}
        />

        <div
          className="absolute -bottom-48 -left-40 h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{ backgroundColor: "rgba(143,81,43,0.16)" }}
        />

        <div
          className="absolute left-0 right-0 top-[40%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(38,112,119,0.5), rgba(166,105,61,0.45), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        {/* Page navigation */}
        <header className="mb-9 flex flex-wrap items-center justify-between gap-4 sm:mb-12">
          <Link
            to="/check-in"
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold text-[#D6E0DC] no-underline transition-colors hover:bg-white/5"
            style={{
              borderColor: "rgba(255,255,255,0.13)",
            }}
          >
            <LuArrowLeft size={17} />
            Back to Check-In
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#C2A17E]">
            <LuCalendarDays size={16} />
            P-REACH OUT
          </div>
        </header>

        {/* Page introduction */}
        <section className="mb-8 sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D6AC82]">
            A space for support
          </p>

          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Counselling, with care.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#AAB9B5] sm:text-base">
            Whether you prefer a private conversation or a shared
            experience, we're here to help you find the support you need.
          </p>
        </section>

        {/* Booking workspace */}
        <section
          className="overflow-hidden rounded-[2rem] border p-4 shadow-2xl sm:p-7 lg:p-9"
          style={{
            backgroundColor: "rgba(13,27,29,0.94)",
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow: "0 28px 90px rgba(0,0,0,0.28)",
          }}
        >
          <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8FB8B2]">
                Choose your session
              </p>

              <h2 className="mt-2 text-xl font-semibold text-[#F5EFE6] sm:text-2xl">
                How would you like to connect?
              </h2>
            </div>

            <ServiceSwitch
              activeService={activeService}
              onChange={setActiveService}
            />
          </div>

          {activeService === "individual" ? (
            <IndividualBooking />
          ) : (
            <GroupComingSoon />
          )}
        </section>

        {/* Closing information */}
        <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs leading-6 text-[#819792] sm:flex-row sm:items-center">
          <p>
            P-REACH OUT International · A Friend Stays There
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              to="/contact"
              className="text-[#B8C9C3] underline-offset-4 hover:underline"
            >
              Contact our team
            </Link>

            <Link
              to="/crisis"
              className="text-[#D89A9A] underline-offset-4 hover:underline"
            >
              Crisis support
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default BookedSession;
