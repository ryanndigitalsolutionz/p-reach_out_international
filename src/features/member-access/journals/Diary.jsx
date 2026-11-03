
import { useMemo, useState } from "react";
import {
  LuArrowLeft,
  LuArrowRight,
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuTag,
  LuX,
  LuLockKeyhole,
  LuFolderOpen,
  LuFolderPlus,
  LuArchive,
  LuCalendarDays,
  LuFrown,
  LuMeh,
  LuSmile,
  LuSmilePlus,
  LuLaugh,
  LuCheck,
  LuBookOpen,
  LuClock,
} from "react-icons/lu";

import { useTheme } from "../../../contexts/ThemeContext.jsx";

const SUGGESTED_TAGS = [
  "gratitude",
  "struggle",
  "win",
  "reflection",
  "trigger",
  "coping",
];

const EMOJI_OPTIONS = ["💐", "🥳", "😏", "😒", "🙏🏼", "🤨", "😁"];

const MOOD_OPTIONS = [
  { value: 1, label: "Very Low", icon: LuFrown },
  { value: 2, label: "Low", icon: LuMeh },
  { value: 3, label: "Neutral", icon: LuSmile },
  { value: 4, label: "Good", icon: LuSmilePlus },
  { value: 5, label: "Great", icon: LuLaugh },
];

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function formatDate(value, includeTime = false) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(includeTime
      ? { hour: "2-digit", minute: "2-digit" }
      : {}),
  }).format(date);
}

function getMood(value) {
  return MOOD_OPTIONS.find((mood) => mood.value === value) || null;
}

function Modal({ children, onClose, theme, maxWidth = "max-w-lg" }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default"
      />

      <section
        role="dialog"
        aria-modal="true"
        className={`relative my-auto w-full ${maxWidth} rounded-3xl border p-5 shadow-2xl sm:p-7`}
        style={{
          backgroundColor: theme.card,
          color: theme.text,
          borderColor: theme.border,
        }}
      >
        {children}
      </section>
    </div>
  );
}

