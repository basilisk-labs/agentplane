import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const featuredPost = {
  href: "/blog/release-0-2-25-safer-commits-cleaner-release-flow",
  label: "Featured entry",
  title: "AgentPlane 0.2.25: safer commits, cleaner release flow",
  description:
    "The first public release story explains how commit-scope enforcement, publish gates, and docs parity changed the operational baseline.",
  meta: "Release journal • 4 min read",
};

const entries = [
  {
    href: featuredPost.href,
    title: featuredPost.title,
    excerpt:
      "Why stricter commit scope and cleaner release checks mattered in day-to-day repository work.",
    meta: "Release notes companion",
  },
  {
    href: "/blog/roadmap-0-5-agentplane-runner",
    title: "Roadmap 0.1 → 0.5: toward AgentPlane Runner",
    excerpt:
      "The product path from repository-native workflow discipline toward a broader execution runtime.",
    meta: "Roadmap",
  },
];

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

export default function BlogLanding() {
  return (
    <Layout
      title="Blog"
      description="AgentPlane release stories, workflow analysis, and implementation notes."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.kicker}>AgentPlane Journal</p>
          <h1>Release stories, product notes, and operational context.</h1>
          <p className={styles.lead}>
            The blog is the narrative layer around the product: what changed, why it mattered, and
            which repository constraints moved underneath the CLI surface.
          </p>
        </section>

        <div className={styles.layout}>
          <section className={styles.entriesSection} aria-labelledby="blog-entries-title">
            <div className={styles.sectionHeading}>
              <p className={styles.sectionLabel}>Latest</p>
              <h2 id="blog-entries-title">Recent entries</h2>
            </div>

            <article className={styles.featuredEntry}>
              <p className={styles.featuredLabel}>{featuredPost.label}</p>
              <h3>{featuredPost.title}</h3>
              <p>{featuredPost.description}</p>
              <p className={styles.entryMeta}>{featuredPost.meta}</p>
              <Link className={styles.entryLink} to={featuredPost.href}>
                Read featured post
              </Link>
            </article>

            <div className={styles.entryList}>
              {entries.map((entry) => (
                <article key={entry.href} className={styles.entryItem}>
                  <p className={styles.entryMeta}>{entry.meta}</p>
                  <h3>{entry.title}</h3>
                  <p>{entry.excerpt}</p>
                  <Link className={styles.entryLink} to={entry.href}>
                    Open entry
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <aside className={styles.sidebar} aria-labelledby="blog-sidebar-title">
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
