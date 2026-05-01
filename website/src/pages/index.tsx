import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { docsUrl, githubUrl, homepageContent, installCommand } from "../data/homepage-content";
import styles from "./_home.module.css";

type ButtonVariant = "primary" | "secondary" | "copy";

type Action = {
  label: string;
  variant: ButtonVariant;
  to?: string;
  command?: string;
};

function CopyCommand({
  command,
  label = command,
  className,
}: {
  command: string;
  label?: string;
  className?: string;
}): ReactNode {
  const copyCommand = () => {
    void navigator.clipboard.writeText(command);
  };

  return (
    <button
      className={`${styles.copyCommand}${className ? ` ${className}` : ""}`}
      type="button"
      onClick={copyCommand}
      aria-label={`Copy command: ${command}`}
    >
      <code>{label}</code>
    </button>
  );
}

function ActionControl({ action }: { action: Action }): ReactNode {
  if (action.command) {
    return (
      <CopyCommand command={action.command} label={action.label} className={styles.actionCopy} />
    );
  }

  const className =
    action.variant === "primary"
      ? `${styles.action} ${styles.actionPrimary}`
      : `${styles.action} ${styles.actionSecondary}`;

  return (
    <Link className={className} to={action.to ?? "/"}>
      {action.label}
    </Link>
  );
}

function ActionsRow({ actions }: { actions: readonly Action[] }): ReactNode {
  return (
    <div className={styles.actionsRow}>
      {actions.map((action) => (
        <ActionControl key={action.label} action={action} />
      ))}
    </div>
  );
}

function TerminalPreview({
  title,
  lines,
  compact = false,
}: {
  title: string;
  lines: readonly string[];
  compact?: boolean;
}): ReactNode {
  return (
    <div className={`${styles.terminalPreview}${compact ? ` ${styles.terminalCompact}` : ""}`}>
      <div className={styles.terminalTopbar}>
        <span>{title}</span>
        <span>local</span>
      </div>
      <pre className={styles.terminalBody} aria-label={title}>
        <code>
          {lines.map((line, index) => (
            <span key={`${line}-${index}`} className={styles.terminalLine}>
              <span className={styles.commandPrompt}>$</span>
              {line}
            </span>
          ))}
          <span className={styles.terminalCursor} aria-hidden="true" />
        </code>
      </pre>
    </div>
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

function WorkflowCard({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}): ReactNode {
  return (
    <article className={styles.workflowCard}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function FileTree({ lines }: { lines: readonly string[] }): ReactNode {
  return (
    <pre className={styles.fileTree} aria-label="AgentPlane repository artifact tree">
      <code>{lines.join("\n")}</code>
    </pre>
  );
}

function NextStepCard({
  item,
}: {
  item: (typeof homepageContent.nextSteps.items)[number];
}): ReactNode {
  const featured = "featured" in item && item.featured;

  return (
    <article className={`${styles.nextStepCard}${featured ? ` ${styles.nextStepFeatured}` : ""}`}>
      <div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
      <Link to={item.to}>{item.action}</Link>
    </article>
  );
}

export default function Home(): ReactNode {
  const { seo, hero, demo, workflow, artifacts, nextSteps, closing } = homepageContent;

  return (
    <Layout title={seo.title} description={seo.description}>
      <main className={styles.page}>
        <section className={styles.heroStage}>
          <div className={styles.shell}>
            <div className={styles.heroGrid}>
              <article className={styles.heroCopy}>
                <span className={styles.heroEyebrow}>{hero.eyebrow}</span>
                <h1>{hero.title}</h1>
                <p className={styles.heroSubtitle}>{hero.subtitle}</p>
                <p className={styles.flowLine}>{hero.flow}</p>
                <ActionsRow
                  actions={[
                    { label: "View on GitHub", to: githubUrl, variant: "primary" },
                    { label: "Read the docs", to: docsUrl, variant: "secondary" },
                    { label: installCommand, command: installCommand, variant: "copy" },
                  ]}
                />
                <ul className={styles.assuranceList}>
                  {hero.assurances.map((assurance) => (
                    <li key={assurance}>{assurance}</li>
                  ))}
                </ul>
              </article>

              <TerminalPreview title={hero.terminal.title} lines={hero.terminal.lines} compact />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.demoSection}`}>
          <div className={styles.shell}>
            <SectionLead label="Demo / proof" title={demo.title} text={demo.text} />
            <div className={styles.demoGrid}>
              <TerminalPreview title={demo.terminal.title} lines={demo.terminal.lines} />
              <div className={styles.demoAside}>
                <span className={styles.sectionLabel}>Try it locally</span>
                <pre aria-label="AgentPlane local try commands">
                  <code>{demo.tryCommands.join("\n")}</code>
                </pre>
                <Link className={`${styles.action} ${styles.actionPrimary}`} to={githubUrl}>
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Core workflow" title={workflow.title} text={workflow.text} />
          <div className={styles.workflowGrid}>
            {workflow.items.map((item, index) => (
              <WorkflowCard key={item.title} title={item.title} text={item.text} index={index} />
            ))}
          </div>
          <p className={styles.workflowNote}>{workflow.note}</p>
        </section>

        <section className={`${styles.section} ${styles.artifactSection}`}>
          <div className={styles.shell}>
            <div className={styles.artifactGrid}>
              <FileTree lines={artifacts.tree} />
              <div className={styles.artifactCopy}>
                <SectionLead
                  label="Repo-local artifacts"
                  title={artifacts.title}
                  text={artifacts.text}
                />
                <ul className={styles.artifactBullets}>
                  {artifacts.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Link className={`${styles.action} ${styles.actionSecondary}`} to={docsUrl}>
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Docs paths" title={nextSteps.title} />
          <div className={styles.nextStepsGrid}>
            {nextSteps.items.map((item) => (
              <NextStepCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.shell}>
            <h2>{closing.title}</h2>
            <CopyCommand command={installCommand} />
            <ActionsRow
              actions={[
                { label: "View on GitHub", to: githubUrl, variant: "primary" },
                { label: "Read the docs", to: docsUrl, variant: "secondary" },
              ]}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
