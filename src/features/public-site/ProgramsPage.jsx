import { Link } from "react-router-dom";
import {
  LuBookOpen,
  LuUsers,
  LuGlobe,
  LuArrowUpRight,
} from "react-icons/lu";
import { GiSiren } from "react-icons/gi";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";

const programs = [
  {
    number: "01",
    category: "Education",
    title: "REACH Schools Initiative",
    description:
      "Promoting mental health awareness and emotional well-being in junior and secondary schools, while helping students and educators build understanding and practical skills.",
    image: "/assets/category/image_references/rsi.jpeg",
    imageAlt: "Educational activities involving students and an educator",
    icon: LuBookOpen,
  },
  {
    number: "02",
    category: "Community",
    title: "Custom Community Circles",
    description:
      "Helping communities connect, share experiences, exchange knowledge, and build peer-support networks around challenges such as grief, trauma, phobias, and other difficult life experiences.",
    image: "/assets/category/image_references/triple-c.jpg",
    imageAlt: "A supportive counselling and community discussion session",
    icon: LuUsers,
  },
  {
    number: "03",
    category: "Crisis Support",
    title: "Crisis Support Network",
    description:
      "Connecting people experiencing emotional distress with appropriate crisis-support resources and established regional support partners.",
    image: "/assets/category/image_references/crisis-call.jpg",
    imageAlt: "A person providing support during a conversation",
    icon: GiSiren,
  },
  {
    number: "04",
    category: "Outreach",
    title: "Humanitarian Field Missions",
    description:
      "Taking community outreach and mental health awareness into underserved areas and communities affected by displacement, emergencies, and other difficult circumstances.",
    image: "/assets/category/image_references/missions.jpg",
    imageAlt: "Humanitarian community outreach activities",
    icon: LuGlobe,
  },
];

function ProgramsPage({ embedded = false }) {
  const { theme } = useTheme();

  return (
    <div
      id={embedded ? "programs" : undefined}
      className="min-h-screen scroll-mt-20 overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {!embedded && <Header />}

      <main>
        {/* Programs Introduction */}
        <section className="px-4 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em]"
              style={{
                color: theme.primary,
                backgroundColor: theme.bgSoft,
                borderColor: theme.border,
              }}
            >
              <LuGlobe size={15} />
              Our Programs
            </span>

            <div className="mt-6 grid items-end gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <h1
                className="text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.12]"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Turning Compassion
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  into Action.
                </span>
              </h1>

              <p
                className="max-w-xl text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                Our programmes aim to create lasting, meaningful
                change by bringing education, support, and
                community participation together.
              </p>
            </div>
          </div>
        </section>

        {/* Program Cards */}
        <section
          id="program-cards"
          className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8"
        >
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
            {programs.map((program) => {
              const Icon = program.icon;

              return (
                <article
                  key={program.number}
                  className="overflow-hidden rounded-2xl border"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  }}
                >
                  <div className="relative h-56 overflow-hidden bg-black/5 sm:h-64">
                    <img
                      src={program.image}
                      alt={program.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />

                    <span
                      className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold shadow-sm"
                      style={{
                        backgroundColor: theme.card,
                        color: theme.primary,
                      }}
                    >
                      <Icon size={17} />
                      {program.category}
                    </span>
                  </div>

                  <div className="p-5 sm:p-7">
                    <span
                      className="text-xs font-bold tracking-widest"
                      style={{ color: theme.primary }}
                    >
                      PROGRAM {program.number}
                    </span>

                    <h2 className="mt-3 text-xl font-extrabold sm:text-2xl">
                      {program.title}
                    </h2>

                    <p
                      className="mt-4 text-sm leading-7 sm:text-base sm:leading-8"
                      style={{ color: theme.textMid }}
                    >
                      {program.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Get Involved */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          style={{ backgroundColor: theme.bgSoft }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Be Part of the Change
              </span>

              <h2
                className="mt-3 text-3xl leading-tight sm:text-4xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Your Contribution
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  Makes a Difference.
                </span>
              </h2>

              <p
                className="mt-5 text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                You can contribute your time, skills, knowledge,
                or resources to support our work. Every meaningful
                contribution helps us reach more people and
                strengthen our communities.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white no-underline"
                  style={{ backgroundColor: theme.primary }}
                >
                  Learn More
                  <LuArrowUpRight size={17} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-3 text-sm font-bold no-underline"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                >
                  Join Us
                </Link>

                <Link
                  to="/login"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-3 text-sm font-bold no-underline"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                >
                  Volunteer With Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProgramsPage;