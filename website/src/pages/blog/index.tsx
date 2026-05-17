import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import type { Props as BlogListPageProps } from "@theme/BlogListPage";
import styles from "./index.module.css";

const references = [
  {
    href: "/docs/releases",
    title: "Release notes archive",
    note: "Formal version-by-version change record.",
  },
  {
    href: "/docs/user/overview",
    title: "Product overview",
    note: "Workflow model, setup path, and core terminology.",
  },
  {
    href: "/docs/developer/release-and-publishing",
    title: "Release and publishing",
    note: "Operational context behind the shipped surface.",
  },
];

type BlogEntry = {
  date: string;
  description: string;
  href: string;
  readingTime: string;
  title: string;
};

function toIsoDate(value: Date | string): string {
  return new Date(value).toISOString().slice(0, 10);
}

function toTimestamp(value: Date | string): number {
  return new Date(value).getTime();
}

function toReadingTime(value: number | undefined): string {
  if (!value) {
    return "Article";
  }

  return `${Math.ceil(value)} min read`;
}

function getNewestEntries(items: BlogListPageProps["items"]): BlogEntry[] {
  return items
    .toSorted(
      ({ content: left }, { content: right }) =>
        toTimestamp(right.metadata.date) - toTimestamp(left.metadata.date),
    )
    .map(({ content }) => ({
      date: toIsoDate(content.metadata.date),
      description:
        content.metadata.description ||
        "Product and release context from the AgentPlane development line.",
      href: content.metadata.permalink,
      readingTime: toReadingTime(content.metadata.readingTime),
      title: content.metadata.title,
    }));
}

export default function BlogLanding({ items }: BlogListPageProps) {
  const entries = getNewestEntries(items);

  return (
    <Layout
      title="Blog"
      description="AgentPlane release stories, workflow analysis, and implementation notes."
    >
      <main className={styles.page}>
        <div className={styles.bentoGrid}>
          <section className={`${styles.bentoItem} ${styles.hero} ${styles.colSpan12}`}>
            <p className={styles.kicker}>AgentPlane Journal</p>
            <h1>Release stories, product notes, and operational context.</h1>
            <p className={styles.lead}>
              The blog is where formal release notes become readable context: what changed, why it
              matters, and what operational assumptions moved.
            </p>
          </section>

          <section
            className={`${styles.bentoItem} ${styles.entriesSection} ${styles.colSpan8}`}
            aria-labelledby="blog-entries-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>Newest first</p>
              <h2 id="blog-entries-title">Latest writing</h2>
            </div>

            <div className={styles.entryList}>
              {entries.map((entry) => (
                <article key={entry.href} className={styles.entryItem}>
                  <div className={styles.entryHeader}>
                    <time dateTime={entry.date}>{entry.date}</time>
                    <span>{entry.readingTime}</span>
                  </div>
                  <div className={styles.entryBody}>
                    <h3>
                      <Link className={styles.entryTitleLink} to={entry.href}>
                        {entry.title}
                      </Link>
                    </h3>
                    <p>{entry.description}</p>
                  </div>
                  <Link className={styles.entryLink} to={entry.href}>
                    Open entry
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <aside
            className={`${styles.bentoItem} ${styles.sidebar} ${styles.colSpan4}`}
            aria-labelledby="blog-sidebar-title"
          >
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>Reference</p>
              <h2 id="blog-sidebar-title">Related surfaces</h2>
            </div>

            <div className={styles.referenceList}>
              {references.map((item) => (
                <Link key={item.href} className={styles.referenceItem} to={item.href}>
                  <strong>{item.title}</strong>
                  <span>{item.note}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  );
}
