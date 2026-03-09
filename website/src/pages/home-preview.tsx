import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { homepageContent } from "../data/homepage-content";
import styles from "./home-preview.module.css";

type Action = {
  label: string;
  to: string;
  variant: "primary" | "secondary";
};

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

  const repositoryTree = [
    ".",
    "├── AGENTS.md / CLAUDE.md",
    "└── .agentplane/",
    "    ├── config.json",
    "    ├── agents/",
    "    ├── policy/",
    "    ├── tasks/",
    "    └── WORKFLOW.md",
  ];

  return (
    <Layout title={seo.title} description={seo.description}>
      <main className={styles.page}>
        <section className={`${styles.heroStage} ${styles.shell}`}>
          <div className={styles.heroMedia} aria-hidden="true">
            <div className={styles.heroMediaGlow} />
            <div className={styles.heroMediaNoise} />
          </div>

          <article className={styles.heroPanel}>
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

            <div className={styles.heroProof}>
              <div className={styles.terminalPanel}>
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

                <div className={styles.terminalMeta}>
                  {hero.repositoryPanel.lines.map((line) => (
                    <span key={line} className={styles.metaTag}>
                      {line}
                    </span>
                  ))}
                </div>

                <p className={styles.terminalNote}>{hero.trustPanel.text}</p>
              </div>
            </div>
          </article>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={problem.label} title={problem.title} text={problem.text} />

          <div className={styles.problemGrid}>
            <div className={styles.problemColumn}>
              <span className={styles.compareLabel}>{problem.beforeTitle}</span>
              <ul className={styles.problemList}>
                {problem.before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className={styles.problemColumn}>
              <span className={styles.compareLabel}>{problem.afterTitle}</span>
              <ul className={styles.problemList}>
                {problem.after.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead
            label={repositorySurface.label}
            title={repositorySurface.title}
            text={repositorySurface.intro}
          />

          <div className={styles.repositorySurface}>
            <article className={styles.repoTreePanel}>
              <span className={styles.cardKicker}>Repository preview</span>
              <pre className={styles.treePre} aria-label="Repository surface preview">
                <code>
                  {repositoryTree.map((line) => (
                    <span key={line} className={styles.treeLine}>
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
            </article>

            <div className={styles.repositoryLabels}>
              {repositorySurface.items.map((item) => (
                <div key={item.name} className={styles.repositoryRow}>
                  <div className={styles.repositoryTerm}>
                    <code>{item.kicker}</code>
                    <span>{item.name}</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
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

          <div className={styles.modesAccordion}>
            {workflowModes.items.map((mode, index) => (
              <details key={mode.name} className={styles.modeItem} open={index === 0}>
                <summary className={styles.modeSummary}>
                  <div className={styles.modeLead}>
                    <span className={styles.modeBadge}>{mode.badge}</span>
                    <h3>{mode.name}</h3>
                  </div>
                  <p>{mode.text}</p>
                </summary>
                <ul className={styles.modeList}>
                  {mode.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </details>
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
            <ul className={styles.proofPointList}>
              {controlModel.proofPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>

            <div className={styles.controlArtifacts}>
              {controlModel.tabs.map((tab) => (
                <article key={tab.id} className={styles.controlArtifact}>
                  <span className={styles.cardKicker}>{tab.kicker}</span>
                  <h3>{tab.title}</h3>
                  <p>{tab.text}</p>
                  <div className={styles.artifactRow}>
                    {tab.artifact.map((item) => (
                      <span key={item} className={styles.artifactChip}>
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={harness.label} title={harness.title} text={harness.text} />

          <div className={styles.harnessSection}>
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
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={docsRail.label} title={docsRail.title} />

          <div className={styles.docsGrid}>
            {docsRail.groups.map((group) => (
              <div key={group.name} className={styles.docsGroup}>
                <h3>{group.name}</h3>
                <div className={styles.docsLinks}>
                  {group.links.map((link) => (
                    <Link key={link.label} className={styles.inlineLink} to={link.to}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
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
