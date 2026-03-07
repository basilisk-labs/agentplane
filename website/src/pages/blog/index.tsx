import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const entries = [
  {
    href: "/blog/release-0-3-2-smoother-upgrades-and-framework-dev",
    title: "AgentPlane 0.3.2: smoother upgrades, cleaner finish, better framework dev",
    excerpt:
      "Why upgrades now default to the practical path, why finish leaves a cleaner tree, and why framework contributors are less likely to run the wrong binary.",
    meta: "Release journal • 5 min read",
  },
  {
    href: "/blog/release-0-3-1-publish-recovery-and-quieter-surface",
    title: "AgentPlane 0.3.1: publish recovery, quieter homepage, cleaner docs",
    excerpt:
      "How the 0.3.x line recovered from a blocked publish and why the public surface intentionally became quieter again.",
    meta: "Release journal • 4 min read",
  },
  {
    href: "/blog/release-0-3-0-policy-gateway-and-release-discipline",
    title: "AgentPlane 0.3.0: policy gateway, stricter release discipline",
    excerpt:
      "How policy routing became explicit, release notes became stricter, and rerunning a publish became safer.",
    meta: "Release journal • 5 min read",
  },
  {
    href: "/blog/release-0-2-25-safer-commits-cleaner-release-flow",
    title: "AgentPlane 0.2.25: safer commits, cleaner release flow",
    excerpt:
      "Why stricter commit scope and cleaner release checks mattered in day-to-day repository work.",
    meta: "Release journal • 4 min read",
  },
  {
    href: "/blog/roadmap-0-5-agentplane-runner",
    title: "Roadmap 0.1 → 0.5: toward AgentPlane Runner",
    excerpt:
      "The product path from repository-native workflow discipline toward a broader execution runtime.",
    meta: "Roadmap • 5 min read",
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

            <div className={styles.entryList}>
              {entries.map((entry) => (
                <article key={entry.href} className={styles.entryItem}>
                  <p className={styles.entryMeta}>{entry.meta}</p>
                  <h3>
                    <Link className={styles.entryTitleLink} to={entry.href}>
                      {entry.title}
                    </Link>
                  </h3>
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
