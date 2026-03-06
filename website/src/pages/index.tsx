import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

export default function Home(): ReactNode {
  return (
    <Layout
      title="AgentPlane"
      description="Agent-first workflow tooling with deterministic policy gates and audit-ready traces."
    >
      <main className={styles.placeholderPage}>
        <section className={`${styles.heroSheet} grid-paper`}>
          <span className={styles.pixelTag}>WF-01</span>
          <img
            className={styles.logoIcon}
            src="/img/agentplane-favicon.svg"
            alt="AgentPlane mark"
          />
          <img className={styles.wordmark} src="/img/agentplane.svg" alt="agent/plane" />
          <p className={styles.subtitle}>
            Public site is being rebuilt. Documentation and workflow references stay available.
          </p>
          <pre className={styles.artifact} aria-label="Install command">
            <code>npm i -g agentplane</code>
          </pre>
          <Link className={styles.docsLink} to="/docs">
            Open docs at /docs
          </Link>
          <p className={styles.marginNote}>
            NOTE: this placeholder keeps docs live while website sections are aligned with design
            and policy constraints.
          </p>
        </section>
      </main>
    </Layout>
  );
}
