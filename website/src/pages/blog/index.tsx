import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const entries = [
  {
    href: "/blog/release-0-2-25-safer-commits-cleaner-release-flow",
    title: "AgentPlane 0.2.25: safer commits, cleaner release flow",
    excerpt:
      "Why stricter commit scope and cleaner release checks mattered in day-to-day repository work.",
    meta: "Release journal • 4 min read",
    image: "/img/blog/release-0-2-25-kandinsky-agentplane.svg",
  },
  {
    href: "/blog/roadmap-0-5-agentplane-runner",
    title: "Roadmap 0.1 → 0.5: toward AgentPlane Runner",
    excerpt:
      "The product path from repository-native workflow discipline toward a broader execution runtime.",
    meta: "Roadmap • 5 min read",
    image: "/img/blog/roadmap-kandinsky-agentplane.svg",
  },
  {
    href: "/blog/release-0-3-0-policy-gateway-and-release-discipline",
    title: "AgentPlane 0.3.0: policy gateway, stricter release discipline",
    excerpt:
      "How gateway structure, release-note quality, and publish rerun discipline tightened the governance layer.",
    meta: "Unlisted draft • release analysis",
    image: "/img/blog/release-0-3-0-kandinsky-agentplane.svg",
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
                  <Link
                    className={styles.entryVisual}
                    to={entry.href}
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <img src={entry.image} alt="" />
                  </Link>
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
