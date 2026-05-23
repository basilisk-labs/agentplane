import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import { type ReactNode, useState } from "react";
import CommandBlock from "../components/CommandBlock";
import {
  acrUrl,
  examplesUrl,
  githubUrl,
  harnessUrl,
  homepageContent,
  installCommand,
  quickstartUrl,
  tracesUrl,
} from "../data/homepage-content";
import { site } from "../data/site";
import styles from "./_home.module.css";

function trackHomeEvent(eventName: string, payload: Record<string, string> = {}): void {
  if (globalThis.window === undefined) return;
  const gtag = (globalThis.window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", eventName, { event_category: "home", ...payload });
}

function HomeJsonLd(): ReactNode {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      [
        "What is Agentplane?",
        "Agentplane is an agent-agnostic evidence layer for AI-written code changes. It keeps task intent, approved plans, verification evidence, traces, and Agent Change Records inspectable in Git.",
      ],
      [
        "Does Agentplane replace AI agent frameworks?",
        "No. Agentplane works around agent frameworks by coordinating workflows, traces, context, artifacts, and operational state.",
      ],
      [
        "Does Agentplane run locally?",
        "Yes. The default quickstart runs locally, writes repo-local artifacts, and does not require account creation.",
      ],
      [
        "What does Agentplane record?",
        "Agentplane records task intent, approved plans, workflow runs, traces, verification evidence, review packets, and Agent Change Records.",
      ],
      [
        "What are Agentplane traces?",
        "Agentplane traces are structured records of workflow steps, context loads, model calls, tool calls, checks, outputs, and artifacts from an agent run.",
      ],
      [
        "What is local context?",
        "Local context is repo-specific operational knowledge that agents can inspect and reuse without depending on fragile chat history.",
      ],
      [
        "What is an Agent Change Record?",
        "An Agent Change Record is a machine-readable record of AI-assisted engineering work, including task intent, changed files, verification evidence, and review status.",
      ],
    ].map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
  const software = {
    "@context": "https://schema.org",
    "@type": ["SoftwareApplication", "SoftwareSourceCode"],
    name: site.brand,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS, Linux, Windows",
    codeRepository: site.githubUrl,
    softwareHelp: "https://agentplane.org/docs",
    license: "https://github.com/basilisk-labs/agentplane/blob/main/LICENSE",
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(faq)}</script>
      <script type="application/ld+json">{JSON.stringify(software)}</script>
    </Head>
  );
}

function Hero(): ReactNode {
  const { hero } = homepageContent;
  const [copied, setCopied] = useState(false);
  const evidenceRows = [
    ["task", "20260523-AB12CD", "approved scope + owner"],
    ["branch", "task/.../repo-evidence-hero", "isolated worktree"],
    ["checks", "docs:site:check", "required before review"],
    ["record", "acr.json", "machine-readable handoff"],
  ];
  const artifactRows = [
    ["Task README", "intent, plan, findings"],
    ["PR packet", "scope, checks, diffstat"],
    ["Trace export", "steps, tools, checks"],
  ];

  async function copyInstall(): Promise<void> {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    trackHomeEvent("copy_install_click", { location: "hero" });
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>{hero.eyebrow}</p>
        <h1 aria-label={hero.title}>
          <span>Audit trails for</span>
          <span>AI-written code</span>
          <span>changes.</span>
        </h1>
        <p className={styles.lede}>{hero.subtitle}</p>
        <p className={styles.trust}>{hero.trustLine}</p>
        <div className={styles.ctaGroup}>
          <Link
            className={styles.buttonPrimary}
            to={quickstartUrl}
            onClick={() => trackHomeEvent("quickstart_click", { location: "hero_primary" })}
          >
            Try the 90-second quickstart
          </Link>
          <button
            className={styles.buttonSecondary}
            type="button"
            aria-live="polite"
            onClick={() => void copyInstall()}
          >
            {copied ? "Copied" : installCommand}
          </button>
          <a
            className={styles.buttonTertiary}
            href={githubUrl}
            onClick={() => trackHomeEvent("github_click", { location: "hero" })}
          >
            Open GitHub
          </a>
        </div>
      </div>
      <div className={styles.artifactPanel} aria-label="Agentplane Git evidence artifacts">
        <div className={styles.evidenceHeader}>
          <span>repo evidence</span>
          <strong>ready for review</strong>
        </div>
        <div className={styles.evidenceSummary}>
          <span>review ready</span>
          <strong>AI-written change with evidence</strong>
          <p>Task intent, branch state, verification, and review packet stay in Git.</p>
        </div>
        <div className={styles.evidenceLedger}>
          {evidenceRows.map(([label, value, detail]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <em>{detail}</em>
            </div>
          ))}
        </div>
        <div className={styles.artifactGrid}>
          {artifactRows.map(([title, detail]) => (
            <article key={title}>
              <strong>{title}</strong>
              <code>{detail}</code>
            </article>
          ))}
        </div>
        <pre>
          <code>{hero.commands.map((line) => `$ ${line}`).join("\n")}</code>
        </pre>
      </div>
    </section>
  );
}

function ProofStrip(): ReactNode {
  return (
    <section className={styles.proofStrip} aria-label="Agentplane open-source proof">
      {homepageContent.proof.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </section>
  );
}

function Problem(): ReactNode {
  const { problem } = homepageContent;
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <h2>{problem.title}</h2>
        <p>{problem.text}</p>
        <p>{problem.evidence}</p>
      </div>
    </section>
  );
}

