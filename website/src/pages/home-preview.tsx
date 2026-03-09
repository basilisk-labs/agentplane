import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { homepageContent } from "../data/homepage-content";
import styles from "./home-preview.module.css";

type Action = {
  label: string;
  to: string;
  variant: "primary" | "secondary";
};

type ControlTabId = (typeof homepageContent.controlModel.tabs)[number]["id"];

function ActionLink({ action }: { action: Action }): ReactNode {
  const className =
    action.variant === "primary"
      ? `${styles.action} ${styles.actionPrimary}`
      : `${styles.action} ${styles.actionSecondary}`;

  return (
    <Link className={className} to={action.to}>
      {action.label}
    </Link>
  );
}

function SectionLead({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}): ReactNode {
  return (
    <div className={styles.sectionLead}>
      <span className={styles.sectionLabel}>{label}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function HomePreview(): ReactNode {
  const {
    seo,
    hero,
    problem,
    repositorySurface,
    workflowPath,
    workflowModes,
    controlModel,
    harness,
    docsRail,
    journal,
    closing,
  } = homepageContent;

  const [activeControlTab, setActiveControlTab] = useState<ControlTabId>(
    controlModel.tabs[0]?.id ?? "approvals",
  );

  const selectedControlTab = useMemo(
    () => controlModel.tabs.find((tab) => tab.id === activeControlTab) ?? controlModel.tabs[0],
    [activeControlTab, controlModel.tabs],
  );

  return (
    <Layout title={seo.title} description={seo.description}>
      <main className={styles.page}>
        <div className={styles.pageGlow} aria-hidden="true" />
        <div className={styles.pageNoise} aria-hidden="true" />

        <section className={`${styles.hero} ${styles.shell}`}>
          <div className={styles.heroCopy}>
            <span className={styles.heroEyebrow}>{hero.eyebrow}</span>
            <h1>{hero.title}</h1>
            <p className={styles.heroSubtitle}>{hero.subtitle}</p>

            <div className={styles.actionsRow}>
              {hero.actions.map((action) => (
                <ActionLink key={action.label} action={action} />
              ))}
            </div>

            <div className={styles.heroChips}>
              {hero.chips.map((chip) => (
                <span key={chip} className={styles.heroChip}>
                  {chip}
                </span>
              ))}
            </div>

            <ul className={styles.heroBullets}>
              {hero.supportBullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className={styles.heroProofStack}>
            <article className={`${styles.heroCard} ${styles.heroCardPrimary} grid-paper`}>
              <span className={styles.cardKicker}>{hero.terminalPanel.title}</span>
              <pre className={styles.commandPre} aria-label="AgentPlane workflow preview">
                <code>
                  {hero.terminalPanel.lines.map((line) => (
                    <span key={line} className={styles.commandLine}>
                      <span className={styles.commandPrompt}>$</span>
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
            </article>

            <div className={styles.heroStackLower}>
              <article className={`${styles.heroCard} ${styles.heroCardSecondary}`}>
                <span className={styles.cardKicker}>{hero.repositoryPanel.title}</span>
                <ul className={styles.miniList}>
                  {hero.repositoryPanel.lines.map((line) => (
                    <li key={line}>
                      <code>{line}</code>
                    </li>
                  ))}
                </ul>
                <p>{hero.repositoryPanel.text}</p>
              </article>

              <article className={`${styles.heroCard} ${styles.heroCardTertiary}`}>
                <span className={styles.cardKicker}>{hero.trustPanel.title}</span>
                <ul className={styles.trustList}>
                  {hero.trustPanel.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>{hero.trustPanel.text}</p>
              </article>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={problem.label} title={problem.title} text={problem.text} />

          <div className={styles.compareGrid}>
            <article className={`${styles.compareCard} ${styles.compareCardMuted}`}>
              <span className={styles.compareLabel}>{problem.beforeTitle}</span>
              <ul className={styles.compareList}>
                {problem.before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={`${styles.compareCard} ${styles.compareCardAccent}`}>
              <span className={styles.compareLabel}>{problem.afterTitle}</span>
              <ul className={styles.compareList}>
                {problem.after.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead
            label={repositorySurface.label}
            title={repositorySurface.title}
            text={repositorySurface.intro}
          />

          <div className={styles.repositoryGrid}>
            {repositorySurface.items.map((item) => (
              <article key={item.name} className={styles.repositoryCard}>
                <span className={styles.cardKicker}>{item.kicker}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
                <div className={styles.artifactRow}>
                  {item.artifact.map((fragment) => (
                    <span key={fragment} className={styles.artifactChip}>
                      {fragment}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead
            label={workflowPath.label}
            title={workflowPath.title}
            text={workflowPath.text}
          />

          <ol className={styles.timeline}>
            {workflowPath.steps.map((step, index) => (
              <li key={step.name} className={styles.timelineItem}>
                <span className={styles.timelineIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h3>{step.name}</h3>
                    <code>{step.artifact}</code>
                  </div>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={workflowModes.label} title={workflowModes.title} />

          <div className={styles.modeGrid}>
            {workflowModes.items.map((mode) => (
              <article key={mode.name} className={styles.modeCard}>
                <span className={styles.modeBadge}>{mode.badge}</span>
                <h3>{mode.name}</h3>
                <p>{mode.text}</p>
                <ul className={styles.modeList}>
                  {mode.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead
            label={controlModel.label}
            title={controlModel.title}
            text={controlModel.text}
          />

          <div className={styles.controlGrid}>
            <article className={styles.controlNarrative}>
              <ul className={styles.proofPointList}>
                {controlModel.proofPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>

            <article className={styles.controlPanel}>
              <div className={styles.tabRow} role="tablist" aria-label="Trust surfaces">
                {controlModel.tabs.map((tab) => {
                  const active = tab.id === selectedControlTab.id;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={`${styles.tabButton} ${active ? styles.tabButtonActive : ""}`}
                      onClick={() => setActiveControlTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className={styles.tabPanel} role="tabpanel">
                <span className={styles.cardKicker}>{selectedControlTab.kicker}</span>
                <h3>{selectedControlTab.title}</h3>
                <p>{selectedControlTab.text}</p>
                <div className={styles.tabArtifacts}>
                  {selectedControlTab.artifact.map((item) => (
                    <span key={item} className={styles.artifactChip}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={harness.label} title={harness.title} text={harness.text} />

          <article className={styles.harnessCard}>
            <div className={styles.harnessLoop}>
              {harness.steps.map((step, index) => (
                <div key={step} className={styles.harnessStep}>
                  <span>{step}</span>
                  {index < harness.steps.length - 1 ? (
                    <span className={styles.harnessArrow}>→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={docsRail.label} title={docsRail.title} />

          <div className={styles.docsGrid}>
            {docsRail.groups.map((group) => (
              <article key={group.name} className={styles.docsCard}>
                <h3>{group.name}</h3>
                <div className={styles.docsLinks}>
                  {group.links.map((link) => (
                    <Link key={link.label} className={styles.inlineLink} to={link.to}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={journal.label} title={journal.title} />

          <div className={styles.journalGrid}>
            {journal.items.map((item) => (
              <Link key={item.name} className={styles.journalCard} to={item.to}>
                <span className={styles.cardKicker}>{item.name}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.shell} ${styles.closingWrap}`}>
          <article className={styles.closingCard}>
            <span className={styles.sectionLabel}>{closing.label}</span>
            <h2>{closing.title}</h2>
            <p>{closing.text}</p>
            <div className={styles.actionsRow}>
              {closing.actions.map((action) => (
                <ActionLink key={action.label} action={action} />
              ))}
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}
