import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const signalCards = [
  {
    label: "Policy gates",
    text: "Agent actions stay inside explicit repository constraints instead of drifting through prompt improvisation.",
  },
  {
    label: "Task traces",
    text: "Every mutation path is tied back to task state, verification records, and operational evidence.",
  },
  {
    label: "Release discipline",
    text: "Shipping flow, notes, and publish checks stay aligned instead of diverging under pressure.",
  },
];

const entryLinks = [
  {
    title: "Open docs",
    href: "/docs/user/overview",
    note: "Start with the workflow model, setup path, and command surface.",
  },
  {
    title: "Read the blog",
    href: "/blog",
    note: "See release stories, roadmap context, and implementation commentary.",
  },
  {
    title: "Browse release notes",
    href: "/docs/releases",
    note: "Use the formal change archive when you need exact version detail.",
  },
];

export default function Home(): ReactNode {
  return (
    <Layout
      title="AgentPlane"
      description="Agent-first workflow tooling with deterministic policy gates and audit-ready traces."
    >
      <main className={styles.page}>
        <section className={`${styles.hero} grid-paper`}>
          <div className={styles.heroBackdrop} aria-hidden="true">
            <span className={styles.orbPrimary} />
            <span className={styles.orbSecondary} />
            <span className={styles.orbTertiary} />
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.pixelTag}>WF-01</p>
              <img
                className={styles.logoIcon}
                src="/img/agentplane-favicon.svg"
                alt="AgentPlane mark"
              />
              <img className={styles.wordmark} src="/img/agentplane.svg" alt="agent/plane" />

              <div className={styles.eyebrowRow}>
                <span className={styles.heroChip}>Deterministic workflow</span>
                <span className={styles.heroChip}>Repository-native</span>
                <span className={styles.heroChip}>Audit-ready traces</span>
              </div>

              <p className={styles.subtitle}>
                AgentPlane is the workflow layer for repositories that need agent execution without
                surrendering policy boundaries, task traceability, or release discipline.
              </p>

              <div className={styles.heroActions}>
                <Link className={styles.primaryCta} to="/docs/user/overview">
                  Start with docs
                </Link>
                <Link className={styles.secondaryCta} to="/blog">
                  Explore journal
                </Link>
              </div>

              <div className={styles.signalStrip}>
                <p>Public site is no longer a placeholder shell. The core sections are live.</p>
                <p>Blog, docs, and release records now read as one coherent publication surface.</p>
              </div>
            </div>

            <aside className={styles.artifactPanel}>
              <p className={styles.panelLabel}>Install surface</p>
              <pre className={styles.artifact} aria-label="Install command">
                <code>npm i -g agentplane</code>
              </pre>
              <p className={styles.panelNote}>
                Use the docs when you need the full command model; use the blog when you need
                release and architecture context.
              </p>
            </aside>
          </div>
        </section>

        <section className={styles.signalSection} aria-labelledby="home-signals-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Core system</p>
            <h2 id="home-signals-title">
              Why the product feels different from generic agent shells
            </h2>
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

        <section className={styles.entrySection} aria-labelledby="home-entry-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>Entry points</p>
            <h2 id="home-entry-title">Choose the fastest path into the project</h2>
          </div>

          <div className={styles.entryRail}>
            {entryLinks.map((item) => (
              <Link key={item.title} className={styles.entryItem} to={item.href}>
                <strong>{item.title}</strong>
                <small>{item.note}</small>
                <span className={styles.entryArrow} aria-hidden="true">
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
