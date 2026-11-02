import { Link } from "react-router-dom";
import {
  LuHeartHandshake,
  LuEye,
  LuHandHeart,
  LuSprout,
  LuGlobe,
  LuUsers,
  LuBookOpen,
  LuHeart,
  LuArrowUpRight,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";

const pillars = [
  {
    number: "01",
    title: "Awareness",
    description:
      "Encouraging understanding of mental health, challenging misconceptions, and making reliable educational information more accessible.",
    icon: LuEye,
  },
  {
    number: "02",
    title: "Support",
    description:
      "Connecting individuals with compassionate assistance, counselling opportunities, and appropriate support services.",
    icon: LuHandHeart,
  },
  {
    number: "03",
    title: "Empowerment",
    description:
      "Helping people discover their strengths, build confidence, find purpose, and take meaningful steps towards a better future.",
    icon: LuSprout,
  },
  {
    number: "04",
    title: "Outreach",
    description:
      "Taking education, encouragement, and humanitarian support into schools, prisons, communities, and religious institutions.",
    icon: LuGlobe,
  },
];

const commitments = [
  {
    title: "Compassion before judgement",
    description:
      "Every person deserves to be approached with dignity, patience, and understanding.",
    icon: LuHeartHandshake,
  },
  {
    title: "Education that empowers",
    description:
      "We believe accessible knowledge can help individuals and communities make informed decisions.",
    icon: LuBookOpen,
  },
  {
    title: "Communities that care",
    description:
      "Meaningful change grows when people, volunteers, and institutions work together.",
    icon: LuUsers,
  },
];

function AboutPage({ embedded = false }) {
  const { theme } = useTheme();

  return (
    <div
      id={embedded ? "about" : undefined}
      className="min-h-screen scroll-mt-20 overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {!embedded && <Header />}

      <main>
        {/* Who We Are */}
        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em]"
                style={{
                  color: theme.primary,
                  backgroundColor: theme.bgSoft,
                  borderColor: theme.border,
                }}
              >
                <LuHeart size={14} />
                About P-REACH OUT
              </span>

              <h2
                className="mt-6 text-[clamp(2rem,4vw,3.2rem)] leading-[1.15]"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                More Than an Organization,
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  A Community of Care.
                </span>
              </h2>

              <p
                className="mt-5 max-w-2xl text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                P-REACH OUT International is built around a simple belief:
                people should not have to face life's challenges alone.
                Through encouragement, mental-health support, education,
                and community outreach, we work towards a world where
                compassion and dignity are part of every human connection.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story and Founder */}
        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Our Story
              </span>

              <h2
                className="mt-3 text-3xl leading-tight sm:text-4xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Founded in Care,
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  Driven by Purpose.
                </span>
              </h2>

              <div
                className="mt-5 max-w-2xl space-y-4 text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                <p>
                  P-REACH OUT began in 2018 as P-Reach Out Kenya,
                  a grassroots initiative founded by Steve Kinanga
                  Makori. What began with a desire to reach people
                  with care and encouragement developed into an
                  organization committed to supporting individuals
                  and communities.
                </p>

                <p>
                  As its vision grew, the organization became
                  P-REACH OUT International, carrying forward its
                  commitment to mental-health awareness, counselling,
                  education, and humanitarian outreach.
                </p>

                <p>
                  Its work is rooted in the belief that meaningful
                  support should reach beyond the walls of an office.
                  It should extend into schools, prisons, communities,
                  and the places where people need encouragement most.
                </p>
              </div>
            </div>

            {/* Founder Portrait */}
            <figure className="mx-auto w-full max-w-[19rem] text-center">
              <div
                className="overflow-hidden rounded-2xl border shadow-sm"
                style={{ borderColor: theme.border }}
              >
                <img
                  src="/assets/category/founder_portrait/Screenshot%202026-10-27%20231850.png"
                  alt="Steve Kinanga Makori, founder of P-REACH OUT International"
                  className="aspect-[4/5] w-full object-cover object-center"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              <figcaption className="mt-4">
                <h3 className="text-lg font-extrabold">
                  Steve Kinanga Makori
                </h3>

                <p
                  className="mt-1 text-sm font-semibold"
                  style={{ color: theme.primary }}
                >
                  Founder, P-REACH OUT International
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Four Pillars */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
          style={{ backgroundColor: theme.bgSoft }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                What guides us
              </span>

              <h2
                className="mt-3 text-3xl sm:text-4xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Four Pillars.
                <span style={{ color: theme.primary }}>
                  {" "}One Purpose.
                </span>
              </h2>

              <p
                className="mt-4 text-sm leading-7 sm:text-base"
                style={{ color: theme.textMid }}
              >
                Our work is guided by four interconnected commitments
                that shape how we engage with individuals and communities.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <article
                    key={pillar.number}
                    className="rounded-2xl border p-5 sm:p-6"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-bold tracking-widest"
                        style={{ color: theme.primary }}
                      >
                        {pillar.number}
                      </span>

                      <Icon
                        size={23}
                        strokeWidth={1.7}
                        style={{ color: theme.primary }}
                      />
                    </div>

                    <h3 className="mt-6 text-lg font-extrabold">
                      {pillar.title}
                    </h3>

                    <p
                      className="mt-3 text-sm leading-7"
                      style={{ color: theme.textMid }}
                    >
                      {pillar.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Our Approach
              </span>

              <h2
                className="mt-3 text-3xl leading-tight sm:text-4xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                How We Put
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  Care Into Action.
                </span>
              </h2>

              <p
                className="mt-4 text-sm leading-7 sm:text-base"
                style={{ color: theme.textMid }}
              >
                Our purpose is reflected not only in what we say,
                but in how we treat people, share knowledge, and
                engage with the communities around us.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {commitments.map((commitment) => {
                const Icon = commitment.icon;

                return (
                  <article
                    key={commitment.title}
                    className="flex gap-4 rounded-2xl border p-5 sm:p-6"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    }}
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: theme.bgSoft,
                        color: theme.primary,
                      }}
                    >
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="font-bold">
                        {commitment.title}
                      </h3>

                      <p
                        className="mt-2 text-sm leading-6"
                        style={{ color: theme.textMid }}
                      >
                        {commitment.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Membership CTA */}
        <section
          className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8"
        >
          <div
            className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl border p-7 sm:p-10 lg:flex-row lg:items-center"
            style={{
              backgroundColor: theme.bgSoft,
              borderColor: theme.border,
            }}
          >
            <div className="max-w-2xl">
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Become Part of Our Community
              </span>

              <h2
                className="mt-3 text-2xl leading-tight sm:text-3xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                There's a Place for You Here.
              </h2>

              <p
                className="mt-3 text-sm leading-7 sm:text-base"
                style={{ color: theme.textMid }}
              >
                Join the P-REACH OUT community and be part of
                a space built around compassion, connection,
                and encouragement.
              </p>
            </div>

            <Link
              to="/signup"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white no-underline"
              style={{ backgroundColor: theme.primary }}
            >
              Become a Member
              <LuArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AboutPage;
