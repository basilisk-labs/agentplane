import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const entries = [
  {
    href: "/blog/release-0-3-2-smoother-upgrades-and-framework-dev",
    title: "AgentPlane 0.3.2: smoother upgrades, cleaner finish, better framework dev",
    excerpt:
      "Why upgrades got less weird, why finish now leaves a cleaner tree, and why framework contributors are less likely to run the wrong binary.",
    meta: "Release journal • 5 min read",
  },
  {
    href: "/blog/release-0-3-1-publish-recovery-and-quieter-surface",
    title: "AgentPlane 0.3.1: publish recovery, quieter homepage, cleaner docs",
    excerpt:
      "How the 0.3.x line recovered from a blocked publish and why the public surface got quieter on purpose.",
    meta: "Release journal • 4 min read",
  },
  {
    href: "/blog/release-0-3-0-policy-gateway-and-release-discipline",
    title: "AgentPlane 0.3.0: policy gateway, stricter release discipline",
    excerpt:
      "How policy routing became easier to follow, release notes got more concrete, and safe publish reruns stopped being awkward.",
    meta: "Release journal • 5 min read",
  },
  {
    href: "/blog/release-0-2-25-safer-commits-cleaner-release-flow",
    title: "AgentPlane 0.2.25: safer commits, cleaner release flow",
    excerpt:
      "Why stricter commit scope and cleaner release checks mattered once agents started touching real repositories.",
    meta: "Release journal • 4 min read",
  },
  {
    href: "/blog/roadmap-0-5-agentplane-runner",
    title: "Roadmap 0.1 → 0.5: toward AgentPlane Runner",
    excerpt:
      "The path from a strict repository workflow tool to a more autonomous runtime, without dropping the audit trail on the floor.",
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
            The blog is where the formal release notes turn into plain language: what changed, why
            it matters, and which repo constraints quietly shifted underneath the CLI.
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
