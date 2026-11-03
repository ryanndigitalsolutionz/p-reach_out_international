import { Link } from "react-router-dom";
import {
  LuCompass,
  LuMessageCircle,
  LuMonitor,
  LuUsers,
  LuHandHeart,
  LuBookOpen,
  LuGlobe,
  LuMic,
  LuArrowUpRight,
} from "react-icons/lu";
import { GiSiren } from "react-icons/gi";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";
import CurvedDivider from "../../components/branding/CurvedDivider.jsx";

const services = [
  {
    number: "01",
    title: "Individual Counselling",
    description:
      "One-on-one counselling provides a supportive space for individuals to discuss personal challenges, work through difficult experiences, and explore constructive ways forward.",
    icon: LuMessageCircle,
  },
  {
    number: "02",
    title: "Online Counselling",
    description:
      "Access counselling remotely where suitable arrangements can be made. Contact our team to discuss available formats and session arrangements.",
    icon: LuMonitor,
  },
  {
    number: "03",
    title: "Group Counselling",
    description:
      "A group-based approach intended to encourage shared learning, mutual understanding, and supportive conversations. Contact the team to enquire about current availability.",
    icon: LuUsers,
  },
  {
    number: "04",
    title: "Mentorship",
    description:
      "Guidance and encouragement intended to help individuals develop confidence, identify their strengths, and work towards meaningful personal goals.",
    icon: LuHandHeart,
  },
  {
    number: "05",
    title: "Mental Health Education",
    description:
      "Educational services that promote mental-health awareness, improve understanding, challenge misconceptions, and encourage informed conversations.",
    icon: LuBookOpen,
  },
  {
    number: "06",
    title: "Crisis Support & Referrals",
    description:
      "Helping individuals find appropriate support contacts, including counsellors associated with NACADA and Befrienders Kenya, where additional assistance is needed.",
    icon: GiSiren,
  },
  {
    number: "07",
    title: "Public Speaking Skills",
    description:
      "Encouraging confidence, communication, and the ability to express ideas effectively in public and community settings.",
    icon: LuMic,
  },
  {
    number: "08",
    title: "Community & Humanitarian Outreach",
    description:
      "Taking educational initiatives, encouragement, and community support into schools, prisons, local communities, and religious institutions.",
    icon: LuGlobe,
  },
];

function OurOffer({ embedded = false }) {
  const { theme } = useTheme();

  return (
    <div
      id={embedded ? "our-offer" : undefined}
      className="min-h-screen scroll-mt-20 overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {!embedded && <Header />}

      <main>
        {/* Services introduction */}
        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em]"
              style={{
                color: theme.primary,
                backgroundColor: theme.bgSoft,
                borderColor: theme.border,
              }}
            >
              <LuCompass size={14} />
              What We Offer
            </span>

            <div className="mt-6 grid items-end gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h1
                  className="text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.12]"
                  style={{ fontFamily: '"Carter One", sans-serif' }}
                >
                  Support That
                  <span
                    className="block"
                    style={{ color: theme.primary }}
                  >
                    Meets You Where You Are.
                  </span>
                </h1>
              </div>

              <p
                className="max-w-xl text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                Every individual and community has different needs.
                Through counselling, education, mentorship, and outreach,
                P-REACH OUT works to connect people with encouragement
                and appropriate support.
              </p>
            </div>
          </div>
        </section>

        {/* Service catalogue */}
        <section className="px-4 pb-16 pt-6 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Our Services
              </span>

              <h2
                className="mt-2 text-2xl sm:text-3xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Ways We Reach Out.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article
                    key={service.number}
                    className="flex h-full flex-col rounded-2xl border p-5 sm:p-6"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="text-xs font-bold tracking-widest"
                        style={{ color: theme.primary }}
                      >
                        {service.number}
                      </span>

                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: theme.bgSoft,
                          color: theme.primary,
                        }}
                      >
                        <Icon size={21} strokeWidth={1.7} />
                      </div>
                    </div>

                    <h3 className="mt-5 text-lg font-extrabold">
                      {service.title}
                    </h3>

                    <p
                      className="mt-3 flex-1 text-sm leading-7"
                      style={{ color: theme.textMid }}
                    >
                      {service.description}
                    </p>

                    <div
                      className="mt-5 border-t pt-4"
                      style={{ borderColor: theme.border }}
                    >
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-sm font-bold no-underline transition-opacity hover:opacity-70"
                        style={{ color: theme.primary }}
                      >
                        Make an enquiry
                        <LuArrowUpRight size={17} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Community outreach */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          style={{ backgroundColor: theme.bgSoft }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-12">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Beyond the Counselling Space
              </span>

              <h2
                className="mt-3 text-3xl leading-tight sm:text-4xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Reaching Communities,
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  Creating Connections.
                </span>
              </h2>

              <p
                className="mt-5 max-w-xl text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                P-REACH OUT takes its mission into different
                environments through local missions, educational
                activities, and community engagement. This includes
                outreach in schools, prisons, communities, and
                religious institutions.
              </p>

              <Link
                to="/programs"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold no-underline transition-opacity hover:opacity-70"
                style={{ color: theme.primary }}
              >
                Explore Our Programs
                <LuArrowUpRight size={17} />
              </Link>
            </div>

            <div
              className="rounded-2xl border p-6 sm:p-8"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
              }}
            >
              <h3 className="text-lg font-extrabold">
                Where Our Outreach Reaches
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  "Schools and educational institutions",
                  "Prisons and correctional environments",
                  "Local communities",
                  "Religious institutions",
                ].map((place, index) => (
                  <div
                    key={place}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: theme.bgSoft,
                        color: theme.primary,
                      }}
                    >
                      {index + 1}
                    </span>

                    <span className="text-sm font-semibold">
                      {place}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Boundary: OurOffer → LibraryPage */}
      <CurvedDivider
        backgroundColor={theme.bgSoft}
        waveColor={theme.bg}
        domeColor={theme.primary}
        domeOpacity={0.16}
      />
    </div>
  );
}

export default OurOffer;