function ReviewFlow(): ReactNode {
  const { reviewFlow } = homepageContent;

  return (
    <section className={`${styles.section} ${styles.reviewFlow}`}>
      <div className={styles.sectionIntro}>
        <h2>{reviewFlow.title}</h2>
        <p>{reviewFlow.text}</p>
      </div>
      <div className={styles.reviewColumns}>
        {[reviewFlow.before, reviewFlow.after].map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link
        className={styles.inlineCta}
        to={acrUrl}
        onClick={() => trackHomeEvent("view_acr_guide", { location: "review_flow" })}
      >
        See what an Agent Change Record contains
      </Link>
    </section>
  );
}

function WhatIs(): ReactNode {
  const { whatIs } = homepageContent;
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <h2>{whatIs.title}</h2>
        <p>{whatIs.text}</p>
        <p>{whatIs.use}</p>
      </div>
      <div className={styles.comparisonTable}>
        {whatIs.rows.map(([label, text]) => (
          <div key={label}>
            <strong>{label}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Records(): ReactNode {
  const { records, surfaces } = homepageContent;
  return (
    <section className={styles.section}>
      <div className={styles.twoColumn}>
        <div>
          <h2>{records.title}</h2>
          <p>{records.text}</p>
          <CommandBlock
            label="Run the local loop first"
            command={[
              "npm i -g agentplane",
              "agentplane init",
              "agentplane quickstart",
              "agentplane demo",
              "agentplane acr validate <task-id> --mode local",
            ].join("\n")}
            eventName="copy_run_command"
          />
        </div>
        <pre className={styles.fileTree} aria-label="Agentplane artifact tree">
          <code>{records.tree.join("\n")}</code>
        </pre>
      </div>
      <div className={styles.surfaceGrid}>
        {surfaces.map(([title, text]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <Link
        className={styles.inlineCta}
        to={acrUrl}
        onClick={() => trackHomeEvent("view_acr_guide")}
      >
        Read the Agent Change Record guide
      </Link>
    </section>
  );
}

function HarnessAndTraces(): ReactNode {
  const { harness, timeline } = homepageContent;
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <h2>{harness.title}</h2>
        <p>{harness.text}</p>
        <Link
          className={styles.inlineCta}
          to={harnessUrl}
          onClick={() => trackHomeEvent("view_harness_guide")}
        >
          Read the harness engineering guide
        </Link>
      </div>
      <div className={styles.harnessGrid}>
        {harness.items.map(([title, text]) => (
          <div key={title}>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <div className={styles.timeline}>
        <div className={styles.sectionIntro}>
          <h2>How does Agentplane trace an agent run?</h2>
          <p>
            Traces turn workflow execution into a structured timeline that can be inspected or
            exported.
          </p>
        </div>
        {timeline.map(([name, text]) => (
          <div key={name} className={styles.timelineRow}>
            <code>{name}</code>
            <span>{text}</span>
          </div>
        ))}
      </div>
      <Link
        className={styles.inlineCta}
        to={tracesUrl}
        onClick={() => trackHomeEvent("view_traces_guide")}
      >
        Read the traces guide
      </Link>
    </section>
  );
}

function WorksWith(): ReactNode {
  const { worksWith } = homepageContent;
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <h2>{worksWith.title}</h2>
        <p>{worksWith.text}</p>
      </div>
      <div className={styles.badgeRow}>
        {worksWith.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
    </section>
  );
}

function Examples(): ReactNode {
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <h2>Examples and recipes</h2>
        <p>
          Start from runnable workflows: trace debugging, TDD recipes, local context, and Agent
          Change Records.
        </p>
      </div>
      <div className={styles.exampleGrid}>
        {homepageContent.examples.map(([title, command]) => (
          <Link
            key={title}
            to={examplesUrl}
            onClick={() => trackHomeEvent("view_example", { example: title })}
          >
            <strong>{title}</strong>
            <code>{command}</code>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WhoShouldUse(): ReactNode {
  const { whoShouldUse } = homepageContent;
  return (
    <section className={styles.section}>
      <div className={styles.sectionIntro}>
        <h2>{whoShouldUse.title}</h2>
      </div>
      <ul className={styles.checkList}>
        {whoShouldUse.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default function Home(): ReactNode {
  const { seo, closing } = homepageContent;

  return (
    <Layout title={seo.title} description={seo.description}>
      <HomeJsonLd />
      <main className={styles.page}>
        <Hero />
        <ProofStrip />
        <Problem />
        <ReviewFlow />
        <Records />
        <WorksWith />
        <WhatIs />
        <HarnessAndTraces />
        <Examples />
        <WhoShouldUse />
        <section className={`${styles.section} ${styles.finalCta}`}>
          <h2>{closing.title}</h2>
          <p>{closing.text}</p>
          <div className={styles.ctaGroup}>
            <Link className={styles.buttonPrimary} to={quickstartUrl}>
              Run quickstart
            </Link>
            <a className={styles.buttonSecondary} href={githubUrl}>
              Open GitHub
            </a>
            <Link className={styles.buttonSecondary} to={acrUrl}>
              See an example ACR
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
