import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { type ReactNode } from "react";
import styles from "./examples.module.css";

const examples = [
  {
    title: "Debug an agent run with traces",
    outcome: "Open a trace, inspect spans, and identify the failing workflow step.",
    time: "7 min",
    command: "agentplane trace open <run-id>",
    to: "/docs/examples/debug-agent-run-with-traces",
  },
  {
    title: "Run a TDD workflow recipe",
    outcome: "Structure an agent run around failing tests, implementation, and verification.",
    time: "10 min",
    command: "agentplane recipes install tdd",
    to: "/docs/recipes/tdd",
  },
  {
    title: "Export an OpenTelemetry-compatible trace",
    outcome: "Export run evidence as JSON for another tool or review artifact.",
    time: "5 min",
    command: "agentplane trace export <run-id> --format otel-json",
    to: "/docs/examples/export-traces",
  },
  {
    title: "Create an Agent Change Record",
    outcome: "Generate a machine-readable evidence record for AI-assisted engineering work.",
    time: "5 min",
    command: "agentplane acr generate <task-id> --write",
    to: "/docs/reference/acr",
  },
  {
    title: "Use local context for repo conventions",
    outcome: "Keep repository rules inspectable instead of relying on fragile chat history.",
    time: "8 min",
    command: "agentplane context search \"repo conventions\"",
    to: "/docs/user/local-context",
  },
];

function trackExample(title: string): void {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", "view_example", { event_category: "examples", example: title });
}

export default function ExamplesPage(): ReactNode {
  return (
    <Layout
      title="Agentplane examples"
      description="Runnable Agentplane examples for traces, recipes, local context, exports, and Agent Change Records."
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>Examples that produce artifacts.</h1>
          <p>
            Each example starts with commands and ends with something inspectable: a trace, recipe,
            context artifact, export, or Agent Change Record.
          </p>
        </section>
        <section className={styles.grid}>
          {examples.map((example) => (
            <Link
              className={styles.card}
              key={example.title}
              to={example.to}
              onClick={() => trackExample(example.title)}
            >
              <span className={styles.meta}>{example.time}</span>
              <h2>{example.title}</h2>
              <p>{example.outcome}</p>
              <code>{example.command}</code>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}

