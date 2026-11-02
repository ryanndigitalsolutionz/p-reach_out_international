
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://ke.linkedin.com/in/steve-makori-651126211",
    icon: "/assets/category/icons/linkedin.png",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@preachoutfmtv",
    icon: "/assets/category/icons/youtube.png",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/14uNwzPf2Dg/?mibextid=wwXIfr",
    icon: "/assets/category/icons/facebook.png",
  },
];

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "Who We Are", to: "/about" },
      { label: "What We Offer", to: "/our-offer" },
      { label: "Our Programs", to: "/programs" },
      { label: "Mental Health Library", to: "/library" },
      { label: "Frequently Asked Questions", to: "/faq" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Support Our Missions", to: "/donations" },
      { label: "Contact Us", to: "/contact" },
      { label: "P-REACH News", to: "/p-reach-news" },
    ],
  },
  {
    title: "Our Work",
    links: [
      { label: "Individual Counselling", to: "/counselling" },
      { label: "Mental Health Education", to: "/our-offer" },
      { label: "Community Outreach", to: "/programs" },
      { label: "Crisis Support", to: "/our-offer" },
    ],
  },
];

export default function SiteFooter() {
  const { theme } = useTheme();

  return (
    <footer
      className="border-t px-5 pb-6 pt-16 sm:px-8 lg:px-12"
      style={{
        backgroundColor: theme.navBg,
        color: theme.text,
        borderColor: theme.border,
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Main footer content */}
        <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">

          {/* Organization identity */}
          <div className="max-w-sm">
            <Link
              to="/"
              aria-label="P-REACH OUT International home"
              className="inline-flex items-center gap-3 no-underline"
            >
              <img
                src="/logo/static/P-Reach_Out_Int_Brand.svg"
                alt=""
                className="h-14 w-14 rounded-xl bg-white object-contain p-1"
                draggable={false}
              />

              <span className="flex flex-col leading-tight">
                <span className="text-lg font-extrabold">
                  P-REACH OUT
                </span>
                <span
                  className="text-xs font-bold tracking-[0.18em]"
                  style={{ color: theme.primary }}
                >
                  INTERNATIONAL
                </span>
              </span>
            </Link>

            <p
              className="mt-6 text-sm leading-7"
              style={{ color: theme.textMid }}
            >
              A community built around encouragement, mental-health
              awareness, education, counselling, and humanitarian
              outreach. We believe people should not have to face
              life's challenges alone.
            </p>

            <p
              className="mt-5 text-xl"
              style={{
                color: theme.primary,
                fontFamily: '"Story Script", cursive',
              }}
            >
              A Friend Stays There
            </p>

            {/* Social media */}
            <div className="mt-7">
              <p className="mb-3 text-sm font-bold">
                Connect with us
              </p>

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit P-REACH OUT on ${social.name}`}
                    title={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border transition-opacity hover:opacity-70"
                    style={{
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    }}
                  >
                    <img
                      src={social.icon}
                      alt=""
                      className="h-5 w-5 object-contain"
                      draggable={false}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-sm font-extrabold uppercase tracking-wider">
                {group.title}
              </h3>

              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="inline-flex items-center gap-1 text-sm no-underline transition-opacity hover:opacity-65"
                      style={{ color: theme.textMid }}
                    >
                      {link.label}
                      <FiArrowUpRight
                        aria-hidden="true"
                        size={13}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div
          className="flex flex-col justify-between gap-5 border-y py-7 sm:flex-row sm:items-center"
          style={{ borderColor: theme.border }}
        >
          <div>
            <h3 className="text-base font-bold">
              Need to reach out?
            </h3>
            <p
              className="mt-1 text-sm"
              style={{ color: theme.textMid }}
            >
              Get in touch with the P-REACH OUT team.
            </p>
          </div>

          <a
            href="mailto:preachoutkenya@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-bold no-underline"
            style={{ color: theme.primary }}
          >
            <FiMail size={18} />
            preachoutkenya@gmail.com
            <FiArrowUpRight size={15} />
          </a>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col justify-between gap-4 pt-6 text-xs sm:flex-row sm:items-center">
          <p style={{ color: theme.textMid }}>
            © {new Date().getFullYear()} P-REACH OUT International.
            All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              to="/policies/privacy"
              className="no-underline hover:opacity-70"
              style={{ color: theme.textMid }}
            >
              Privacy Policy
            </Link>

            <Link
              to="/policies/terms"
              className="no-underline hover:opacity-70"
              style={{ color: theme.textMid }}
            >
              Terms of Service
            </Link>

            <Link
              to="/policies/payments"
              className="no-underline hover:opacity-70"
              style={{ color: theme.textMid }}
            >
              Payment Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
