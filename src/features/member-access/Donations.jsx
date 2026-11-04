import { useTheme } from "../../contexts/ThemeContext.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

export default function Donations() {
  const { theme } = useTheme();

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: theme.bg, color: theme.text }}
    >
      <section className="relative isolate flex min-h-[390px] items-center justify-center overflow-hidden px-5 py-20 sm:min-h-[470px] sm:px-8">
        <img
          src="/assets/category/image_references/donations-intro.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#171727]/95 via-[#211d32]/85 to-[#28253b]/90" />
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-rose-300 sm:text-sm">
            P-REACH OUT International
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Your Gift Changes Lives
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/80 sm:text-lg md:text-xl">
            Every donation helps support counselling, crisis intervention, and
            community outreach for people who need it most.
          </p>
        </div>
      </section>

      <section
        className="mx-auto flex min-h-[360px] w-full max-w-6xl flex-col items-center justify-center px-5 py-16 text-center sm:px-8"
        aria-labelledby="donations-coming-soon"
      >
        <h2
          id="donations-coming-soon"
          className="text-2xl font-extrabold tracking-tight sm:text-3xl"
        >
          Donations Coming Soon
        </h2>
        <p
          className="mt-4 max-w-2xl text-base leading-7"
          style={{ color: theme.textMid }}
        >
          We're preparing a secure way for you to support P-REACH OUT's work.
          Please check back soon.
        </p>
        <Spinner
          label="Coming Soon"
          size="lg"
          className="mt-9"
        />
      </section>
    </main>
  );
}
