import { useMemo, useState } from "react";

const currencyOptions = [
  { code: "KES", label: "Kenyan Shilling", symbol: "KSh", presets: [500, 1000, 2500, 5000, 10000, 20000] },
  { code: "USD", label: "US Dollar", symbol: "$", presets: [5, 10, 25, 50, 100, 200] },
  { code: "GBP", label: "British Pound", symbol: "£", presets: [5, 10, 20, 50, 100, 150] },
  { code: "EUR", label: "Euro", symbol: "€", presets: [5, 10, 20, 50, 100, 150] },
];

const frequencies = [
  { value: "one_time", label: "One-time" },
  { value: "monthly", label: "Monthly" },
  { value: "annually", label: "Annually" },
];

export default function IndividualDonate({ onContinue }) {
  const [frequency, setFrequency] = useState("one_time");
  const [currency, setCurrency] = useState("KES");
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [dedicationEnabled, setDedicationEnabled] = useState(false);
  const [dedicationType, setDedicationType] = useState("in_honour_of");
  const [dedicationName, setDedicationName] = useState("");
  const [dedicationMessage, setDedicationMessage] = useState("");

  const selectedCurrency = useMemo(
    () => currencyOptions.find((option) => option.code === currency) ?? currencyOptions[0],
    [currency]
  );

  const currentAmount = customAmount.trim() === "" ? amount : Number(customAmount);
  const validAmount = Number.isFinite(currentAmount) && currentAmount > 0;
  const formattedAmount = validAmount
    ? new Intl.NumberFormat("en", {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }).format(currentAmount)
    : `${selectedCurrency.symbol}0.00`;

  function handleCurrencyChange(event) {
    const nextCurrency = event.target.value;
    const nextOption = currencyOptions.find((option) => option.code === nextCurrency);

    setCurrency(nextCurrency);
    setCustomAmount("");
    setAmount(nextOption?.presets[1] ?? 1000);
  }

  function handlePresetSelect(value) {
    setAmount(value);
    setCustomAmount("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validAmount || typeof onContinue !== "function") return;

    onContinue({
      donationType: "individual",
      amount: currentAmount,
      currency,
      frequency,
      dedication: dedicationEnabled
        ? {
            type: dedicationType,
            name: dedicationName.trim(),
            message: dedicationMessage.trim(),
          }
        : null,
    });
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-1 py-10 sm:px-3 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-rose-600 dark:text-rose-400">
          Individual donations
        </p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Be the one to P-REACH OUT today.
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">
          Support life-changing mental health services and crisis intervention
          for vulnerable young people across East Africa.
        </p>

        <div className="mt-7 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300">
          <p>
            According to the <strong className="font-semibold text-slate-900 dark:text-white">Kenya National Adolescent Mental Health Survey (K-NAMHS)</strong>,
            44.3% of adolescents aged 10–17 experienced a mental health problem
            in the previous 12 months.
            {" "}
            <a
              href="https://aphrc.org/wp-content/uploads/2022/10/K-NAMHS-report_2022.pdf"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-rose-700 underline decoration-rose-300 underline-offset-4 hover:text-rose-600 dark:text-rose-300 dark:decoration-rose-500/60 dark:hover:text-rose-200"
            >
              Read the K-NAMHS report
            </a>
            .
          </p>
          <p>
            Yet only 11.1% of adolescents with a mental health problem had used
            a support or counselling service during that period.
          </p>
          <p>
            Your donation helps P-REACH OUT expand access to confidential
            counselling, crisis support, and localized community networks —
            giving young people somewhere to turn when they need support most.
          </p>
        </div>
      </div>

      <div className="mt-11 rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] dark:border-white/10 dark:bg-[#201f32] dark:shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:p-8">
        <div className="mb-7">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Make your donation</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Choose how often you would like to give and the amount that works for you.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 rounded-full bg-slate-100 p-1 dark:bg-white/[0.07]" role="group" aria-label="Donation frequency">
            {frequencies.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={frequency === option.value}
                onClick={() => setFrequency(option.value)}
                className={`rounded-full px-2 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 sm:text-base ${
                  frequency === option.value
                    ? "bg-rose-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-7">
            <p className="mb-4 text-center text-sm font-medium text-slate-700 dark:text-slate-300">
              Choose an amount to donate {frequency === "one_time" ? "once" : frequency === "monthly" ? "each month" : "each year"}.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {selectedCurrency.presets.map((preset, index) => {
                const selected = customAmount === "" && amount === preset;

                return (
                  <button
                    key={`${currency}-${preset}`}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handlePresetSelect(preset)}
                    className={`relative min-h-14 rounded-2xl border px-3 py-3 text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                      selected
                        ? "border-rose-600 bg-rose-50 text-rose-700 dark:border-rose-400 dark:bg-rose-500/10 dark:text-rose-200"
                        : "border-slate-200 bg-white text-slate-800 hover:border-rose-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-100 dark:hover:border-rose-400/60"
                    }`}
                  >
                    {new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }).format(preset)}
                    {index === 1 && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-rose-700 dark:bg-rose-500/20 dark:text-rose-200">
                        Suggested
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_220px]">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Custom amount</span>
              <div className="flex min-h-14 items-center rounded-2xl border border-slate-200 bg-white px-4 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/15 dark:border-white/10 dark:bg-white/[0.03]">
                <span className="mr-3 text-sm font-semibold text-slate-500 dark:text-slate-400">{selectedCurrency.symbol}</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  inputMode="decimal"
                  value={customAmount}
                  onChange={(event) => setCustomAmount(event.target.value)}
                  placeholder="Enter an amount"
                  className="w-full border-0 bg-transparent py-3 text-lg font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0 dark:text-white"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Currency</span>
              <select
                value={currency}
                onChange={handleCurrencyChange}
                className="min-h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15 dark:border-white/10 dark:bg-[#25243a] dark:text-white"
              >
                {currencyOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.code} — {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-white/[0.03]">
            <label className="flex cursor-pointer items-center justify-between gap-4">
              <span>
                <span className="block font-semibold text-slate-800 dark:text-white">Dedicate my donation</span>
                <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">Give in someone's honour or memory.</span>
              </span>
              <input
                type="checkbox"
                checked={dedicationEnabled}
                onChange={(event) => setDedicationEnabled(event.target.checked)}
                className="h-5 w-5 shrink-0 accent-rose-600"
              />
            </label>

            {dedicationEnabled && (
              <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 dark:border-white/10">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Dedication type</span>
                  <select
                    value={dedicationType}
                    onChange={(event) => setDedicationType(event.target.value)}
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-rose-500 dark:border-white/10 dark:bg-[#25243a] dark:text-white"
                  >
                    <option value="in_honour_of">In honour of</option>
                    <option value="in_memory_of">In memory of</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Name (optional)</span>
                  <input
                    type="text"
                    value={dedicationName}
                    onChange={(event) => setDedicationName(event.target.value)}
                    maxLength={120}
                    placeholder="Enter a name"
                    className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-rose-500 dark:border-white/10 dark:bg-[#25243a] dark:text-white"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Message (optional)</span>
                  <textarea
                    value={dedicationMessage}
                    onChange={(event) => setDedicationMessage(event.target.value)}
                    maxLength={500}
                    rows={3}
                    placeholder="Add a short dedication message"
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-rose-500 dark:border-white/10 dark:bg-[#25243a] dark:text-white"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Your donation</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{formattedAmount}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {frequency === "one_time" ? "One-time contribution" : frequency === "monthly" ? "Recurring monthly contribution" : "Recurring annual contribution"}
              </p>
            </div>
            <button
              type="submit"
              disabled={!validAmount || typeof onContinue !== "function"}
              className="min-h-14 rounded-full bg-rose-600 px-8 py-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:focus-visible:ring-offset-[#201f32] dark:disabled:bg-white/10 dark:disabled:text-slate-500"
            >
              {typeof onContinue === "function" ? "Continue to payment" : "Payment setup pending"}
            </button>
          </div>

          {typeof onContinue !== "function" && (
            <p className="mt-4 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
              The donation form is ready for integration. Payment processing will be enabled after an approved donation provider is configured.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
