import { useState } from "react";
import IndividualDonate from "../../components/payments/IndividualDonate.jsx";

const donationOptions = [
  { id: "individual", label: "Individual Donations" },
  { id: "fundraise", label: "Fundraises" },
];

function FundraisePlaceholder() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-16 text-center sm:px-8">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-rose-600">
        Support a mission
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Make a difference where it matters
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
        Contributions to specific P-REACH OUT missions and outreach campaigns
        will be listed here. Each fundraiser will explain its purpose and the
        support it needs.
      </p>
      <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-6 text-slate-500 shadow-sm dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400">
        Mission fundraisers are being prepared. Please use Individual Donations
        in the meantime to support P-REACH OUT's ongoing work.
      </div>
    </section>
  );
}

export default function Donations() {
  const [activeOption, setActiveOption] = useState("individual");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#171727] dark:text-white">
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

      <section className="mx-auto w-full max-w-6xl px-5 pb-8 pt-10 sm:px-8 sm:pt-14">
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-4 dark:border-white/10" role="tablist" aria-label="Donation types">
          {donationOptions.map((option) => {
            const selected = activeOption === option.id;

            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                id={`donation-tab-${option.id}`}
                aria-selected={selected}
                aria-controls={`donation-panel-${option.id}`}
                onClick={() => setActiveOption(option.id)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#171727] sm:px-7 sm:text-base ${
                  selected
                    ? "bg-rose-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/10"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div
          id="donation-panel-individual"
          role="tabpanel"
          aria-labelledby="donation-tab-individual"
          hidden={activeOption !== "individual"}
          className="min-h-[420px]"
        >
          <IndividualDonate />
        </div>

        <div
          id="donation-panel-fundraise"
          role="tabpanel"
          aria-labelledby="donation-tab-fundraise"
          hidden={activeOption !== "fundraise"}
          className="min-h-[420px]"
        >
          <FundraisePlaceholder />
        </div>
      </section>
    </main>
  );
}
