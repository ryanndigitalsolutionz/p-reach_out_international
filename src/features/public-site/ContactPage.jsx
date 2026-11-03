import {
  LuMail,
  LuPhoneCall,
  LuMessageCircle,
  LuArrowUpRight,
  LuInfo,
  LuHeadset,
  LuClock,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";
import CurvedDivider from "../../components/branding/CurvedDivider.jsx";

const contactOptions = [
  {
    name: "P-REACH OUT International",
    category: "General enquiries",
    description:
      "Reach our team for questions about the organization, its programmes, counselling enquiries, volunteering, and other matters.",
    type: "email",
    value: "preachoutkenya@gmail.com",
    icon: LuMail,
    action: "Email Our Team",
  },
  {
    name: "NACADA",
    category: "Alcohol & substance-use support",
    description:
      "Access counselling, referrals to accredited treatment and rehabilitation facilities, and incident reporting through NACADA's national toll-free helpline.",
    type: "phone",
    value: "1192",
    hours: "Available 24 hours, every day",
    icon: LuPhoneCall,
    action: "Call Toll-Free 1192",
  },
  {
    name: "Befrienders Kenya",
    category: "Emotional & psychological support",
    description:
      "Free and confidential psychological support for people experiencing emotional distress, including those affected by suicidal thoughts and other difficult experiences.",
    type: "whatsapp",
    value: "+254 722 178 177",
    hours: "Monday–Friday, 9 AM–5 PM EAT",
    icon: LuMessageCircle,
    action: "Chat on WhatsApp",
  },
];

function ContactPage({ embedded = false }) {
  const { theme } = useTheme();

  return (
    <div
      id={embedded ? "contact" : undefined}
      className="min-h-screen scroll-mt-20 overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      {!embedded && <Header />}

      <main>
        {/* Contact introduction */}
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
              <LuHeadset size={15} />
              Get in Touch
            </span>

            <div className="mt-6 grid items-end gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <h1
                className="text-[clamp(2.3rem,4.5vw,3.7rem)] leading-[1.12]"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                REACH Out
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  to Us.
                </span>
              </h1>

              <p
                className="max-w-xl text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                Whether you have a question, need guidance,
                want to participate in our work, or simply
                want to connect, we're ready to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact destinations */}
        <section className="px-4 pb-16 pt-5 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Available contact routes
              </span>

              <h2
                className="mt-2 text-2xl sm:text-3xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Find the Right Connection.
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {contactOptions.map((option) => {
                const Icon = option.icon;

                const actionHref =
                  option.type === "email"
                    ? `mailto:${option.value}`
                    : option.type === "phone"
                      ? `tel:${option.value}`
                      : "https://wa.me/254722178177";

                return (
                  <article
                    key={option.name}
                    className="flex h-full flex-col rounded-2xl border p-5 sm:p-6"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: theme.primary }}
                      >
                        {option.category}
                      </span>

                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: theme.bgSoft,
                          color: theme.primary,
                        }}
                      >
                        <Icon size={22} strokeWidth={1.7} />
                      </div>
                    </div>

                    <h3 className="mt-6 text-lg font-extrabold">
                      {option.name}
                    </h3>

                    <p
                      className="mt-3 flex-1 text-sm leading-7"
                      style={{ color: theme.textMid }}
                    >
                      {option.description}
                    </p>

                    <div
                      className="mt-6 border-t pt-5"
                      style={{ borderColor: theme.border }}
                    >
                      <span
                        className="text-xs font-semibold"
                        style={{ color: theme.textMid }}
                      >
                        {option.type === "email"
                          ? "ORGANIZATION EMAIL"
                          : option.type === "phone"
                            ? "TOLL-FREE HELPLINE"
                            : "WHATSAPP CONTACT"}
                      </span>

                      <p
                        className="mt-2 break-words text-sm font-bold"
                        style={{ color: theme.text }}
                      >
                        {option.value}
                      </p>

                      {option.hours && (
                        <p
                          className="mt-3 flex items-center gap-2 text-xs font-medium"
                          style={{ color: theme.textMid }}
                        >
                          <LuClock
                            size={14}
                            className="shrink-0"
                          />
                          {option.hours}
                        </p>
                      )}

                      <a
                        href={actionHref}
                        target={
                          option.type === "whatsapp"
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          option.type === "whatsapp"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold text-white no-underline transition-opacity hover:opacity-85"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {option.type === "email" ? (
                          <LuMail size={16} />
                        ) : option.type === "phone" ? (
                          <LuPhoneCall size={16} />
                        ) : (
                          <LuMessageCircle size={16} />
                        )}

                        {option.action}
                        <LuArrowUpRight size={16} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* General enquiry */}
        <section
          className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
          style={{ backgroundColor: theme.bgSoft }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <span
                className="text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                We're Listening
              </span>

              <h2
                className="mt-3 text-3xl leading-tight sm:text-4xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Every Conversation
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  Starts Somewhere.
                </span>
              </h2>

              <p
                className="mt-4 text-sm leading-7 sm:text-base sm:leading-8"
                style={{ color: theme.textMid }}
              >
                For general enquiries, questions about our work,
                or opportunities to collaborate, reach our team
                directly through the organizational email.
              </p>
            </div>

            <a
              href="mailto:preachoutkenya@gmail.com"
              className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full px-6 py-3 text-sm font-bold text-white no-underline transition-opacity hover:opacity-85"
              style={{ backgroundColor: theme.primary }}
            >
              <LuMail size={18} />
              Send Us an Email
              <LuArrowUpRight size={17} />
            </a>
          </div>
        </section>

        {/* Important information */}
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div
            className="mx-auto flex max-w-6xl items-start gap-3 rounded-2xl border p-4 sm:p-5"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <LuInfo
              size={20}
              className="mt-0.5 shrink-0"
              style={{ color: theme.primary }}
            />

            <p
              className="text-sm leading-7"
              style={{ color: theme.textMid }}
            >
              P-REACH OUT's website and general email are not
              emergency-response services. NACADA's 1192 line
              provides 24-hour counselling and referrals for
              alcohol and substance-use concerns. Befrienders
              Kenya's WhatsApp support operates Monday to Friday,
              9 AM–5 PM EAT. For immediate danger, contact local
              emergency services or seek urgent medical care.
            </p>
          </div>
        </section>
      </main>

      {/* Boundary: ContactPage → SiteFooter */}
      <CurvedDivider
        backgroundColor={theme.bg}
        waveColor={theme.bg}
        domeColor={theme.primary}
        domeOpacity={0.16}
      />
    </div>
  );
}

export default ContactPage;
