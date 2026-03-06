import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { homepageContent } from "../data/homepage-content";
import styles from "./index.module.css";

export default function Home(): ReactNode {
  return (
    <Layout
      title="AgentPlane"
      description="Agent-first workflow tooling with deterministic policy gates and audit-ready traces."
    >
      <main className={styles.page}>
        <section className={`${styles.hero} grid-paper`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.pixelTag}>{homepageContent.hero.kicker}</p>
              <div className={styles.brandRow}>
                <img
                  className={styles.logoIcon}
                  src="/img/agentplane-favicon.svg"
                  alt="AgentPlane mark"
                />
                <img className={styles.wordmark} src="/img/agentplane.svg" alt="agent/plane" />
              </div>

              <div className={styles.eyebrowRow}>
                {homepageContent.hero.chips.map((chip) => (
                  <span key={chip} className={styles.heroChip}>
                    {chip}
                  </span>
                ))}
              </div>

              <h1 className={styles.heroTitle}>{homepageContent.hero.title}</h1>
              <p className={styles.subtitle}>{homepageContent.hero.subtitle}</p>

              <div className={styles.heroActions}>
                {homepageContent.hero.actions.map((action) => (
                  <Link
                    key={action.label}
                    className={
                      action.variant === "primary" ? styles.primaryCta : styles.secondaryCta
                    }
                    to={action.to}
                  >
                    {action.label}
                  </Link>
                ))}
              </div>

              <div className={styles.signalStrip}>
                {homepageContent.hero.notes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </div>

            <aside className={styles.artifactPanel}>
              <p className={styles.panelLabel}>Repository surface</p>
              <pre className={styles.artifact} aria-label="Install command">
                <code>
                  AGENTS.md {"\n"}.agentplane/ {"\n"}start → verify → finish
                </code>
              </pre>
              <p className={styles.panelNote}>
                The visible system is the product surface: policy gateway, repo-local artifacts, and
                guarded lifecycle transitions instead of opaque assistant state.
              </p>
            </aside>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="home-why-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{homepageContent.whyItExists.label}</p>
            <h2 id="home-why-title">{homepageContent.whyItExists.title}</h2>
          </div>

          <div className={styles.reasonGrid}>
            {homepageContent.whyItExists.items.map((item) => (
              <article key={item} className={styles.reasonItem}>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="home-loop-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{homepageContent.operatingLoop.label}</p>
            <h2 id="home-loop-title">{homepageContent.operatingLoop.title}</h2>
          </div>

          <div className={styles.loopRail}>
            {homepageContent.operatingLoop.steps.map((step, index) => (
              <article key={step.name} className={styles.loopStep}>
                <p className={styles.loopIndex}>{String(index + 1).padStart(2, "0")}</p>
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="home-artifacts-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{homepageContent.repositorySurface.label}</p>
            <h2 id="home-artifacts-title">{homepageContent.repositorySurface.title}</h2>
          </div>

          <div className={styles.systemGrid}>
            {homepageContent.repositorySurface.items.map((item) => (
              <article key={item.name} className={styles.systemItem}>
                <strong>{item.name}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="home-modes-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{homepageContent.workflowModes.label}</p>
            <h2 id="home-modes-title">{homepageContent.workflowModes.title}</h2>
          </div>

          <div className={styles.modeGrid}>
            {homepageContent.workflowModes.items.map((mode) => (
              <article key={mode.name} className={styles.modeItem}>
                <p className={styles.modeLabel}>{mode.name}</p>
                <p>{mode.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="home-docs-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{homepageContent.docsRail.label}</p>
            <h2 id="home-docs-title">{homepageContent.docsRail.title}</h2>
          </div>

          <div className={styles.docsRail}>
            {homepageContent.docsRail.groups.map((group) => (
              <article key={group.name} className={styles.docsGroup}>
                <p className={styles.docsGroupLabel}>{group.name}</p>
                <div className={styles.docsLinks}>
                  {group.links.map((link) => (
                    <Link key={link.to} className={styles.docsLink} to={link.to}>
                      <span>{link.label}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="home-journal-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{homepageContent.journal.label}</p>
            <h2 id="home-journal-title">{homepageContent.journal.title}</h2>
          </div>

          <div className={styles.journalRail}>
            {homepageContent.journal.items.map((item) => (
              <Link key={item.to} className={styles.journalItem} to={item.to}>
                <strong>{item.name}</strong>
                <p>{item.text}</p>
                <span className={styles.entryArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.closingSection} aria-labelledby="home-closing-title">
          <div className={styles.sectionHeading}>
            <p className={styles.sectionLabel}>{homepageContent.closing.label}</p>
            <h2 id="home-closing-title">{homepageContent.closing.title}</h2>
          </div>
          <p className={styles.closingText}>{homepageContent.closing.text}</p>
          <div className={styles.heroActions}>
            {homepageContent.closing.actions.map((action) => (
              <Link
                key={action.label}
                className={action.variant === "primary" ? styles.primaryCta : styles.secondaryCta}
                to={action.to}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
