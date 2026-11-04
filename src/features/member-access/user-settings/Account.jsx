
import { useState } from "react";
import {
  LuUserRound,
  LuMail,
  LuShieldCheck,
  LuSmartphone,
  LuLockKeyhole,
  LuInfo,
  LuSave,
  LuCheck,
  LuClock,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";
import { MemberShell } from "../Dashboard.jsx";

const SESSION_KEY = "p-reach-out:preview-session:v1";
const USERS_KEY = "p-reach-out:preview-users:v1";

const SECURITY_KEY_PREFIX = "p-reach-out:preview-security:";

function readSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function readAccounts() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    const accounts = stored ? JSON.parse(stored) : [];

    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
}

function readSecurityPreference(userId) {
  try {
    const stored = localStorage.getItem(
      `${SECURITY_KEY_PREFIX}${userId}`
    );

    return stored
      ? JSON.parse(stored)
      : { twoFactorInterest: false };
  } catch {
    return { twoFactorInterest: false };
  }
}

function Account() {
  const { theme } = useTheme();

  const [session, setSession] = useState(readSession);
  const userId = session?.userId || "preview-guest";

  const account = readAccounts().find(
    (item) => item.id === userId
  );

  const fullName =
    session?.fullName ||
    account?.fullName ||
    session?.displayName ||
    "Preview Member";

  const accountId = session?.userId || "Preview account";

  const [email, setEmail] = useState(
    session?.email || account?.email || ""
  );

  const [twoFactorInterest, setTwoFactorInterest] = useState(
    () => readSecurityPreference(userId).twoFactorInterest
  );

  const [emailFeedback, setEmailFeedback] = useState("");
  const [emailError, setEmailError] = useState("");
  const [securityFeedback, setSecurityFeedback] = useState("");

  const [savingEmail, setSavingEmail] = useState(false);

  const handleEmailUpdate = (event) => {
    event.preventDefault();

    setEmailError("");
    setEmailFeedback("");
    setSavingEmail(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        throw new Error("Please enter an email address.");
      }

      if (!session?.userId) {
        throw new Error(
          "No preview account session was found. Please sign in again."
        );
      }

      const accounts = readAccounts();

      const duplicate = accounts.some(
        (item) =>
          item.email?.toLowerCase() === normalizedEmail &&
          item.id !== session.userId
      );

      if (duplicate) {
        throw new Error(
          "This email address is already associated with another preview account."
        );
      }

      const updatedAccounts = accounts.map((item) =>
        item.id === session.userId
          ? { ...item, email: normalizedEmail }
          : item
      );

      const updatedSession = {
        ...session,
        email: normalizedEmail,
      };

      // Update the preview account and the active session.
      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(updatedAccounts)
      );

      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(updatedSession)
      );

      setSession(updatedSession);
      setEmail(normalizedEmail);

      setEmailFeedback(
        "Email updated in your local preview account."
      );
    } catch (error) {
      setEmailError(
        error instanceof Error
          ? error.message
          : "Unable to update your email."
      );
    } finally {
      setSavingEmail(false);
    }
  };

  const handleTwoFactorPreference = () => {
    const nextValue = !twoFactorInterest;

    try {
      localStorage.setItem(
        `${SECURITY_KEY_PREFIX}${userId}`,
        JSON.stringify({
          twoFactorInterest: nextValue,
          updatedAt: new Date().toISOString(),
        })
      );

      setTwoFactorInterest(nextValue);

      setSecurityFeedback(
        nextValue
          ? "Your preference has been saved. Two-factor authentication is not active yet."
          : "Your preference has been updated."
      );
    } catch {
      setSecurityFeedback(
        "Your preference could not be saved in this browser."
      );
    }
  };

  const cardStyle = {
    backgroundColor: theme.card,
    borderColor: theme.border,
  };

  const inputStyle = {
    backgroundColor: theme.bgSoft,
    color: theme.text,
    borderColor: theme.border,
    "--tw-ring-color": theme.primary,
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
            My Account
          </h1>

          <p
            className="mt-3 max-w-2xl text-sm leading-7"
            style={{ color: theme.textMid }}
          >
            Manage your account identity, email address and
            security preferences.
          </p>
        </header>

        <div className="space-y-6">
          {/* Account overview */}
          <section
            className="rounded-3xl border p-5 shadow-sm sm:p-7"
            style={cardStyle}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuUserRound size={27} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold">
                  Account Overview
                </h2>

                <p
                  className="mt-1 truncate text-sm"
                  style={{ color: theme.textMid }}
                >
                  {fullName}
                </p>
              </div>

              <span
                className="hidden rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide sm:inline-flex"
                style={{
                  backgroundColor: theme.greenPale,
                  color: theme.green,
                }}
              >
                Preview
              </span>
            </div>

            <div
              className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-2"
              style={{ borderColor: theme.border }}
            >
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: theme.textMid }}
                >
                  Account ID
                </p>

                <p className="mt-2 break-all text-sm font-semibold">
                  {accountId}
                </p>
              </div>

              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: theme.textMid }}
                >
                  Account Type
                </p>

                <p className="mt-2 text-sm font-semibold">
                  Member Preview
                </p>
              </div>
            </div>
          </section>

          {/* Email management */}
          <section
            className="rounded-3xl border p-5 shadow-sm sm:p-7"
            style={cardStyle}
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuMail size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Email Address
                </h2>

                <p
                  className="mt-0.5 text-xs"
                  style={{ color: theme.textMid }}
                >
                  Your email is used as your account identity.
                </p>
              </div>
            </div>

            <form onSubmit={handleEmailUpdate}>
              <label
                htmlFor="account-email"
                className="mb-2 block text-sm font-bold"
              >
                Registered Email
              </label>

              <input
                id="account-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailFeedback("");
                  setEmailError("");
                }}
                className="min-h-12 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
                style={inputStyle}
              />

              <div className="mt-3 flex items-start gap-2">
                <LuInfo
                  size={16}
                  className="mt-0.5 shrink-0"
                  style={{ color: theme.primary }}
                />

                <p
                  className="text-xs leading-5"
                  style={{ color: theme.textMid }}
                >
                  Email changes are saved locally for this
                  preview. Email ownership verification will
                  be introduced with the backend.
                </p>
              </div>

              {emailError && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border p-3 text-sm"
                  style={{
                    color: "#B42318",
                    borderColor: "rgba(220,38,38,0.25)",
                    backgroundColor: "rgba(220,38,38,0.07)",
                  }}
                >
                  {emailError}
                </p>
              )}

              {emailFeedback && (
                <p
                  role="status"
                  className="mt-4 flex items-center gap-2 text-sm font-semibold"
                  style={{ color: theme.green }}
                >
                  <LuCheck size={17} />
                  {emailFeedback}
                </p>
              )}

              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  disabled={savingEmail}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: theme.primary }}
                >
                  <LuSave size={17} />
                  {savingEmail ? "Saving..." : "Save Email"}
                </button>
              </div>
            </form>
          </section>

          {/* Phone verification */}
          <section
            className="rounded-3xl border p-5 shadow-sm sm:p-7"
            style={cardStyle}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuSmartphone size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">
                    Phone Verification
                  </h2>

                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{
                      backgroundColor: theme.bgSoft,
                      color: theme.textMid,
                    }}
                  >
                    <LuClock size={12} />
                    Coming Soon
                  </span>
                </div>

                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: theme.textMid }}
                >
                  Connect and verify a mobile number to support
                  future account recovery and security features.
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-4 min-h-10 cursor-not-allowed rounded-full border px-5 py-2 text-xs font-bold opacity-60"
                  style={{
                    color: theme.textMid,
                    borderColor: theme.border,
                  }}
                >
                  Add Phone Number
                </button>
              </div>
            </div>
          </section>

          {/* Two-factor authentication */}
          <section
            className="rounded-3xl border p-5 shadow-sm sm:p-7"
            style={cardStyle}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuShieldCheck size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold">
                    Two-Factor Authentication
                  </h2>

                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{
                      backgroundColor: theme.bgSoft,
                      color: theme.textMid,
                    }}
                  >
                    Setup Pending
                  </span>
                </div>

                <p
                  className="mt-2 text-sm leading-6"
                  style={{ color: theme.textMid }}
                >
                  Two-factor authentication adds another step
                  when signing in, helping protect your account
                  beyond its password.
                </p>

                <div
                  className="mt-5 rounded-2xl border p-4"
                  style={{
                    backgroundColor: theme.bgSoft,
                    borderColor: theme.border,
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-bold">
                        Enable 2FA preference
                      </p>

                      <p
                        className="mt-1 text-xs leading-5"
                        style={{ color: theme.textMid }}
                      >
                        {twoFactorInterest
                          ? "You have expressed interest in enabling 2FA."
                          : "You have not selected this preference yet."}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={twoFactorInterest}
                      aria-label="Set two-factor authentication preference"
                      onClick={handleTwoFactorPreference}
                      className="relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{
                        backgroundColor: twoFactorInterest
                          ? theme.primary
                          : theme.border,
                        "--tw-ring-color": theme.primary,
                      }}
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                          twoFactorInterest
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {securityFeedback && (
                  <p
                    role="status"
                    className="mt-4 text-xs font-semibold leading-5"
                    style={{ color: theme.green }}
                  >
                    {securityFeedback}
                  </p>
                )}

                <div className="mt-5 flex items-start gap-2">
                  <LuLockKeyhole
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{ color: theme.primary }}
                  />

                  <p
                    className="text-xs leading-5"
                    style={{ color: theme.textMid }}
                  >
                    This control only saves your preview preference.
                    Authenticator enrollment, verification codes and
                    sign-in challenges are not connected yet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Preview notice */}
          <div
            className="flex items-start gap-3 rounded-2xl border p-4"
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
              Account changes currently use browser storage for
              demonstration. Phone verification and actual
              two-factor security will require the backend.
            </p>
          </div>
        </div>
      </main>
    </MemberShell>
  );
}

export default Account;
