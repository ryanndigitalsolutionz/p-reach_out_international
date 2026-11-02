
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LuChevronDown,
  LuCircleHelp,
  LuArrowUpRight,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";

const questions = [
  {
    id: "what-is",
    question: "What is P-REACH OUT?",
    answer: (
      <>
        <p>
          P-REACH OUT International is a community-focused organization
          built around encouragement, mental-health awareness, counselling,
          education, socioeconomic support, and humanitarian outreach.
        </p>
        <p>
          Founded in 2018 as P-Reach Out Kenya, it aims to help individuals
          and communities access support, learn, connect, and find
          encouragement through life's challenges.
        </p>
      </>
    ),
  },
  {
    id: "leadership",
    question: "Who runs P-REACH OUT International?",
    answer: (
      <>
        <p>
          P-REACH OUT was founded by Steve Kinanga Makori in 2018.
          He works with a team and a wider network of counsellors,
          advocates, volunteers, and community partners.
        </p>
        <p>
          The organization also connects with counsellors associated
          with NACADA and Befrienders Kenya to help people find
          appropriate support and referral services.
        </p>
      </>
    ),
  },
  {
    id: "member-activities",
    question: "How do signed-in members keep track of activities within P-REACH OUT?",
    answer: (
      <>
        <p>
          Members use their personal dashboard as their central place
          to follow activity within the platform.
        </p>
        <p>
          Depending on their access and the features available, members
          can keep track of check-ins and assessments, milestones,
          group activities, P-REACH News, People Hub discussions,
          and their personal journals and resources.
        </p>
        <p>
          The aim is to give members a clearer view of their participation,
          progress, and connection with the wider community.
        </p>
      </>
    ),
  },
  {
    id: "donations",
    question: "Where do my donations and gifts go?",
    answer: (
      <>
        <p>
          Contributions help support P-REACH OUT's work, including
          education, community outreach, counselling-related support,
          and humanitarian programmes.
        </p>
        <p>
          The organization has different ways to contribute:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Individual donations:</strong> Contributions that
            help support the organization's general work.
          </li>
          <li>
            <strong>Mission fundraisers:</strong> Contributions raised
            towards a particular mission or programme shared by
            P-REACH OUT.
          </li>
          <li>
            <strong>Sponsorships:</strong> Larger, often private
            contributions from businesses or organizations to support
            or accelerate a programme or mission, sometimes through
            active collaboration.
          </li>
        </ul>
        <p>
          The exact use of funds depends on the purpose of the
          contribution and the needs of the supported work. For
          details about a specific campaign or contribution,
          please contact the organization.
        </p>
      </>
    ),
  },
  {
    id: "features",
    question: "What features are unique to P-REACH OUT?",
    answer: (
      <>
        <p>
          P-REACH OUT brings community support and educational
          resources together with a dedicated member platform.
          Its goal is to make participation and connection easier
          to follow in one place.
        </p>
        <p>Some of the platform's features include:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Check-ins and assessments:</strong> Structured
            questions that help members reflect on mental well-being
            and sobriety-related topics.
          </li>
          <li>
            <strong>People Hub:</strong> A space for member
            interaction and community discussions.
          </li>
          <li>
            <strong>Groups:</strong> Spaces for members to participate
            in shared activities and discussions.
          </li>
          <li>
            <strong>Milestones and badges:</strong> Recognition of
            participation and personal progress.
          </li>
          <li>
            <strong>Journals and readables:</strong> Personal
            reflection and access to reading materials.
          </li>
          <li>
            <strong>P-REACH News:</strong> Updates about community
            activities, outreach, and missions.
          </li>
        </ul>
        <p>
          Features may be introduced or updated as the platform
          develops. These tools complement human support; they
          are not a replacement for professional care.
        </p>
      </>
    ),
  },
  {
    id: "nonprofit",
    question: "Is P-REACH OUT a non-profit organization?",
    answer: (
      <>
        <p>
          Yes! P-REACH OUT operates with a non-profit,
          community-focused purpose. Its work is intended to
          support individuals and communities rather than
          generate commercial profits for owners or shareholders.
        </p>
        <p>
          Donations, fundraising, and sponsorships help sustain
          its programmes and outreach activities. For formal
          registration, governance, or financial documentation,
          please contact the organization.
        </p>
      </>
    ),
  },
  {
    id: "connect-members",
    question: "How do I connect with other members who have signed in?",
    answer: (
      <>
        <p>
          After creating an account and signing in, you can explore
          the People Hub and available group spaces.
        </p>
        <p>
          The People Hub provides opportunities to see community
          posts and participate in discussions, while groups under the Custom Community Circle bring
          members together around shared interests and activities.
        </p>
        <p>
          Please be considerate of other members and avoid sharing
          sensitive personal information in public discussions.
        </p>
      </>
    ),
  },
];

function FAQ({ embedded = false }) {
  const { theme } = useTheme();
  const [openQuestion, setOpenQuestion] = useState(questions[0].id);

  const toggleQuestion = (id) => {
    setOpenQuestion((current) => (current === id ? null : id));
  };

  return (
    <div
      id={embedded ? "faq" : undefined}
      className="min-h-screen scroll-mt-20 overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {!embedded && <Header />}

      <main>
        {/* FAQ introduction */}
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
              <LuCircleHelp size={15} />
              Frequently Asked Questions
            </span>

            <div className="mt-6 grid items-end gap-5 lg:grid-cols-[1fr_0.9fr]">
              <h1
                className="text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.12]"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Questions?
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  We're Here to Help.
                </span>
              </h1>

              <p
                className="max-w-xl text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                Learn more about P-REACH OUT, our work, the
                member platform, and the ways you can take part.
              </p>
            </div>
          </div>
        </section>

        {/* Questions and answers */}
        <section className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-3">
            {questions.map((item, index) => {
              const isOpen = openQuestion === item.id;
              const answerId = `faq-answer-${item.id}`;

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleQuestion(item.id)}
                    className="flex w-full items-center gap-4 px-4 py-5 text-left sm:px-6"
                    style={{ color: theme.text }}
                  >
                    <span
                      className="shrink-0 text-xs font-bold tracking-widest"
                      style={{ color: theme.primary }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 text-sm font-bold sm:text-base">
                      {item.question}
                    </span>

                    <LuChevronDown
                      size={19}
                      className={`shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{ color: theme.primary }}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={answerId}
                      className="border-t px-4 py-5 sm:px-6"
                      style={{
                        borderColor: theme.border,
                        color: theme.textMid,
                      }}
                    >
                      <div className="space-y-4 text-sm leading-7 sm:text-base sm:leading-8">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* Additional assistance */}
        <section
          className="px-4 py-12 sm:px-6 sm:py-14 lg:px-8"
          style={{ backgroundColor: theme.bgSoft }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <h2
              className="text-2xl sm:text-3xl"
              style={{ fontFamily: '"Carter One", sans-serif' }}
            >
              Still Have Questions?
            </h2>

            <p
              className="mx-auto mt-3 max-w-xl text-sm leading-7 sm:text-base"
              style={{ color: theme.textMid }}
            >
              Our team can help you find the information or
              support you need.
            </p>

            <Link
              to="/contact"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-white no-underline transition-opacity hover:opacity-85"
              style={{ backgroundColor: theme.primary }}
            >
              Contact P-REACH OUT
              <LuArrowUpRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default FAQ;
