import type { CSSProperties, ReactNode } from "react";
import { useCallback, useState } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { githubUrl, homepageContent, installCommand } from "../data/homepage-content";
import styles from "./_home.module.css";

type Action = {
  label: string;
  variant: "primary" | "secondary";
  to?: string;
  command?: string;
};

function ActionControl({ action }: { action: Action }): ReactNode {
  const [copied, setCopied] = useState(false);
  const className =
    action.variant === "primary"
      ? `${styles.action} ${styles.actionPrimary}`
      : `${styles.action} ${styles.actionSecondary}`;

  const copyCommand = useCallback(() => {
    const command = action.command;
    if (!command) return;
    const writeCommand = async (): Promise<void> => {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      globalThis.setTimeout(() => setCopied(false), 1800);
    };
    void writeCommand();
  }, [action.command]);

  if (action.command) {
    return (
      <button className={className} type="button" onClick={copyCommand}>
        {copied ? "Copied" : action.label}
      </button>
    );
  }

  return (
    <Link className={className} to={action.to ?? "/"}>
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

function CommandBlock({ lines, label }: { lines: readonly string[]; label: string }): ReactNode {
  return (
    <pre className={styles.commandPre} aria-label={label}>
      <code>
        {lines.map((line) => (
          <span key={line} className={styles.commandLine}>
            <span className={styles.commandPrompt}>$</span>
            {line}
          </span>
        ))}
      </code>
    </pre>
  );
}

function TerminalRecording({
  title,
  lines,
}: {
  title: string;
  lines: readonly string[];
}): ReactNode {
  return (
    <div className={styles.terminalRecording}>
      <div className={styles.terminalTopbar}>
        <span>{title}</span>
        <span className={styles.terminalStatus}>recording</span>
      </div>
      <pre className={styles.terminalBody} aria-label="AgentPlane terminal recording">
        <code>
          {lines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              className={styles.terminalLine}
              style={{ "--line-delay": `${index * 90}ms` } as CSSProperties}
            >
              <span className={styles.commandPrompt}>$</span>
              {line}
            </span>
          ))}
          <span className={styles.terminalCursor} />
        </code>
      </pre>
    </div>
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

export default function Home(): ReactNode {
  const {
    seo,
    hero,
    problem,
    beforeAfter,
    demo,
    repository,
    howItWorks,
    audience,
    stack,
    workflowModes,
    gitNative,
    quickstart,
    recipes,
    proof,
    faq,
    closing,
  } = homepageContent;

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
                <ActionsRow actions={hero.actions} />
                <div className={styles.installLine}>
                  <code>{installCommand}</code>
                  <iframe
                    className={styles.starButton}
                    title="GitHub star button"
                    src="https://ghbtns.com/github-btn.html?user=basilisk-labs&repo=agentplane&type=star&count=true"
                    width="110"
                    height="20"
                  />
                </div>
                <ul className={styles.assuranceList}>
                  {hero.assurances.map((assurance) => (
                    <li key={assurance}>{assurance}</li>
                  ))}
                </ul>
              </article>

              <TerminalRecording title={hero.terminal.title} lines={hero.terminal.lines} />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={problem.label} title={problem.title} text={problem.close} />
          <ul className={styles.questionList}>
            {problem.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={beforeAfter.label} title={beforeAfter.title} />
          <div className={styles.compareGrid}>
            <div className={styles.compareColumn}>
              <h3>{beforeAfter.withoutTitle}</h3>
              <ul>
                {beforeAfter.without.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.compareColumn}>
              <h3>{beforeAfter.withTitle}</h3>
              <ul>
                {beforeAfter.with.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="demo" className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={demo.label} title={demo.title} text={demo.scenario} />
          <div className={styles.demoStack}>
            <TerminalRecording title="Try the same flow locally" lines={demo.commands} />
            <ActionsRow actions={demo.actions} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={repository.label} title={repository.title} text={repository.text} />
          <div className={styles.repoSurface}>
            {repository.tree.map((item) => (
              <code key={item}>{item}</code>
            ))}
          </div>
        </section>

        <section id="how-it-works" className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={howItWorks.label} title={howItWorks.title} />
          <ol className={styles.stepList}>
            {howItWorks.steps.map((step, index) => (
              <li key={step.name} className={styles.stepItem}>
                <span className={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.name}</h3>
                  <code>{step.command}</code>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={audience.label} title={audience.title} />
          <div className={styles.audienceGrid}>
            <ul className={styles.cleanList}>
              {audience.for.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ul className={`${styles.cleanList} ${styles.notForList}`}>
              {audience.notFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={stack.label} title={stack.title} text={stack.text} />
          <div className={styles.stackGrid}>
            {stack.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={workflowModes.label} title={workflowModes.title} />
          <div className={styles.modeGrid}>
            {workflowModes.items.map((mode) => (
              <article key={mode.name} className={styles.modeBlock}>
                <h3>{mode.name}</h3>
                <p>{mode.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={gitNative.label} title={gitNative.title} />
          <div className={styles.gitNativeGrid}>
            <ul className={styles.cleanList}>
              {gitNative.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className={styles.diagram} aria-label="Git-native workflow diagram">
              {gitNative.diagram.map((item, index) => (
                <div key={item} className={styles.diagramNode}>
                  <span>{item}</span>
                  {index < gitNative.diagram.length - 1 ? <b>-&gt;</b> : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={quickstart.label} title={quickstart.title} />
          <div className={styles.quickstartGrid}>
            <CommandBlock lines={quickstart.commands} label="AgentPlane quickstart commands" />
            <div className={styles.requirements}>
              <h3>Requirements</h3>
              <ul>
                {quickstart.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ActionsRow actions={quickstart.actions} />
            </div>
          </div>
        </section>

        <section id="recipes" className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={recipes.label} title={recipes.title} />
          <div className={styles.recipeGrid}>
            {recipes.items.map((recipe) => (
              <Link key={recipe.name} className={styles.recipeLink} to={recipe.to}>
                {recipe.name}
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={proof.label} title={proof.title} />
          <div className={styles.proofGrid}>
            {proof.points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={faq.label} title={faq.title} />
          <div className={styles.faqList}>
            {faq.items.map((item) => (
              <details key={item.question} className={styles.faqItem}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.shell}>
            <span className={styles.sectionLabel}>{closing.label}</span>
            <h2>{closing.title}</h2>
            <code>{closing.command}</code>
            <ActionsRow actions={closing.actions} />
          </div>
        </section>

        <a className={styles.repoMicroLink} href={githubUrl}>
          View AgentPlane on GitHub
        </a>
      </main>
    </Layout>
  );
}
