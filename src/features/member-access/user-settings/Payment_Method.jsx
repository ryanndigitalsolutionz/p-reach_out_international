
import { useState } from "react";
import {
  LuCreditCard,
  LuSmartphone,
  LuHandHeart,
  LuUsers,
  LuCheck,
  LuInfo,
  LuSave,
  LuShieldCheck,
  LuClock,
  LuWallet,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";
import { MemberShell } from "../Dashboard.jsx";

const SESSION_KEY = "p-reach-out:preview-session:v1";
const PREFERENCE_KEY_PREFIX =
  "p-reach-out:preview-payment-preferences:";

const paymentMethods = [
  {
    id: "card",
    title: "Bank Card",
    subtitle: "Visa & Mastercard",
    description:
      "Use a debit or credit card through a secure payment provider checkout.",
    icon: LuCreditCard,
    note: "Provider-hosted card entry",
  },
  {
    id: "mpesa",
    title: "M-Pesa",
    subtitle: "Safaricom",
    description:
      "Approve a payment using an M-Pesa prompt sent to your mobile number.",
    icon: LuSmartphone,
    note: "One-time payments",
  },
];

function getUserId() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);

    if (!stored) return "preview-guest";

    const session = JSON.parse(stored);

    return session?.userId || "preview-guest";
  } catch {
    return "preview-guest";
  }
}

function readPreferences(userId) {
  try {
    const stored = localStorage.getItem(
      `${PREFERENCE_KEY_PREFIX}${userId}`
    );

    if (!stored) {
      return {
        donations: "",
        groupFunds: "",
      };
    }

    const preferences = JSON.parse(stored);

    const validMethod = (value) =>
      ["card", "mpesa"].includes(value) ? value : "";

    return {
      donations: validMethod(preferences.donations),
      groupFunds: validMethod(preferences.groupFunds),
    };
  } catch {
    return {
      donations: "",
      groupFunds: "",
    };
  }
}

function PaymentMethodOption({
  method,
  selected,
  onSelect,
  theme,
}) {
  const Icon = method.icon;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="flex min-h-full w-full flex-col rounded-2xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 sm:p-5"
      style={{
        backgroundColor: selected ? theme.bgSoft : theme.card,
        borderColor: selected ? theme.primary : theme.border,
        "--tw-ring-color": theme.primary,
      }}
    >
      <div className="flex w-full items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            backgroundColor: theme.bgSoft,
            color: theme.primary,
          }}
        >
          <Icon size={23} />
        </div>

        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
          style={{
            borderColor: selected ? theme.primary : theme.border,
            backgroundColor: selected
              ? theme.primary
              : "transparent",
            color: "#FFFFFF",
          }}
        >
          {selected && <LuCheck size={14} />}
        </span>
      </div>

      <h3
        className="mt-4 text-base font-bold"
        style={{ color: theme.text }}
      >
        {method.title}
      </h3>

      <p
        className="mt-1 text-xs font-semibold"
        style={{ color: theme.primary }}
      >
        {method.subtitle}
      </p>

      <p
        className="mt-3 flex-1 text-xs leading-6"
        style={{ color: theme.textMid }}
      >
        {method.description}
      </p>

      <div
        className="mt-4 border-t pt-3 text-[10px] font-bold uppercase tracking-wide"
        style={{
          borderColor: theme.border,
          color: theme.textMid,
        }}
      >
        {method.note}
      </div>
    </button>
  );
}

function PaymentMethodSection({
  title,
  description,
  icon: Icon,
  value,
  onChange,
  theme,
}) {
  return (
    <section
      className="rounded-3xl border p-5 shadow-sm sm:p-7"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <div className="mb-6 flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: theme.bgSoft,
            color: theme.primary,
          }}
        >
          <Icon size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold">
            {title}
          </h2>

          <p
            className="mt-1 text-xs leading-5"
            style={{ color: theme.textMid }}
          >
            {description}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {paymentMethods.map((method) => (
          <PaymentMethodOption
            key={method.id}
            method={method}
            selected={value === method.id}
            onSelect={() => onChange(method.id)}
            theme={theme}
          />
        ))}
      </div>

      {!value && (
        <p
          className="mt-4 text-xs"
          style={{ color: theme.textMid }}
        >
          No preferred payment method selected.
        </p>
      )}

      {value && (
        <p
          className="mt-4 flex items-center gap-2 text-xs font-semibold"
          style={{ color: theme.primary }}
        >
          <LuCheck size={15} />
          {paymentMethods.find((method) => method.id === value)?.title}
          {" "}selected as your preference.
        </p>
      )}
    </section>
  );
}

