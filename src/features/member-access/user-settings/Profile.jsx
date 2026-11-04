
import { useState } from "react";
import {
  LuUserRound,
  LuCamera,
  LuPencil,
  LuSave,
  LuBadgeCheck,
  LuEye,
  LuEyeOff,
  LuBookOpen,
  LuInfo,
  LuCheck,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";
import { MemberShell } from "../Dashboard.jsx";

const SESSION_KEY = "p-reach-out:preview-session:v1";
const PROFILE_KEY_PREFIX = "p-reach-out:preview-profile:";

function readSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function readProfile(userId, session) {
  try {
    const stored = localStorage.getItem(
      `${PROFILE_KEY_PREFIX}${userId}`
    );

    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Use the session information if saved profile data is unavailable.
  }

  const fullName =
    session?.fullName ||
    session?.displayName ||
    session?.preferredName ||
    "";

  return {
    displayName: fullName,
    bio: "",
    showBadges: true,
    updatedAt: null,
  };
}

function Profile() {
  const { theme } = useTheme();

  const session = readSession();
  const userId = session?.userId || "preview-guest";

  const [profile, setProfile] = useState(() =>
    readProfile(userId, session)
  );

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const fullName =
    session?.fullName ||
    session?.displayName ||
    session?.preferredName ||
    "Preview Member";

  const email = session?.email || "Preview account";

  const initials = fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const updateProfile = (field, value) => {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!profile.displayName.trim()) {
      setError("Please enter a display name.");
      setSaved(false);
      return;
    }

    try {
      const updatedProfile = {
        ...profile,
        displayName: profile.displayName.trim(),
        bio: profile.bio.trim(),
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        `${PROFILE_KEY_PREFIX}${userId}`,
        JSON.stringify(updatedProfile)
      );

      setProfile(updatedProfile);
      setSaved(true);
      setError("");
    } catch {
      setError(
        "Your profile could not be saved. Browser storage may be unavailable."
      );
      setSaved(false);
    }
  };

  return (
    <MemberShell>
      <main className="mx-auto w-full max-w-[1100px] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
        {/* Page introduction */}
        <header className="mb-8">
          <p
            className="text-xs font-bold uppercase tracking-[0.17em]"
            style={{ color: theme.primary }}
          >
            Member Settings
          </p>

          <h1
            className="mt-2 text-3xl font-semibold sm:text-4xl"
            style={{ color: theme.text }}
          >
            My Profile
          </h1>

          <p
            className="mt-3 max-w-2xl text-sm leading-7"
            style={{ color: theme.textMid }}
          >
            Manage how you present yourself within the
            P-REACH OUT community.
          </p>
        </header>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile identity card */}
          <section
            className="rounded-3xl border p-5 shadow-sm sm:p-7"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar frame */}
              <div className="relative w-fit shrink-0">
                <div
                  className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 text-3xl font-bold shadow-sm sm:h-28 sm:w-28"
                  style={{
                    backgroundColor: theme.bgSoft,
                    borderColor: theme.card,
                    color: theme.primary,
                  }}
                >
                  {initials || <LuUserRound size={38} />}
                </div>

                {/* Image upload placeholder */}
                <button
                  type="button"
                  disabled
                  title="Profile image uploads are coming soon"
                  aria-label="Profile image upload coming soon"
                  className="absolute bottom-0 right-0 flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border-2 shadow-sm opacity-60"
                  style={{
                    backgroundColor: theme.primary,
                    color: "#FFFFFF",
                    borderColor: theme.card,
                  }}
                >
                  <LuCamera size={16} />
                </button>
              </div>

              {/* Member identity */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    className="break-words text-xl font-bold sm:text-2xl"
                    style={{ color: theme.text }}
                  >
                    {fullName}
                  </h2>

                  {profile.showBadges && (
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: theme.bgSoft,
                        color: theme.primary,
                      }}
                    >
                      <LuBadgeCheck size={13} />
                      Member
                    </span>
                  )}
                </div>

                <p
                  className="mt-1 break-all text-sm"
                  style={{ color: theme.textMid }}
                >
                  {email}
                </p>

                <p
                  className="mt-3 text-xs leading-5"
                  style={{ color: theme.textMid }}
                >
                  Profile image editing will be available in
                  a future update.
                </p>
              </div>
            </div>
          </section>

          {/* Display name */}
          <section
            className="rounded-3xl border p-5 shadow-sm sm:p-7"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuPencil size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Profile identity
                </h2>

                <p
                  className="mt-0.5 text-xs"
                  style={{ color: theme.textMid }}
                >
                  Choose how other members see your name.
                </p>
              </div>
            </div>

            <label
              htmlFor="profile-display-name"
              className="mb-2 block text-sm font-bold"
            >
              Display Name
            </label>

            <input
              id="profile-display-name"
              type="text"
              maxLength={60}
              required
              value={profile.displayName}
              onChange={(event) =>
                updateProfile("displayName", event.target.value)
              }
              placeholder="Enter your display name"
              className="min-h-12 w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2"
              style={{
                backgroundColor: theme.bgSoft,
                color: theme.text,
                borderColor: theme.border,
                "--tw-ring-color": theme.primary,
              }}
            />

            <p
              className="mt-2 text-xs leading-5"
              style={{ color: theme.textMid }}
            >
              This name is not a unique username. You can
              change it without changing your account email.
            </p>
          </section>

          {/* Bio editor */}
          <section
            className="rounded-3xl border p-5 shadow-sm sm:p-7"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.primary,
                }}
              >
                <LuBookOpen size={19} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  About Me
                </h2>

                <p
                  className="mt-0.5 text-xs"
                  style={{ color: theme.textMid }}
                >
                  A little introduction about yourself.
                </p>
              </div>
            </div>

            <label
              htmlFor="profile-bio"
              className="mb-2 block text-sm font-bold"
            >
              Your Bio
            </label>

            <textarea
              id="profile-bio"
              rows={6}
              maxLength={500}
              value={profile.bio}
              onChange={(event) =>
                updateProfile("bio", event.target.value)
              }
              placeholder="Write a little about yourself, your interests, or what brings you to the P-REACH OUT community..."
              className="min-h-[170px] w-full resize-y rounded-2xl border px-4 py-4 text-sm leading-8 outline-none focus:ring-2"
              style={{
                backgroundColor: theme.bgSoft,
                color: theme.text,
                borderColor: theme.border,
                "--tw-ring-color": theme.primary,
              }}
            />

            <div className="mt-2 flex items-center justify-between gap-3">
              <p
                className="text-xs"
                style={{ color: theme.textMid }}
              >
                Keep your introduction comfortable and respectful.
              </p>

              <span
                className="shrink-0 text-xs tabular-nums"
                style={{ color: theme.textMid }}
              >
                {profile.bio.length}/500
              </span>
            </div>

            {/* Exercise-book style bio preview */}
            <div className="mt-7">
              <div className="mb-3 flex items-center gap-2">
                <LuBookOpen
                  size={16}
                  style={{ color: theme.primary }}
                />

                <span
                  className="text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: theme.textMid }}
                >
                  Profile preview
                </span>
              </div>

              <div
                className="overflow-hidden rounded-2xl border p-2 sm:p-3"
                style={{
                  background:
                    "linear-gradient(135deg, #E9E1D1, #F8F3E8 48%, #E9E1D1)",
                  borderColor: "#D5C9B7",
                }}
              >
                <article
                  className="relative min-h-[190px] overflow-hidden rounded-xl border px-5 py-6 sm:px-8"
                  style={{
                    backgroundColor: "#FFFCF4",
                    borderColor: "#E3DAC9",
                    color: "#263B43",
                    boxShadow: "inset 10px 0 18px rgba(80,60,35,0.05)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-8 top-0 w-px sm:left-12"
                    style={{
                      backgroundColor: "rgba(205,105,105,0.35)",
                    }}
                  />

                  <div className="relative pl-5 sm:pl-8">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B7958]">
                      A little about me
                    </p>

                    <h3 className="mt-3 text-xl font-semibold text-[#173B3B]">
                      {profile.displayName.trim() || "Your name"}
                    </h3>

                    <div
                      className="mt-4 min-h-[80px] whitespace-pre-wrap break-words text-sm leading-[2rem] text-[#344B50]"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(139,165,177,0.25) 31px, rgba(139,165,177,0.25) 32px)",
                      }}
                    >
                      {profile.bio || (
                        <span className="text-[#9BA9A5]">
                          Your introduction will appear here...
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Badge visibility */}
          <section
            className="rounded-3xl border p-5 shadow-sm sm:p-7"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: theme.bgSoft,
                    color: theme.primary,
                  }}
                >
                  <LuBadgeCheck size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold">
                    Badge visibility
                  </h2>

                  <p
                    className="mt-1 max-w-xl text-xs leading-5"
                    style={{ color: theme.textMid }}
                  >
                    Choose whether your member badge appears
                    beside your profile name.
                  </p>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={profile.showBadges}
                onClick={() =>
                  updateProfile("showBadges", !profile.showBadges)
                }
                className="inline-flex min-h-10 items-center gap-3 self-start rounded-full border px-3 py-2 text-xs font-bold sm:self-center"
                style={{
                  borderColor: theme.border,
                  color: theme.text,
                  backgroundColor: theme.bgSoft,
                }}
              >
                {profile.showBadges ? (
                  <LuEye size={16} />
                ) : (
                  <LuEyeOff size={16} />
                )}

                {profile.showBadges ? "Visible" : "Hidden"}

                <span
                  className="relative h-5 w-9 rounded-full transition-colors"
                  style={{
                    backgroundColor: profile.showBadges
                      ? theme.primary
                      : theme.border,
                  }}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                      profile.showBadges
                        ? "translate-x-[18px]"
                        : "translate-x-0.5"
                    }`}
                  />
                </span>
              </button>
            </div>
          </section>

          {/* Information notice */}
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
              This is a local preview profile. Your changes
              are saved in this browser and are not yet
              synchronized with a P-REACH OUT server.
            </p>
          </div>

          {/* Feedback */}
          {error && (
            <p
              role="alert"
              className="rounded-xl border px-4 py-3 text-sm"
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
              className="flex items-center gap-2 text-sm font-semibold"
              style={{ color: theme.green }}
            >
              <LuCheck size={17} />
              Your profile has been saved.
            </p>
          )}

          {/* Save action */}
          <div className="flex justify-end pb-8">
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto"
              style={{ backgroundColor: theme.primary }}
            >
              <LuSave size={18} />
              Save Profile
            </button>
          </div>
        </form>
      </main>
    </MemberShell>
  );
}

export default Profile;
