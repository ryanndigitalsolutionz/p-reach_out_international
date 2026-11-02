
import { Link } from "react-router-dom";
import {
  LuLock,
  LuMail,
  LuArrowUpRight,
  LuInfo,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";
import Header from "../../components/navigation/Header.jsx";

function Login() {
  const { theme } = useTheme();

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

            {/* Inactive notice */}
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
                  Sign-in is not available yet.
                </p>
                <p
                  className="mt-1 text-xs leading-5"
                  style={{ color: theme.textMid }}
                >
                  Member authentication is currently being prepared.
                  This form is a preview and cannot accept credentials.
                </p>
              </div>
            </div>

            {/* Preview form */}
            <fieldset disabled className="mt-7 space-y-5 opacity-50">
              <legend className="sr-only">Sign-in form preview</legend>

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
                    className="min-h-12 w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none"
                    style={{
                      backgroundColor: theme.bgSoft,
                      color: theme.text,
                      borderColor: theme.border,
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
                    className="min-h-12 w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none"
                    style={{
                      backgroundColor: theme.bgSoft,
                      color: theme.text,
                      borderColor: theme.border,
                    }}
                  />
                </div>
              </div>

              <button
                type="button"
                disabled
                className="min-h-12 w-full rounded-full px-5 py-3 text-sm font-bold text-white"
                style={{ backgroundColor: theme.primary }}
              >
                Sign In
              </button>
            </fieldset>

            {/* Signup navigation */}
            <p
              className="mt-7 text-center text-sm"
              style={{ color: theme.textMid }}
            >
              Don't have an account?
              {" "}
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
