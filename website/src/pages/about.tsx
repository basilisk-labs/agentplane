import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { type ReactNode } from "react";
import { site } from "../data/site";
import styles from "./examples.module.css";

export default function AboutPage(): ReactNode {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Agentplane",
    mainEntity: {
      "@type": "SoftwareSourceCode",
      name: site.brand,
      codeRepository: site.githubUrl,
      license: "MIT",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://agentplane.org/" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://agentplane.org/about" },
      ],
    },
  };

  return (
    <Layout
      title="About Agentplane"
      description="Agentplane is an open-source developer tool for reproducible local AI-agent workflows and traces."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>
      <main className={styles.page}>
        <section className={styles.hero}>
          <h1>About Agentplane</h1>
          <p>
            Agentplane is an open-source developer tool for building, running, tracing, and
            operationalizing AI agents with reproducible local workflows.
          </p>
          <p>
            The project focuses on CLI-first workflows, local context, traceable runs, reusable
            recipes, exportable artifacts, and Git-native evidence for AI-assisted engineering.
          </p>
          <p>
            <Link to="/docs/start/quickstart">Quickstart</Link> ·{" "}
            <Link to="/docs">Docs</Link> · <a href={site.githubUrl}>GitHub</a>
          </p>
        </section>
      </main>
    </Layout>
  );
}

