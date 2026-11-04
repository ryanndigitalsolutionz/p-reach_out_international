
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuUser,
  LuMail,
  LuLock,
  LuArrowUpRight,
  LuInfo,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";

const USERS_KEY = "p-reach-out:preview-users:v1";
const SESSION_KEY = "p-reach-out:preview-session:v1";

function readPreviewAccounts() {
  const stored = localStorage.getItem(USERS_KEY);

  if (!stored) return [];

  const accounts = JSON.parse(stored);

  if (!Array.isArray(accounts)) {
    throw new Error("Saved preview accounts could not be read.");
  }

  return accounts;
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

async function derivePasswordHash(password, saltHex) {
  if (!globalThis.crypto?.subtle) {
    throw new Error(
      "Secure browser storage is unavailable. Open the website through HTTPS or localhost."
    );
  }

  const salt = Uint8Array.from(
    saltHex.match(/.{2}/g) || [],
    (value) => parseInt(value, 16)
  );

  const passwordKey = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const derivedBits = await globalThis.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 120000,
      hash: "SHA-256",
    },
    passwordKey,
    256
  );

  return bytesToHex(new Uint8Array(derivedBits));
}

function Signup() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const normalizedName = fullName.trim();
      const normalizedEmail = email.trim().toLowerCase();

      if (normalizedName.length < 2) {
        throw new Error("Please enter your full name.");
      }

      if (password.length < 8) {
        throw new Error("Your password must contain at least 8 characters.");
      }

      if (password !== confirmPassword) {
        throw new Error("Your passwords do not match.");
      }

      const accounts = readPreviewAccounts();

      const existingAccount = accounts.some(
        (account) => account.email === normalizedEmail
      );

      if (existingAccount) {
        throw new Error(
          "An account with this email already exists in this browser. Please sign in instead."
        );
      }

      if (!globalThis.crypto?.getRandomValues) {
        throw new Error(
          "Secure browser storage is unavailable. Open the website through HTTPS or localhost."
        );
      }

      // Generate a unique salt for this preview account.
      const salt = bytesToHex(
        globalThis.crypto.getRandomValues(new Uint8Array(16))
      );

      // Store a derived password hash instead of the raw password.
      const passwordHash = await derivePasswordHash(password, salt);

      const firstName = normalizedName.split(/\s+/)[0];

      const account = {
        id:
          globalThis.crypto.randomUUID?.() ||
          `preview-${Date.now()}-${Math.random().toString(36).slice(2)}`,

        fullName: normalizedName,
        displayName: firstName,
        preferredName: firstName,
        email: normalizedEmail,

        passwordSalt: salt,
        passwordHash,

        createdAt: new Date().toISOString(),
        accountType: "preview",
      };

      const updatedAccounts = [...accounts, account];

      localStorage.setItem(
        USERS_KEY,
        JSON.stringify(updatedAccounts)
      );

      // Automatically sign the new account in.
      const session = {
        userId: account.id,
        fullName: account.fullName,
        displayName: account.displayName,
        preferredName: account.preferredName,
        email: account.email,
        signedInAt: new Date().toISOString(),
        mode: "preview",
      };

      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
      );

      navigate("/dashboard", { replace: true });
      return;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while creating your account."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen overflow-x-clip"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
      }}
    >
      <Header />

      <main className="flex items-center justify-center px-4 py-14 sm:px-6 sm:py-20">
        <div className="w-full max-w-md">
          <div
            className="rounded-3xl border p-6 sm:p-9"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            {/* Introduction */}
            <div className="text-center">
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuUser size={27} />
              </div>

              <span
                className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Join Our Community
              </span>

              <h1
                className="mt-3 text-3xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Become a Member.
              </h1>

              <p
                className="mt-3 text-sm leading-6"
                style={{ color: theme.textMid }}
              >
                Create your P-REACH OUT preview account and explore
                the member experience.
              </p>
            </div>

            {/* Preview notice */}
            <div
              className="mt-7 flex gap-3 rounded-xl border p-4"
              style={{
                backgroundColor: theme.bgSoft,
                borderColor: theme.border,
              }}
            >
              <LuInfo
                size={19}
                className="mt-0.5 shrink-0"
                style={{ color: theme.primary }}
              />

              <div>
                <p className="text-sm font-bold">
                  Temporary preview registration
                </p>

                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: theme.textMid }}
                >
                  Your account is saved only in this browser.
                  No email verification is sent. Use a test email
                  and a password you don't use elsewhere.
                </p>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border px-4 py-3 text-sm leading-6"
                style={{
                  color: "#B42318",
                  backgroundColor: "rgba(220, 38, 38, 0.07)",
                  borderColor: "rgba(220, 38, 38, 0.2)",
                }}
              >
                {error}
              </div>
            )}

            {/* Registration form */}
            <form onSubmit={handleSignup} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="signup-name"
                  className="mb-2 block text-sm font-bold"
                >
                  Full Name
                </label>

                <div className="relative">
                  <LuUser
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: theme.textMid }}
                  />

                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                    minLength={2}
                    className="min-h-12 w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none focus-visible:ring-2"
                    style={{
                      backgroundColor: theme.bgSoft,
                      color: theme.text,
                      borderColor: theme.border,
                      "--tw-ring-color": theme.primary,
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-sm font-bold"
                >
                  Email Address
                </label>

                <div className="relative">
                  <LuMail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: theme.textMid }}
                  />

                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="min-h-12 w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none focus-visible:ring-2"
                    style={{
                      backgroundColor: theme.bgSoft,
                      color: theme.text,
                      borderColor: theme.border,
                      "--tw-ring-color": theme.primary,
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="mb-2 block text-sm font-bold"
                >
                  Password
                </label>

                <div className="relative">
                  <LuLock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: theme.textMid }}
                  />

                  <input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={8}
                    className="min-h-12 w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none focus-visible:ring-2"
                    style={{
                      backgroundColor: theme.bgSoft,
                      color: theme.text,
                      borderColor: theme.border,
                      "--tw-ring-color": theme.primary,
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="mb-2 block text-sm font-bold"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <LuLock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: theme.textMid }}
                  />

                  <input
                    id="signup-confirm-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    required
                    minLength={8}
                    className="min-h-12 w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none focus-visible:ring-2"
                    style={{
                      backgroundColor: theme.bgSoft,
                      color: theme.text,
                      borderColor: theme.border,
                      "--tw-ring-color": theme.primary,
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: theme.primary }}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
                {!isSubmitting && (
                  <LuArrowUpRight size={17} className="ml-2" />
                )}
              </button>
            </form>

            {/* Login navigation */}
            <p
              className="mt-7 text-center text-sm"
              style={{ color: theme.textMid }}
            >
              Already a member?{" "}
              <Link
                to="/login"
                className="font-bold no-underline"
                style={{ color: theme.primary }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
