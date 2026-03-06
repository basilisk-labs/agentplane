import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const featuredPost = {
  href: "/blog/release-0-2-25-safer-commits-cleaner-release-flow",
  eyebrow: "Release Journal 01",
  title: "AgentPlane 0.2.25: safer commits, cleaner release flow",
  description:
    "The first public post covers the previous release: stricter commit scope, stronger publish gates, and tighter documentation checks.",
  meta: "Previous release • 4 min read",
};

const signalCards = [
  {
    label: "Commit safety",
    text: "Explicit allowlists reduce the chance that agents stage unrelated work during normal repository operations.",
  },
  {
    label: "Publish gates",
    text: "Release actions move behind clearer pre-publish validation so shipping stays traceable and reversible.",
  },
  {
    label: "Docs parity",
    text: "Website and documentation checks close drift earlier, before release notes and references diverge.",
  },
];

const archiveLinks = [
  {
    title: "Read the featured post",
    href: featuredPost.href,
    note: "Open the first public release story.",
  },
  {
    title: "Open the roadmap post",
    href: "/blog/roadmap-0-5-agentplane-runner",
    note: "Read the public roadmap from baseline workflow to Agentplane Runner.",
  },
  {
    title: "Browse release notes",
    href: "/docs/releases",
    note: "Go deeper into version-by-version changes and release records.",
  },
];

export default function BlogLanding() {
  return (
    <Layout
      title="Blog"
      description="AgentPlane release stories, workflow analysis, and implementation notes."
    >
      <main className={styles.page}>
        <section className={`${styles.hero} grid-paper`}>
          <div className={styles.heroHeader}>
            <p className={styles.kicker}>AgentPlane Journal</p>
            <p className={styles.status}>Editorial feed is live</p>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1>Release notes are not enough when the product promise is workflow control.</h1>
              <p className={styles.lead}>
                The blog now tracks why a release matters, what operational risk it removes, and
                which repository constraints changed underneath the CLI surface.
              </p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryCta} to={featuredPost.href}>
                  Open first post
                </Link>
                <Link className={styles.secondaryCta} to="/docs/releases/v0.2.25">
                  Open release notes
                </Link>
              </div>
            </div>

            <article className={styles.featuredCard}>
              <p className={styles.featuredEyebrow}>{featuredPost.eyebrow}</p>
              <h2>{featuredPost.title}</h2>
              <p className={styles.featuredDescription}>{featuredPost.description}</p>
              <p className={styles.featuredMeta}>{featuredPost.meta}</p>
              <Link className={styles.featuredLink} to={featuredPost.href}>
                Read article
              </Link>
            </article>
          </div>
        </section>

        <section className={styles.signalSection} aria-labelledby="blog-signals-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Focus areas</p>
            <h2 id="blog-signals-title">What the previous release changed in practice</h2>
          </div>

          <div className={styles.signalGrid}>
            {signalCards.map((card) => (
              <article key={card.label} className={styles.signalCard}>
                <p className={styles.signalLabel}>{card.label}</p>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.archiveSection} aria-labelledby="blog-entry-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Start here</p>
            <h2 id="blog-entry-title">Direct paths into the blog and release archive</h2>
          </div>

          <div className={styles.archiveList}>
            {archiveLinks.map((item) => (
              <Link key={item.title} className={styles.archiveItem} to={item.href}>
                <span>{item.title}</span>
                <small>{item.note}</small>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
