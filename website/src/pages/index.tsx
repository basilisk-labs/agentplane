import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import { type ReactNode } from "react";
import CommandBlock from "../components/CommandBlock";
import GitHubStarsButton from "../components/GitHubStarsButton";
import {
  acrUrl,
  contextUrl,
  docsUrl,
  examplesUrl,
  githubUrl,
  harnessUrl,
  homepageContent,
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
        "Agentplane is a CLI-first operational workflow and observability layer for AI agents. It helps developers run local workflows, record traces, manage context, apply recipes, and keep agent work inspectable.",
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
        "Agentplane records workflows, runs, traces, recipes, exports, verification evidence, and Agent Change Records.",
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
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.kicker}>{hero.eyebrow}</p>
        <h1>{hero.title}</h1>
        <p className={styles.lede}>{hero.subtitle}</p>
        <p className={styles.trust}>{hero.trustLine}</p>
        <div className={styles.ctaGroup}>
          <Link
            className={styles.buttonPrimary}
            to={quickstartUrl}
            onClick={() => trackHomeEvent("quickstart_cta_click", { location: "hero" })}
          >
            Run quickstart
          </Link>
          <a
            className={styles.buttonSecondary}
            href={githubUrl}
            onClick={() => trackHomeEvent("github_click", { location: "hero" })}
          >
            View GitHub
          </a>
          <Link className={styles.buttonTertiary} to={docsUrl}>
            Read docs
          </Link>
        </div>
      </div>
      <div className={styles.terminalPanel} aria-label="Agentplane terminal quickstart">
        <div className={styles.terminalTop}>
          <span>local workflow</span>
          <span>trace ready</span>
        </div>
        <pre>
          <code>{hero.commands.map((line) => `$ ${line}`).join("\n")}</code>
        </pre>
        <div className={styles.output}>
          {hero.output.map((line) => (
            <span key={line}>ok {line}</span>
          ))}
        </div>
      </div>
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
            label="Run locally"
            command={[
              "npm i -g agentplane",
              "agentplane init",
              "agentplane run ./agentplane.yaml",
              "agentplane trace open",
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
        to={contextUrl}
        onClick={() => trackHomeEvent("view_context_guide")}
      >
        Read the local context guide
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

export default function Home(): ReactNode {
  const { seo, closing } = homepageContent;

  return (
    <Layout title={seo.title} description={seo.description}>
      <HomeJsonLd />
      <main className={styles.page}>
        <Hero />
        <WhatIs />
        <Records />
        <HarnessAndTraces />
        <Examples />
        <section className={`${styles.section} ${styles.finalCta}`}>
          <h2>{closing.title}</h2>
          <p>{closing.text}</p>
          <div className={styles.ctaGroup}>
            <Link className={styles.buttonPrimary} to={quickstartUrl}>
              Run quickstart
            </Link>
            <GitHubStarsButton />
            <Link className={styles.buttonSecondary} to={acrUrl}>
              See an example ACR
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
