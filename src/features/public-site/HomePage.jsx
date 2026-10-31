import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <div
      id="home"
      className="min-h-screen overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      <Header />

      <main>
        {/* Homepage Hero */}
        <section
          className="relative px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-20 lg:px-12 lg:pt-24"
        >
          <div
            className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
          >
            {/* Hero content */}
            <div className="min-w-0">
              <p
                className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] sm:text-sm"
                style={{
                  color: theme.primary,
                  borderColor: theme.border,
                  backgroundColor: theme.bgSoft,
                }}
              >
                <span aria-hidden="true">✦</span>
                Compassion · Community · Connection
              </p>

              <h1
                className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Reaching Out,
                <span
                  className="block"
                  style={{ color: theme.primary }}
                >
                  Healing Minds,
                </span>
                Empowering Lives!
              </h1>

              <p
                className="mt-6 max-w-2xl text-base leading-8 sm:text-lg"
                style={{
                  fontFamily: '"Nunito Sans", sans-serif',
                  color: theme.textMid,
                }}
              >
                P-REACH OUT International is a community built around
                encouragement, socioeconomic support and making a meaningful
                difference. We believe every person deserves to be met with
                compassion and dignity.
              </p>

              <p
                className="mt-5 text-2xl sm:text-3xl"
                style={{
                  fontFamily: '"Story Script", cursive',
                  color: theme.primary,
                }}
              >
                A Friend Stays There
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white no-underline transition-transform hover:-translate-y-0.5 sm:text-base"
                  style={{ backgroundColor: theme.primary }}
                >
                  Learn More <span className="ml-2">↗</span>
                </Link>

                <Link
                  to="/donations"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 text-sm font-bold no-underline transition-opacity hover:opacity-70 sm:text-base"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                >
                  Support Our Missions
                </Link>
              </div>
            </div>

            {/* Brand artwork card */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div
                className="absolute -inset-4 rounded-[2.5rem] opacity-60 blur-xl sm:-inset-6"
                style={{ backgroundColor: theme.bgSoft }}
                aria-hidden="true"
              />

              <div
                className="relative rounded-[2rem] border p-5 shadow-sm sm:p-8"
                style={{
                  backgroundColor: theme.bgSoft,
                  borderColor: theme.border,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-xs font-bold uppercase tracking-[0.15em]"
                    style={{ color: theme.textMid }}
                  >
                    Our guiding motto
                  </span>

                  <span
                    className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{
                      color: theme.primary,
                      backgroundColor: theme.card,
                    }}
                  >
                    P-REACH OUT
                  </span>
                </div>

                <div className="mx-auto my-7 flex aspect-square w-full max-w-[18rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-white p-3 sm:my-9 sm:p-5">
                  <img
                    src="/logo/static/P-Reach_Out_Int_Brand.svg"
                    alt="P-REACH OUT International reaching-hands brand artwork"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    className="h-full w-full select-none object-contain"
                  />
                </div>

                <p
                  className="text-center text-2xl sm:text-3xl"
                  style={{
                    fontFamily: '"Story Script", cursive',
                    color: theme.primary,
                  }}
                >
                  A Friend Stays There
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}