function Payment_Method() {
  const { theme } = useTheme();

  const [userId] = useState(getUserId);

  const [preferences, setPreferences] = useState(() =>
    readPreferences(userId)
  );

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const updatePreference = (field, value) => {
    setPreferences((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  };

  const handleSave = () => {
    try {
      const updatedPreferences = {
        ...preferences,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        `${PREFERENCE_KEY_PREFIX}${userId}`,
        JSON.stringify(updatedPreferences)
      );

      setSaved(true);
      setError("");
    } catch {
      setSaved(false);
      setError(
        "Your preferences could not be saved in this browser."
      );
    }
  };

  return (
    <MemberShell>
      <main className="mx-auto w-full max-w-[1100px] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
        {/* Page heading */}
        <header className="mb-8">
          <p
            className="text-xs font-bold uppercase tracking-[0.17em]"
            style={{ color: theme.primary }}
          >
            Member Settings
          </p>

          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Payment Methods
          </h1>

          <p
            className="mt-3 max-w-2xl text-sm leading-7"
            style={{ color: theme.textMid }}
          >
            Choose how you would prefer to make contributions
            and participate in group funding within P-REACH OUT.
          </p>
        </header>

        {/* Provider availability notice */}
        <section
          className="mb-7 rounded-3xl border p-5 sm:p-6"
          style={{
            backgroundColor: theme.bgSoft,
            borderColor: theme.border,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: theme.card,
                color: theme.primary,
              }}
            >
              <LuClock size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-bold">
                  Payment integration is being prepared
                </h2>

                <span
                  className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                  style={{
                    backgroundColor: theme.card,
                    color: theme.textMid,
                  }}
                >
                  Preview
                </span>
              </div>

              <p
                className="mt-2 text-xs leading-6"
                style={{ color: theme.textMid }}
              >
                Paystack and Pesapal are being considered for
                future payment processing. Gateway onboarding
                and organisational documentation must be
                completed before these methods can be activated.
              </p>
            </div>
          </div>
        </section>

        {/* P-REACH OUT contributions */}
        <div className="space-y-6">
          <PaymentMethodSection
            title="Support P-REACH OUT"
            description="Choose your preferred channel for future individual contributions and donations."
            icon={LuHandHeart}
            value={preferences.donations}
            onChange={(value) =>
              updatePreference("donations", value)
            }
            theme={theme}
          />

          {/* Custom Community Circle */}
          <PaymentMethodSection
            title="Custom Community Circle"
            description="Choose your preferred channel for future group contributions and shared community funds."
            icon={LuUsers}
            value={preferences.groupFunds}
            onChange={(value) =>
              updatePreference("groupFunds", value)
            }
            theme={theme}
          />
        </div>

        {/* Security and privacy information */}
        <section
          className="mt-7 rounded-3xl border p-5 sm:p-7"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: theme.greenPale,
                color: theme.green,
              }}
            >
              <LuShieldCheck size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-base font-bold">
                Payment security & privacy
              </h2>

              <p
                className="mt-2 text-sm leading-7"
                style={{ color: theme.textMid }}
              >
                Your payment credentials should be handled
                through the selected payment provider's secure
                checkout or tokenisation service.
              </p>

              <ul
                className="mt-4 space-y-3 text-xs leading-6"
                style={{ color: theme.textMid }}
              >
                <li className="flex items-start gap-2">
                  <LuCheck
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: theme.green }}
                  />
                  P-REACH OUT should not collect or store raw
                  card numbers or CVV security codes.
                </li>

                <li className="flex items-start gap-2">
                  <LuCheck
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: theme.green }}
                  />
                  Never enter or disclose your M-Pesa PIN
                  to the P-REACH OUT website.
                </li>

                <li className="flex items-start gap-2">
                  <LuCheck
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: theme.green }}
                  />
                  Future saved payment methods should use
                  provider-generated references or tokens.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* M-Pesa and recurring payments note */}
        <div
          className="mt-6 flex items-start gap-3 rounded-2xl border p-4"
          style={{
            backgroundColor: theme.bgSoft,
            borderColor: theme.border,
          }}
        >
          <LuInfo
            size={18}
            className="mt-0.5 shrink-0"
            style={{ color: theme.primary }}
          />

          <p
            className="text-xs leading-6"
            style={{ color: theme.textMid }}
          >
            M-Pesa is treated as a one-time payment option in
            this preview. Recurring contributions will only
            be offered through a payment method and provider
            that explicitly support recurring billing.
          </p>
        </div>

        {/* PayPal intentionally excluded */}
        <p
          className="mt-4 text-xs leading-5"
          style={{ color: theme.textMid }}
        >
          Only bank cards and M-Pesa are included in the
          initial payment-method design. Other providers and
          payment channels may be considered later.
        </p>

        {/* Save action */}
        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl border p-3 text-sm"
            style={{
              color: "#B42318",
              borderColor: "rgba(220,38,38,0.25)",
              backgroundColor: "rgba(220,38,38,0.07)",
            }}
          >
            {error}
          </p>
        )}

        {saved && (
          <p
            role="status"
            className="mt-5 flex items-center gap-2 text-sm font-semibold"
            style={{ color: theme.green }}
          >
            <LuCheck size={17} />
            Your preferred payment channels have been saved.
          </p>
        )}

        <div className="flex justify-end pb-8 pt-6">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto"
            style={{ backgroundColor: theme.primary }}
          >
            <LuSave size={18} />
            Save Preferences
          </button>
        </div>

        {/* Demo limitation */}
        <div className="mb-8 flex items-start gap-3">
          <LuWallet
            size={17}
            className="mt-0.5 shrink-0"
            style={{ color: theme.textMid }}
          />

          <p
            className="text-xs leading-5"
            style={{ color: theme.textMid }}
          >
            Preview only: saving these choices stores payment
            preferences in this browser. No card is registered,
            no M-Pesa transaction is initiated, and no payment
            information is transmitted to a provider.
          </p>
        </div>
      </main>
    </MemberShell>
  );
}

export default Payment_Method;