function MoodSelector({ value, onChange, theme }) {
  return (
    <div>
      <p
        className="mb-3 text-sm font-semibold"
        style={{ color: theme.text }}
      >
        How are you feeling? (optional)
      </p>

      <div className="grid grid-cols-5 gap-2">
        {MOOD_OPTIONS.map((mood) => {
          const Icon = mood.icon;
          const selected = value === mood.value;

          return (
            <button
              key={mood.value}
              type="button"
              onClick={() =>
                onChange(selected ? null : mood.value)
              }
              aria-pressed={selected}
              className="flex min-h-[82px] flex-col items-center justify-center gap-1 rounded-2xl border px-1 py-3 transition-colors"
              style={{
                borderColor: selected
                  ? theme.primary
                  : theme.border,
                backgroundColor: selected
                  ? theme.bgSoft
                  : theme.card,
                color: selected
                  ? theme.primary
                  : theme.textMid || theme.text,
              }}
            >
              <Icon size={22} />
              <span className="text-[10px] font-semibold sm:text-xs">
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TagChip({ tag, onRemove, theme }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
      style={{
        backgroundColor: theme.bgSoft,
        borderColor: theme.border,
        color: theme.text,
      }}
    >
      {tag}

      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${tag} tag`}
          onClick={onRemove}
          className="opacity-60 transition-opacity hover:opacity-100"
        >
          <LuX size={13} />
        </button>
      )}
    </span>
  );
}

function ChapterCard({ section, theme, onOpen, onClose }) {
  const dates = section.entries
    .map((entry) => new Date(entry.createdAt).getTime())
    .filter(Number.isFinite);

  const lastEntry = dates.length
    ? new Date(Math.max(...dates)).toISOString()
    : section.createdAt;

  return (
    <article
      className="overflow-hidden rounded-3xl border shadow-sm"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.border,
      }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full p-5 text-left transition-colors sm:p-6"
        style={{ color: theme.text }}
        aria-label={`Open diary chapter ${section.title}`}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: theme.bgSoft,
              color: theme.primary,
            }}
          >
            <LuBookOpen size={23} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="break-words text-lg font-semibold">
                {section.title}
              </h3>

              <span
                className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: section.closedAt
                    ? theme.bgSoft
                    : "rgba(16,185,129,0.12)",
                  color: section.closedAt
                    ? theme.textMid || theme.text
                    : "#0f8a64",
                }}
              >
                {section.closedAt ? "Closed" : "Open"}
              </span>
            </div>

            <div
              className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm"
              style={{ color: theme.textMid || theme.text }}
            >
              <span className="inline-flex items-center gap-1.5">
                <LuCalendarDays size={14} />
                Started {formatDate(section.createdAt)}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <LuBookOpen size={14} />
                {section.entries.length}{" "}
                {section.entries.length === 1 ? "entry" : "entries"}
              </span>
            </div>

            <p
              className="mt-2 text-xs"
              style={{ color: theme.textMid || theme.text, opacity: 0.75 }}
            >
              Last written {formatDate(lastEntry)}
            </p>
          </div>

          <LuArrowRight
            size={19}
            className="mt-1 shrink-0"
            style={{ color: theme.primary }}
          />
        </div>
      </button>

      {!section.closedAt && (
        <div
          className="flex justify-end border-t px-5 py-3 sm:px-6"
          style={{ borderColor: theme.border }}
        >
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-opacity hover:opacity-70"
            style={{ color: theme.textMid || theme.text }}
          >
            <LuArchive size={15} />
            Close chapter
          </button>
        </div>
      )}
    </article>
  );
}

function ChapterReadingView({
  section,
  onBack,
  onEdit,
  onDelete,
  theme,
}) {
  const [pageIndex, setPageIndex] = useState(0);

  const entries = [...section.entries].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const entry = entries[pageIndex];
  const mood = getMood(entry?.mood);
  const MoodIcon = mood?.icon;

  if (!entry) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
        style={{ color: theme.textMid || theme.text }}
      >
        <LuArrowLeft size={18} />
        Back to diary
      </button>

      <header className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.17em]"
            style={{ color: theme.primary }}
          >
            Your diary chapter
          </p>

          <h1
            className="mt-2 text-3xl font-semibold sm:text-4xl"
            style={{ color: theme.text }}
          >
            {section.title}
          </h1>

          <p
            className="mt-2 text-sm"
            style={{ color: theme.textMid || theme.text }}
          >
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
            {section.closedAt ? " · Chapter closed" : " · Chapter open"}
          </p>
        </div>
      </header>

      {/* Book-like reading page */}
      <div
        className="overflow-hidden rounded-[2rem] border p-2 shadow-lg sm:p-4"
        style={{
          background:
            "linear-gradient(135deg, #E9E1D1, #F8F3E8 48%, #E9E1D1)",
          borderColor: "#D5C9B7",
        }}
      >
        <article
          className="relative min-h-[480px] overflow-hidden rounded-[1.5rem] border px-6 py-8 sm:min-h-[570px] sm:px-12 sm:py-12"
          style={{
            backgroundColor: "#FFFCF4",
            borderColor: "#E3DAC9",
            color: "#263B43",
            boxShadow: "inset 12px 0 22px rgba(80,60,35,0.06)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-12 top-0 w-px sm:left-16"
            style={{ backgroundColor: "rgba(205,105,105,0.35)" }}
          />

          <div className="relative pl-5 sm:pl-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#9B7958]">
                {section.title}
              </span>

              <span className="text-xs text-[#8B9691]">
                {pageIndex + 1} / {entries.length}
              </span>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#788A89]">
              <span className="inline-flex items-center gap-1.5">
                <LuClock size={14} />
                {formatDate(entry.createdAt, true)}
              </span>

              {mood && (
                <span className="inline-flex items-center gap-1.5 text-[#137B70]">
                  <MoodIcon size={16} />
                  {mood.label}
                </span>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-semibold leading-tight text-[#173B3B] sm:text-3xl">
              {entry.title || "Untitled entry"}
            </h2>

            <div
              className="mt-7 whitespace-pre-wrap break-words text-sm leading-[2rem] text-[#344B50] sm:text-base"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(139,165,177,0.25) 31px, rgba(139,165,177,0.25) 32px)",
              }}
            >
              {entry.content}
            </div>

            {entry.emojis?.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2">
                {entry.emojis.map((emoji, index) => (
                  <span key={`${emoji}-${index}`} className="text-xl">
                    {emoji}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPageIndex((value) => Math.max(0, value - 1))}
            disabled={pageIndex === 0}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-35"
            style={{
              borderColor: theme.border,
              color: theme.text,
              backgroundColor: theme.card,
            }}
          >
            <LuArrowLeft size={16} />
            Previous
          </button>

          <button
            type="button"
            onClick={() =>
              setPageIndex((value) =>
                Math.min(entries.length - 1, value + 1)
              )
            }
            disabled={pageIndex === entries.length - 1}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold disabled:opacity-35"
            style={{
              borderColor: theme.border,
              color: theme.text,
              backgroundColor: theme.card,
            }}
          >
            Next
            <LuArrowRight size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold"
            style={{
              borderColor: theme.border,
              color: theme.text,
              backgroundColor: theme.card,
            }}
          >
            <LuPencil size={15} />
            Edit entry
          </button>

          <button
            type="button"
            onClick={() => onDelete(entry)}
            aria-label="Delete this entry"
            className="flex h-10 w-10 items-center justify-center rounded-xl border"
            style={{
              borderColor: theme.border,
              color: "#c52b50",
              backgroundColor: theme.card,
            }}
          >
            <LuTrash2 size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Diary({ active = true }) {
  const { theme } = useTheme();

  const [sections, setSections] = useState([]);
  const [page, setPage] = useState("list");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [returnToReader, setReturnToReader] = useState(false);
  const [openedSectionId, setOpenedSectionId] = useState(null);

  const [tagInput, setTagInput] = useState("");
  const [placementOpen, setPlacementOpen] = useState(false);
  const [placementMode, setPlacementMode] = useState("choose");
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notice, setNotice] = useState("");

  const primaryColor = theme.primary || "#087568";
  const textMuted = theme.textMid || theme.text;

  const openSections = sections.filter((section) => !section.closedAt);
  const closedSections = sections.filter((section) => Boolean(section.closedAt));

  const allEntries = sections.flatMap((section) =>
    section.entries.map((entry) => ({
      ...entry,
      sectionId: section.id,
      sectionTitle: section.title,
    }))
  );

  const moodEntries = allEntries.filter(
    (entry) => entry.mood !== null && entry.mood !== undefined
  );

  const averageMood = moodEntries.length
    ? (
        moodEntries.reduce((total, entry) => total + Number(entry.mood), 0) /
        moodEntries.length
      ).toFixed(1)
    : null;

  const filteredSections = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sections.filter((section) => {
      if (!query) return true;

      const sectionText = [
        section.title,
        ...section.entries.flatMap((entry) => [
          entry.title,
          entry.content,
          ...(entry.tags || []),
          ...(entry.emojis || []),
        ]),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return sectionText.includes(query);
    });
  }, [sections, search]);

  const openedSection = sections.find(
    (section) => section.id === openedSectionId
  );

  function resetDraft() {
    setDraft(null);
    setEditingSectionId(null);
    setTagInput("");
  }

  function startNewEntry() {
    setDraft({
      id: null,
      title: "",
      content: "",
      mood: null,
      tags: [],
      emojis: [],
    });

    setEditingSectionId(null);
    setReturnToReader(false);
    setTagInput("");
    setNotice("");
    setPage("editor");
  }

  function startEditing(entry, sectionId) {
    setDraft({
      id: entry.id,
      title: entry.title || "",
      content: entry.content || "",
      mood: entry.mood ?? null,
      tags: [...(entry.tags || [])],
      emojis: [...(entry.emojis || [])],
      createdAt: entry.createdAt,
    });

    setEditingSectionId(sectionId);
    setReturnToReader(true);
    setTagInput("");
    setNotice("");
    setPage("editor");
  }

  function updateDraft(field, value) {
    setDraft((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function addTag(value = tagInput) {
    const tag = String(value).trim().replace(/^#+/, "");

    if (!tag || !draft) return;

    const duplicate = draft.tags.some(
      (existing) => existing.toLowerCase() === tag.toLowerCase()
    );

    if (!duplicate) {
      updateDraft("tags", [...draft.tags, tag.slice(0, 30)]);
    }

    setTagInput("");
  }

  function removeTag(tag) {
    updateDraft(
      "tags",
      draft.tags.filter((item) => item !== tag)
    );
  }

  function toggleEmoji(emoji) {
    if (!draft) return;

    updateDraft(
      "emojis",
      draft.emojis.includes(emoji)
        ? draft.emojis.filter((item) => item !== emoji)
        : [...draft.emojis, emoji]
    );
  }

  function handleSaveEntry() {
    if (!draft || !draft.content.trim()) {
      setNotice("Please write something before saving your entry.");
      return;
    }

    if (draft.id) {
      const nextSections = sections.map((section) => {
        if (section.id !== editingSectionId) return section;

        return {
          ...section,
          entries: section.entries.map((entry) =>
            entry.id === draft.id
              ? {
                  ...entry,
                  title: draft.title.trim(),
                  content: draft.content,
                  mood: draft.mood,
                  tags: [...draft.tags],
                  emojis: [...draft.emojis],
                  updatedAt: new Date().toISOString(),
                }
              : entry
          ),
        };
      });

      setSections(nextSections);
      resetDraft();
      setPage(returnToReader ? "reader" : "list");
      setNotice("Your entry has been updated.");
      return;
    }

    setSelectedSectionId("");
    setNewSectionTitle("");
    setPlacementMode("choose");
    setPlacementOpen(true);
    setNotice("");
  }

  function buildEntry() {
    const now = new Date().toISOString();

    return {
      id: createId("entry"),
      title: draft.title.trim(),
      content: draft.content,
      mood: draft.mood,
      tags: [...draft.tags],
      emojis: [...draft.emojis],
      createdAt: now,
      updatedAt: null,
    };
  }

  function finishNewEntry(sectionId) {
    setPlacementOpen(false);
    setPlacementMode("choose");
    setSelectedSectionId("");
    setNewSectionTitle("");
    resetDraft();
    setOpenedSectionId(sectionId);
    setPage("reader");
    setNotice("");
  }

  function saveIntoExistingSection() {
    if (!selectedSectionId || !draft) return;

    const section = sections.find(
      (item) => item.id === selectedSectionId
    );

    if (!section || section.closedAt) {
      setNotice("That diary chapter is no longer open.");
      return;
    }

    const entry = buildEntry();

    setSections((previous) =>
      previous.map((item) =>
        item.id === selectedSectionId
          ? { ...item, entries: [...item.entries, entry] }
          : item
      )
    );

    finishNewEntry(selectedSectionId);
  }

  function createSectionAndSaveEntry() {
    const title = newSectionTitle.trim();

    if (!title || !draft) return;

    const now = new Date().toISOString();
    const entry = buildEntry();

    const newSection = {
      id: createId("section"),
      title: title.slice(0, 80),
      createdAt: now,
      closedAt: null,
      entries: [entry],
    };

    setSections((previous) => [newSection, ...previous]);
    finishNewEntry(newSection.id);
  }

  function closeSection(sectionId) {
    const section = sections.find((item) => item.id === sectionId);

    if (!section || section.closedAt) return;

    const confirmed = window.confirm(
      `Close "${section.title}"? Its entries will remain available to read and edit, but no new entries can be added to this chapter.`
    );

    if (!confirmed) return;

    setSections((previous) =>
      previous.map((item) =>
        item.id === sectionId
          ? { ...item, closedAt: new Date().toISOString() }
          : item
      )
    );
  }

  function confirmDeleteEntry() {
    if (!deleteTarget) return;

    setSections((previous) =>
      previous.map((section) =>
        section.id === deleteTarget.sectionId
          ? {
              ...section,
              entries: section.entries.filter(
                (entry) => entry.id !== deleteTarget.entryId
              ),
            }
          : section
      )
    );

    setDeleteTarget(null);
  }

  function cancelEditor() {
    resetDraft();
    setPage(returnToReader ? "reader" : "list");
  }

  const filteredOpenSections = filteredSections.filter(
    (section) => !section.closedAt
  );

  const filteredClosedSections = filteredSections.filter(
    (section) => Boolean(section.closedAt)
  );

  return (
    <div
      hidden={!active}
      className="member-access min-w-0"
      style={{ color: theme.text }}
    >
      {page === "reader" && openedSection ? (
        <ChapterReadingView
          section={openedSection}
          theme={theme}
          onBack={() => {
            setPage("list");
            setNotice("");
          }}
          onEdit={(entry) =>
            startEditing(entry, openedSection.id)
          }
          onDelete={(entry) =>
            setDeleteTarget({
              sectionId: openedSection.id,
              entryId: entry.id,
              title: entry.title || "Untitled entry",
            })
          }
        />
      ) : page === "editor" ? (
        <>
          <header className="mb-6">
            <button
              type="button"
              onClick={cancelEditor}
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: textMuted }}
            >
              <LuArrowLeft size={18} />
              Back to diary
            </button>

            <p
              className="text-xs font-bold uppercase tracking-[0.17em]"
              style={{ color: primaryColor }}
            >
              A personal chapter of your story
            </p>

            <h1
              className="mt-2 text-3xl font-semibold"
              style={{ color: theme.text }}
            >
              {draft?.id ? "Edit journal entry" : "New journal entry"}
            </h1>
          </header>

          <section
            className="mx-auto max-w-5xl rounded-3xl border p-5 shadow-sm sm:p-8"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <div className="mb-8">
              <label
                htmlFor="diary-title"
                className="mb-3 block text-sm font-semibold"
                style={{ color: theme.text }}
              >
                Title
              </label>

              <input
                id="diary-title"
                type="text"
                maxLength={120}
                value={draft?.title || ""}
                onChange={(event) =>
                  updateDraft("title", event.target.value)
                }
                placeholder="What's on your mind today?"
                className="min-h-14 w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  color: theme.text,
                }}
              />
            </div>

            <div className="mb-8">
              <MoodSelector
                value={draft?.mood ?? null}
                onChange={(value) => updateDraft("mood", value)}
                theme={theme}
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="diary-content"
                className="mb-3 block text-sm font-semibold"
                style={{ color: theme.text }}
              >
                Your entry
              </label>

              <textarea
                id="diary-content"
                value={draft?.content || ""}
                onChange={(event) =>
                  updateDraft("content", event.target.value)
                }
                placeholder="Write freely — this is your private space..."
                spellCheck="true"
                className="w-full resize-y rounded-2xl border border-[#D8D5CA] px-4 py-3 text-sm leading-8 text-[#263B43] outline-none placeholder:text-[#93A2A5] focus:ring-2"
                style={{
                  minHeight: "360px",
                  lineHeight: "32px",
                  paddingTop: "9px",
                  paddingBottom: "9px",
                  paddingLeft: "60px",
                  color: "#263B43",
                  backgroundColor: "#fffdf7",
                  backgroundImage: [
                    "linear-gradient(to right, transparent 0, transparent 45px, rgba(205,105,105,0.65) 45px, rgba(205,105,105,0.65) 46px, transparent 46px)",
                    "repeating-linear-gradient(to bottom, #fffdf7 0px, #fffdf7 31px, #d7e4ed 31px, #d7e4ed 32px)",
                  ].join(", "),
                  backgroundAttachment: "local",
                }}
              />

              <div
                className="mt-2 flex items-center justify-between gap-3 text-xs"
                style={{ color: textMuted }}
              >
                <span>Your words belong to you.</span>
                <span>
                  {(draft?.content || "").length.toLocaleString()} characters
                </span>
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="diary-tag"
                className="mb-3 flex items-center gap-2 text-sm font-semibold"
                style={{ color: theme.text }}
              >
                <LuTag size={17} />
                Tags (optional)
              </label>

              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  id="diary-tag"
                  type="text"
                  maxLength={30}
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addTag();
                    }
                  }}
                  placeholder="Add a tag..."
                  className="min-h-12 min-w-0 flex-1 rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    color: theme.text,
                  }}
                />

                <button
                  type="button"
                  onClick={() => addTag()}
                  disabled={!tagInput.trim()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold disabled:opacity-40"
                  style={{
                    backgroundColor: theme.bgSoft,
                    color: primaryColor,
                  }}
                >
                  <LuPlus size={17} />
                  Add
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTED_TAGS.map((tag) => {
                  const selected = draft?.tags.includes(tag);

                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        selected ? removeTag(tag) : addTag(tag)
                      }
                      className="rounded-full border border-dashed px-3 py-1.5 text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: selected
                          ? theme.bgSoft
                          : "transparent",
                        borderColor: theme.border,
                        color: selected ? primaryColor : textMuted,
                      }}
                    >
                      {selected ? "✓ " : "+ "}
                      {tag}
                    </button>
                  );
                })}
              </div>

              {draft?.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {draft.tags.map((tag) => (
                    <TagChip
                      key={tag}
                      tag={tag}
                      theme={theme}
                      onRemove={() => removeTag(tag)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mb-9">
              <p
                className="mb-3 text-sm font-semibold"
                style={{ color: theme.text }}
              >
                Emoji tags (optional)
              </p>

              <p
                className="mb-4 text-xs leading-5"
                style={{ color: textMuted }}
              >
                Choose the emojis that express the feeling or
                atmosphere of this entry.
              </p>

              <div className="flex flex-wrap gap-2">
                {EMOJI_OPTIONS.map((emoji) => {
                  const selected = draft?.emojis.includes(emoji);

                  return (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => toggleEmoji(emoji)}
                      aria-label={`Select emoji ${emoji}`}
                      aria-pressed={selected}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border text-xl transition-colors"
                      style={{
                        backgroundColor: selected
                          ? theme.bgSoft
                          : theme.card,
                        borderColor: selected
                          ? theme.primary
                          : theme.border,
                        outline: selected
                          ? `1px solid ${theme.primary}`
                          : "none",
                      }}
                    >
                      {emoji}
                    </button>
                  );
                })}
              </div>

              <p
                className="mt-3 text-xs"
                style={{ color: textMuted }}
              >
                You can also include any emojis you prefer directly
                in your writing.
              </p>
            </div>

            {notice && (
              <p
                role="alert"
                className="mb-4 rounded-xl px-4 py-3 text-sm"
                style={{
                  backgroundColor: "rgba(220,38,38,0.08)",
                  color: "#b91c1c",
                }}
              >
                {notice}
              </p>
            )}

            <div
              className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row"
              style={{ borderColor: theme.border }}
            >
              <button
                type="button"
                onClick={cancelEditor}
                className="min-h-12 rounded-2xl px-6 py-3 text-sm font-semibold"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: theme.text,
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveEntry}
                disabled={!draft?.content.trim()}
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
                style={{ backgroundColor: primaryColor }}
              >
                <LuCheck size={18} />
                {draft?.id ? "Save changes" : "Save entry"}
              </button>
            </div>
          </section>
        </>
      ) : (
        <>
          <header className="mb-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.17em]"
                  style={{ color: primaryColor }}
                >
                  Your personal writing space
                </p>

                <h1
                  className="mt-3 text-3xl font-semibold sm:text-4xl"
                  style={{ color: theme.text }}
                >
                  Private Journal
                </h1>

                <p
                  className="mt-3 max-w-2xl text-sm leading-7 sm:text-base"
                  style={{ color: textMuted }}
                >
                  Your thoughts, moments and experiences, collected
                  into chapters of your own journey.
                </p>
              </div>

              <button
                type="button"
                onClick={startNewEntry}
                className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full px-6 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-85"
                style={{ backgroundColor: primaryColor }}
              >
                <LuPlus size={19} />
                New entry
              </button>
            </div>
          </header>

          <div
            className="mb-6 flex items-start gap-3 rounded-2xl border p-4"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <LuLockKeyhole
              size={19}
              className="mt-0.5 shrink-0"
              style={{ color: primaryColor }}
            />

            <p
              className="text-xs leading-6 sm:text-sm"
              style={{ color: textMuted }}
            >
              Your diary is visible only to you through the member
              application. Other members cannot open or modify your
              entries.
            </p>
          </div>

          <div className="relative mb-6">
            <LuSearch
              size={19}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: textMuted }}
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search diary chapters or entries..."
              aria-label="Search diary"
              className="min-h-14 w-full rounded-2xl border py-3 pl-12 pr-4 text-sm outline-none focus:ring-2"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: theme.text,
              }}
            />
          </div>

          <div className="mb-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span style={{ color: textMuted }}>
              <strong style={{ color: theme.text }}>
                {allEntries.length}
              </strong>{" "}
              {allEntries.length === 1 ? "entry" : "entries"}
            </span>

            <span style={{ color: textMuted }}>
              <strong style={{ color: theme.text }}>
                {sections.length}
              </strong>{" "}
              {sections.length === 1 ? "chapter" : "chapters"}
            </span>

            <span style={{ color: textMuted }}>
              Avg mood:{" "}
              <strong style={{ color: theme.text }}>
                {averageMood === null ? "—" : `${averageMood}/5`}
              </strong>
            </span>
          </div>

          {notice && (
            <div
              role="status"
              className="mb-5 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm"
              style={{
                backgroundColor: theme.bgSoft,
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              {notice}

              <button
                type="button"
                onClick={() => setNotice("")}
                aria-label="Dismiss message"
              >
                <LuX size={16} />
              </button>
            </div>
          )}

          {sections.length === 0 ? (
            <div
              className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border px-6 py-12 text-center"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
              }}
            >
              <div
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: theme.bgSoft,
                  color: primaryColor,
                }}
              >
                <LuBookOpen size={30} />
              </div>

              <h2
                className="text-xl font-semibold"
                style={{ color: theme.text }}
              >
                Your story starts here.
              </h2>

              <p
                className="mt-3 max-w-md text-sm leading-7"
                style={{ color: textMuted }}
              >
                Create your first diary entry and give it a chapter
                of its own. You can keep adding entries to that
                chapter or close it whenever you're ready for a
                new one.
              </p>

              <button
                type="button"
                onClick={startNewEntry}
                className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <LuPlus size={17} />
                Write your first entry
              </button>
            </div>
          ) : filteredSections.length === 0 ? (
            <div
              className="rounded-2xl border p-10 text-center"
              style={{
                backgroundColor: theme.card,
                borderColor: theme.border,
                color: textMuted,
              }}
            >
              No diary chapters match your search.
            </div>
          ) : (
            <div className="space-y-8">
              {filteredOpenSections.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <LuFolderOpen
                      size={19}
                      style={{ color: primaryColor }}
                    />

                    <h2
                      className="text-lg font-semibold"
                      style={{ color: theme.text }}
                    >
                      Open chapters
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filteredOpenSections.map((section) => (
                      <ChapterCard
                        key={section.id}
                        section={section}
                        theme={theme}
                        onOpen={() => {
                          setOpenedSectionId(section.id);
                          setPage("reader");
                        }}
                        onClose={() => closeSection(section.id)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {filteredClosedSections.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2">
                    <LuArchive
                      size={19}
                      style={{ color: textMuted }}
                    />

                    <h2
                      className="text-lg font-semibold"
                      style={{ color: theme.text }}
                    >
                      Previous chapters
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {filteredClosedSections.map((section) => (
                      <ChapterCard
                        key={section.id}
                        section={section}
                        theme={theme}
                        onOpen={() => {
                          setOpenedSectionId(section.id);
                          setPage("reader");
                        }}
                        onClose={() => closeSection(section.id)}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </>
      )}

      {/* Choose where the new entry belongs */}
      {placementOpen && (
        <Modal
          theme={theme}
          onClose={() => setPlacementOpen(false)}
        >
          {placementMode === "choose" ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.15em]"
                    style={{ color: primaryColor }}
                  >
                    Organise your writing
                  </p>

                  <h2
                    className="mt-2 text-xl font-semibold sm:text-2xl"
                    style={{ color: theme.text }}
                  >
                    Choose where to include this entry...
                  </h2>

                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: textMuted }}
                  >
                    Add it to an existing open chapter or start a new one.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setPlacementOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: theme.bgSoft }}
                >
                  <LuX size={18} />
                </button>
              </div>

              <div className="mt-6 max-h-[42vh] space-y-2 overflow-y-auto">
                {openSections.length > 0 ? (
                  openSections.map((section) => {
                    const selected = selectedSectionId === section.id;

                    return (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setSelectedSectionId(section.id)}
                        className="flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-colors"
                        style={{
                          backgroundColor: selected
                            ? theme.bgSoft
                            : theme.card,
                          borderColor: selected
                            ? theme.primary
                            : theme.border,
                        }}
                      >
                        <LuFolderOpen
                          size={21}
                          style={{
                            color: selected
                              ? theme.primary
                              : textMuted,
                          }}
                        />

                        <span className="min-w-0 flex-1">
                          <span
                            className="block truncate text-sm font-semibold"
                            style={{ color: theme.text }}
                          >
                            {section.title}
                          </span>

                          <span
                            className="mt-1 block text-xs"
                            style={{ color: textMuted }}
                          >
                            {section.entries.length}{" "}
                            {section.entries.length === 1
                              ? "entry"
                              : "entries"}
                          </span>
                        </span>

                        {selected && (
                          <LuCheck
                            size={20}
                            style={{ color: primaryColor }}
                          />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div
                    className="rounded-2xl border border-dashed p-5 text-center text-sm"
                    style={{
                      borderColor: theme.border,
                      color: textMuted,
                    }}
                  >
                    You don't have an open diary chapter yet.
                    Create one to save this entry.
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setPlacementMode("create")}
                className="mt-4 flex min-h-14 w-full items-center gap-3 rounded-2xl border border-dashed p-4 text-left transition-opacity hover:opacity-80"
                style={{
                  borderColor: theme.primary,
                  color: theme.primary,
                }}
              >
                <LuFolderPlus size={21} />

                <span>
                  <span className="block text-sm font-bold">
                    Create a new diary section
                  </span>

                  <span
                    className="mt-1 block text-xs"
                    style={{ color: textMuted }}
                  >
                    Start a fresh chapter for your writing.
                  </span>
                </span>
              </button>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setPlacementOpen(false)}
                  className="min-h-12 flex-1 rounded-xl px-4 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: theme.bgSoft,
                    color: theme.text,
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={saveIntoExistingSection}
                  disabled={!selectedSectionId}
                  className="min-h-12 flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ backgroundColor: primaryColor }}
                >
                  Save to this chapter
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-[0.15em]"
                    style={{ color: primaryColor }}
                  >
                    New diary chapter
                  </p>

                  <h2
                    className="mt-2 text-xl font-semibold sm:text-2xl"
                    style={{ color: theme.text }}
                  >
                    Give this chapter a name.
                  </h2>

                  <p
                    className="mt-2 text-sm leading-6"
                    style={{ color: textMuted }}
                  >
                    Your current entry will become the first entry in
                    this chapter.
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setPlacementOpen(false)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: theme.bgSoft }}
                >
                  <LuX size={18} />
                </button>
              </div>

              <label
                htmlFor="new-section-title"
                className="mb-2 mt-6 block text-sm font-semibold"
                style={{ color: theme.text }}
              >
                Chapter title
              </label>

              <input
                id="new-section-title"
                type="text"
                autoFocus
                maxLength={80}
                value={newSectionTitle}
                onChange={(event) =>
                  setNewSectionTitle(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    newSectionTitle.trim()
                  ) {
                    createSectionAndSaveEntry();
                  }
                }}
                placeholder="e.g. A New Beginning"
                className="min-h-14 w-full rounded-2xl border px-4 py-3 text-sm outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                  color: theme.text,
                }}
              />

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setPlacementMode("choose")}
                  className="min-h-12 flex-1 rounded-xl px-4 py-3 text-sm font-semibold"
                  style={{
                    backgroundColor: theme.bgSoft,
                    color: theme.text,
                  }}
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={createSectionAndSaveEntry}
                  disabled={!newSectionTitle.trim()}
                  className="min-h-12 flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ backgroundColor: primaryColor }}
                >
                  Create chapter & save
                </button>
              </div>
            </>
          )}
        </Modal>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <Modal
          theme={theme}
          onClose={() => setDeleteTarget(null)}
          maxWidth="max-w-md"
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: "rgba(220,38,38,0.1)",
              color: "#dc4564",
            }}
          >
            <LuTrash2 size={23} />
          </div>

          <h2
            className="mt-5 text-xl font-semibold"
            style={{ color: theme.text }}
          >
            Delete this entry?
          </h2>

          <p
            className="mt-2 text-sm leading-6"
            style={{ color: textMuted }}
          >
            You're about to delete "{deleteTarget.title}".
            This action cannot be undone.
          </p>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="min-h-12 flex-1 rounded-xl px-4 py-3 text-sm font-semibold"
              style={{
                backgroundColor: theme.bgSoft,
                color: theme.text,
              }}
            >
              Keep entry
            </button>

            <button
              type="button"
              onClick={confirmDeleteEntry}
              className="min-h-12 flex-1 rounded-xl px-4 py-3 text-sm font-bold text-white"
              style={{ backgroundColor: "#c52b50" }}
            >
              Delete entry
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Diary;
