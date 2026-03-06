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
    title: "Release 0.2.25",
    href: featuredPost.href,
    note: "Commit safety, publish gates, and documentation parity.",
    meta: "Public post • Previous release",
  },
  {
    title: "Roadmap 0.1 -> 0.5",
    href: "/blog/roadmap-0-5-agentplane-runner",
    note: "The operational path from deterministic CLI workflow to Agentplane Runner.",
    meta: "Public post • Strategy",
  },
  {
    title: "Formal release notes",
    href: "/docs/releases",
    note: "The source record for shipped changes, version by version.",
    meta: "Documentation • Archive",
  },
];

const motionNotes = [
  "Public posts are treated as editorial stories, not dump bins for changelog bullets.",
  "Visual hierarchy now distinguishes featured narrative, supporting signals, and archive navigation.",
  "Motion is restrained: ambient drift, staggered reveal, and precise hover response instead of decorative noise.",
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
              <div className={styles.eyebrowRow}>
                <span className={styles.heroChip}>Release analysis</span>
                <span className={styles.heroChip}>Workflow systems</span>
                <span className={styles.heroChip}>Policy surface</span>
              </div>

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

              <div className={styles.signalStrip}>
                {motionNotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>

            <article className={styles.featuredCard}>
              <p className={styles.featuredEyebrow}>{featuredPost.eyebrow}</p>
              <h2>{featuredPost.title}</h2>
              <p className={styles.featuredDescription}>{featuredPost.description}</p>
              <p className={styles.featuredMeta}>{featuredPost.meta}</p>
              <div className={styles.featuredRule} aria-hidden="true" />
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
            <p className={styles.sectionLabel}>Story rail</p>
            <h2 id="blog-entry-title">Public entries and archive paths</h2>
          </div>

          <div className={styles.archiveList}>
            {archiveLinks.map((item) => (
              <Link key={item.title} className={styles.archiveItem} to={item.href}>
                <span className={styles.archiveMeta}>{item.meta}</span>
                <strong>{item.title}</strong>
                <small>{item.note}</small>
                <span className={styles.archiveArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
