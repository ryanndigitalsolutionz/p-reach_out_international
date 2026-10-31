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
        <section className="relative px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">

            {/* Hero content */}
            <div className="min-w-0">
              <p
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] sm:text-xs"
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
                className="max-w-3xl text-[clamp(2.5rem,3.2vw,3.5rem)] leading-[1.12]"
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
                className="mt-5 max-w-xl text-sm leading-7 sm:text-base"
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
                className="mt-4 text-xl sm:text-2xl"
                style={{
                  fontFamily: '"Story Script", cursive',
                  color: theme.primary,
                }}
              >
                A Friend Stays There
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/about"
                  className="inline-flex min-h-10 items-center justify-center rounded-full px-5 py-2.5 text-xs font-bold text-white no-underline transition-transform hover:-translate-y-0.5 sm:text-sm"
                  style={{ backgroundColor: theme.primary }}
                >
                  Learn More <span className="ml-2">↗</span>
                </Link>

                <Link
                  to="/donations"
                  className="inline-flex min-h-10 items-center justify-center rounded-full border px-5 py-2.5 text-xs font-bold no-underline transition-opacity hover:opacity-70 sm:text-sm"
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
            <div className="relative mx-auto w-full max-w-[34rem]">
              <div
                className="absolute -inset-3 rounded-[2rem] opacity-60 blur-xl sm:-inset-4"
                style={{ backgroundColor: theme.bgSoft }}
                aria-hidden="true"
              />

              <div
                className="relative rounded-[1.5rem] border p-4 shadow-sm sm:p-6"
                style={{
                  backgroundColor: theme.bgSoft,
                  borderColor: theme.border,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.15em] sm:text-xs"
                    style={{ color: theme.textMid }}
                  >
                    Our guiding motto
                  </span>

                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-bold sm:text-xs"
                    style={{
                      color: theme.primary,
                      backgroundColor: theme.card,
                    }}
                  >
                    P-REACH OUT
                  </span>
                </div>

                <div className="mx-auto my-5 flex aspect-square w-full max-w-[16rem] items-center justify-center overflow-hidden rounded-[1.25rem] bg-white p-3 sm:my-6 sm:p-4">
                  <img
                    src="/logo/static/P-Reach_Out_Int_Brand.svg"
                    alt="P-REACH OUT International reaching-hands brand artwork"
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    className="h-full w-full select-none object-contain"
                  />
                </div>

                <p
                  className="text-center text-xl sm:text-2xl"
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