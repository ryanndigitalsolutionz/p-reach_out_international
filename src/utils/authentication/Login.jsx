
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LuLock,
  LuMail,
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

  if (salt.length !== 16) {
    throw new Error("The saved preview account has invalid credentials.");
  }

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

function Login() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const accounts = readPreviewAccounts();

      const account = accounts.find(
        (item) => item.email === normalizedEmail
      );

      if (!account) {
        throw new Error(
          "Invalid email address or password. Create a preview account if you haven't registered yet."
        );
      }

      const enteredHash = await derivePasswordHash(
        password,
        account.passwordSalt
      );

      if (enteredHash !== account.passwordHash) {
        throw new Error(
          "Invalid email address or password. Please try again."
        );
      }

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
          : "Something went wrong while signing in."
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
                <LuLock size={27} />
              </div>

              <span
                className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.15em]"
                style={{ color: theme.primary }}
              >
                Member Access
              </span>

              <h1
                className="mt-3 text-3xl"
                style={{ fontFamily: '"Carter One", sans-serif' }}
              >
                Welcome Back.
              </h1>

              <p
                className="mt-3 text-sm leading-6"
                style={{ color: theme.textMid }}
              >
                Sign in to reconnect with your P-REACH OUT community.
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
                  Preview account access
                </p>

                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: theme.textMid }}
                >
                  Sign in using the account you created in this
                  browser. Preview accounts are not synchronized
                  across devices.
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

            {/* Login form */}
            <form onSubmit={handleSignIn} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="login-email"
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
                    id="login-email"
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
                  htmlFor="login-password"
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
                    id="login-password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: theme.primary }}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
                {!isSubmitting && (
                  <LuArrowUpRight size={17} className="ml-2" />
                )}
              </button>
            </form>

            {/* Signup navigation */}
            <p
              className="mt-7 text-center text-sm"
              style={{ color: theme.textMid }}
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold no-underline"
                style={{ color: theme.primary }}
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
