import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

export default function Home(): ReactNode {
  return (
    <Layout
      title="AgentPlane"
      description="Agent-first workflow tooling with deterministic policy gates and audit-ready traces."
    >
      <main className={styles.placeholderPage}>
        <section className={styles.placeholderPanel}>
          <img className={styles.logo} src="/img/logo.svg" alt="AgentPlane" />
          <Heading as="h1" className={styles.title}>
            AgentPlane
          </Heading>
          <p className={styles.subtitle}>Website update in progress.</p>
          <Link className={styles.docsLink} to="/docs">
            Open documentation at /docs
          </Link>
        </section>
      </main>
    </Layout>
  );
}
