
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

import {
  LuArrowLeft,
  LuBookOpen,
  LuChevronRight,
  LuExternalLink,
  LuFileText,
  LuSearch,
} from "react-icons/lu";

import { useTheme } from "../../contexts/ThemeContext.jsx";

/*
 * Load every Markdown document in this directory as raw text.
 * New .md files can be added without changing the import logic.
 */
const markdownFiles = import.meta.glob("./*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

/* Help article directory. */
const ARTICLES = [
  {
    slug: "getting-started",
    file: "GettingStarted.md",
    title: "Getting Started",
    category: "Using P-REACH OUT",
    description:
      "Learn about P-REACH OUT International, creating your account and navigating the member platform.",
  },
  {
    slug: "data-privacy",
    file: "DataPrivacy.md",
    title: "Data Privacy",
    category: "Privacy & Security",
    description:
      "Understand how personal information is handled and how to manage your privacy.",
  },
  {
    slug: "feedback-and-teams",
    file: "Feedback&Teams.md",
    title: "Feedback & Contacting the Team",
    category: "Communication",
    description:
      "Learn how to contact P-REACH OUT, submit feedback and follow up on enquiries.",
  },
  {
    slug: "groups",
    file: "Groups.md",
    title: "Groups & Community",
    category: "Community",
    description:
      "Understand group participation, conversations and community communication.",
  },
  {
    slug: "content-and-news",
    file: "Content&News.md",
    title: "Content & News",
    category: "Information",
    description:
      "Learn where to find organizational news, programmes, missions and published information.",
  },
  {
    slug: "payments-and-records",
    file: "Payments&Records.md",
    title: "Payments & Records",
    category: "Contributions",
    description:
      "Understand the platform's current payment status and how contribution information will be handled.",
  },
];

/* Extract readable text from a Markdown heading node. */
function extractHeadingText(node) {
  if (!node) return "";

  if (typeof node.value === "string") {
    return node.value;
  }

  if (Array.isArray(node.children)) {
    return node.children
      .map(extractHeadingText)
      .join("");
  }

  return "";
}

/* Generate table-of-contents entries from Markdown headings. */
function extractTableOfContents(markdown) {
  if (!markdown.trim()) return [];

  const tree = remark().parse(markdown);
  const slugger = new GithubSlugger();
  const sections = [];

  visit(tree, "heading", (node) => {
    const title = extractHeadingText(node).trim();

    if (!title) return;

    const id = slugger.slug(title);

    if (node.depth >= 2) {
      sections.push({
        id,
        title,
        depth: node.depth,
      });
    }
  });

  return sections;
}

/* Article Markdown styling. */
function MarkdownContent({ children, theme }) {
  return (
    <article
      className="help-docs-content min-w-0"
      style={{
        color: theme.text,
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h1: ({ children: heading, ...props }) => (
            <h1
              {...props}
              className="mb-6 mt-10 text-3xl font-bold tracking-tight first:mt-0"
              style={{ color: theme.text }}
            >
              {heading}
            </h1>
          ),

          h2: ({ children: heading, ...props }) => (
            <h2
              {...props}
              className="mb-4 mt-10 scroll-mt-28 border-b pb-3 text-2xl font-semibold tracking-tight first:mt-0"
              style={{
                color: theme.text,
                borderColor: theme.border,
              }}
            >
              {heading}
            </h2>
          ),

          h3: ({ children: heading, ...props }) => (
            <h3
              {...props}
              className="mb-3 mt-7 scroll-mt-28 text-lg font-semibold"
              style={{ color: theme.text }}
            >
              {heading}
            </h3>
          ),

          p: ({ children: paragraph, ...props }) => (
            <p
              {...props}
              className="mb-5 text-[15px] leading-8"
              style={{ color: theme.textMid }}
            >
              {paragraph}
            </p>
          ),

          ul: ({ children: list, ...props }) => (
            <ul
              {...props}
              className="mb-6 ml-6 list-disc space-y-2 text-[15px] leading-7"
              style={{ color: theme.textMid }}
            >
              {list}
            </ul>
          ),

          ol: ({ children: list, ...props }) => (
            <ol
              {...props}
              className="mb-6 ml-6 list-decimal space-y-2 text-[15px] leading-7"
              style={{ color: theme.textMid }}
            >
              {list}
            </ol>
          ),

          li: ({ children: item, ...props }) => (
            <li {...props} className="pl-1">
              {item}
            </li>
          ),

          a: ({ href, children: link, ...props }) => {
            const external = /^https?:\/\//i.test(href || "");

            return (
              <a
                {...props}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="font-semibold underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{ color: theme.primary }}
              >
                {link}
                {external && (
                  <LuExternalLink
                    className="ml-1 inline-block"
                    size={13}
                  />
                )}
              </a>
            );
          },

          blockquote: ({ children: quote, ...props }) => (
            <blockquote
              {...props}
              className="my-6 rounded-r-xl border-l-4 px-5 py-4"
              style={{
                backgroundColor: theme.bgSoft,
                borderColor: theme.primary,
              }}
            >
              {quote}
            </blockquote>
          ),

          table: ({ children: rows, ...props }) => (
            <div className="my-6 overflow-x-auto rounded-xl border"
              style={{ borderColor: theme.border }}
            >
              <table
                {...props}
                className="w-full border-collapse text-sm"
              >
                {rows}
              </table>
            </div>
          ),

          th: ({ children: heading, ...props }) => (
            <th
              {...props}
              className="border-b px-4 py-3 text-left font-bold"
              style={{
                backgroundColor: theme.bgSoft,
                borderColor: theme.border,
                color: theme.text,
              }}
            >
              {heading}
            </th>
          ),

          td: ({ children: cell, ...props }) => (
            <td
              {...props}
              className="border-b px-4 py-3 leading-6"
              style={{
                borderColor: theme.border,
                color: theme.textMid,
              }}
            >
              {cell}
            </td>
          ),

          hr: () => (
            <hr
              className="my-8"
              style={{ borderColor: theme.border }}
            />
          ),

          strong: ({ children: content, ...props }) => (
            <strong
              {...props}
              className="font-bold"
              style={{ color: theme.text }}
            >
              {content}
            </strong>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
}

export default function HelpDocsArticles() {
  const { theme } = useTheme();
  const { articleSlug } = useParams();

  const article = ARTICLES.find(
    (item) => item.slug === articleSlug
  );

  const markdown = article
    ? markdownFiles[`./${article.file}`] || ""
    : "";

  const tableOfContents = useMemo(
    () => extractTableOfContents(markdown),
    [markdown]
  );

  if (articleSlug && !article) {
    return (
      <main className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6">
        <div
          className="rounded-2xl border p-8 text-center"
          style={{
            backgroundColor: theme.card,
            borderColor: theme.border,
          }}
        >
          <LuFileText
            size={36}
            className="mx-auto mb-4"
            style={{ color: theme.primary }}
          />

          <h1 className="text-xl font-bold">
            Article not found
          </h1>

          <p
            className="mt-2 text-sm"
            style={{ color: theme.textMid }}
          >
            This Help Docs article could not be found.
          </p>

          <Link
            to="/help-docs"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold no-underline"
            style={{ color: theme.primary }}
          >
            <LuArrowLeft size={17} />
            Back to Help Docs
          </Link>
        </div>
      </main>
    );
  }

  /* Help Docs directory */
  if (!article) {
    return (
      <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10">
        <section
          className="overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12"
          style={{
            background:
              "linear-gradient(120deg, #164E63 0%, #0D6E64 100%)",
            color: "#FFFFFF",
          }}
        >
          <div className="flex items-center gap-2 text-sm text-white/75">
            <LuBookOpen size={17} />
            P-REACH OUT International
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Help Docs
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Find guidance on using P-REACH OUT, understanding
            its services and getting help with your account.
          </p>
        </section>

        <section className="mt-9">
          <div className="mb-6">
            <h2
              className="text-2xl font-semibold"
              style={{ color: theme.text }}
            >
              Browse help articles
            </h2>

            <p
              className="mt-2 text-sm"
              style={{ color: theme.textMid }}
            >
              Choose a topic to find the information you need.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {ARTICLES.map((item) => (
              <Link
                key={item.slug}
                to={`/help-docs/${item.slug}`}
                className="group flex min-h-48 flex-col rounded-2xl border p-5 no-underline transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.border,
                }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: theme.bgSoft,
                    color: theme.primary,
                  }}
                >
                  <LuFileText size={21} />
                </div>

                <p
                  className="mt-5 text-[10px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: theme.primary }}
                >
                  {item.category}
                </p>

                <h3
                  className="mt-2 text-base font-bold"
                  style={{ color: theme.text }}
                >
                  {item.title}
                </h3>

                <p
                  className="mt-2 flex-1 text-sm leading-6"
                  style={{ color: theme.textMid }}
                >
                  {item.description}
                </p>

                <span
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold"
                  style={{ color: theme.primary }}
                >
                  Read article
                  <LuChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

  /* Individual article page */
  return (
    <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-10">
      <header
        className="overflow-hidden rounded-3xl"
        style={{
          background:
            "linear-gradient(120deg, #164E63 0%, #0D6E64 100%)",
          color: "#FFFFFF",
        }}
      >
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <Link
            to="/help-docs"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 no-underline transition-opacity hover:text-white"
          >
            <LuArrowLeft size={17} />
            Help Docs
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
            {article.category}
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">
            {article.description}
          </p>
        </div>

        {tableOfContents.length > 0 && (
          <nav
            aria-label="Article sections"
            className="border-t border-white/15 px-5 py-4 sm:px-8"
          >
            <div className="flex gap-2 overflow-x-auto pb-1">
              {tableOfContents.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="shrink-0 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white no-underline transition-colors hover:bg-white/20"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <div className="mx-auto mt-10 max-w-[900px]">
        <div
          className="mb-8 flex items-center gap-2 text-xs"
          style={{ color: theme.textMid }}
        >
          <Link
            to="/help-docs"
            className="no-underline hover:underline"
            style={{ color: theme.primary }}
          >
            Help Docs
          </Link>

          <LuChevronRight size={13} />

          <span>{article.title}</span>
        </div>

        {markdown.trim() ? (
          <MarkdownContent
            theme={theme}
            key={article.slug}
          >
            {markdown}
          </MarkdownContent>
        ) : (
          <div
            className="rounded-2xl border px-6 py-12 text-center"
            style={{
              backgroundColor: theme.card,
              borderColor: theme.border,
            }}
          >
            <LuBookOpen
              size={32}
              className="mx-auto mb-4"
              style={{ color: theme.primary }}
            />

            <h2
              className="text-lg font-bold"
              style={{ color: theme.text }}
            >
              Article being prepared
            </h2>

            <p
              className="mx-auto mt-2 max-w-md text-sm leading-7"
              style={{ color: theme.textMid }}
            >
              This guide is currently being prepared by
              P-REACH OUT International. Please check back
              for more information.
            </p>
          </div>
        )}

        <div
          className="mt-12 border-t pt-6"
          style={{ borderColor: theme.border }}
        >
          <Link
            to="/help-docs"
            className="inline-flex items-center gap-2 text-sm font-bold no-underline transition-opacity hover:opacity-70"
            style={{ color: theme.primary }}
          >
            <LuSearch size={17} />
            Browse more Help Docs
          </Link>
        </div>
      </div>
    </main>
  );
}
