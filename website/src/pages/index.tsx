import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { type ReactNode } from "react";
import {
  docsUrl,
  githubUrl,
  homepageContent,
  installCommand,
  quickstartUrl,
} from "../data/homepage-content";
import styles from "./_home.module.css";

type FeatureSection = (typeof homepageContent.menuSections)[number];

function trackHomeEvent(eventName: string): void {
  if (globalThis.window === undefined) return;
  const gtag = (globalThis.window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", eventName, { event_category: "home" });
}

function Lattice(): ReactNode {
  return (
    <div className={styles.latticeWrap} aria-hidden="true">
      <svg viewBox="0 0 240 160" fill="none" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="agentplane-lattice" width="18" height="15.588" patternUnits="userSpaceOnUse">
            <polygon
              points="4.5,0 13.5,0 18,7.794 13.5,15.588 4.5,15.588 0,7.794 4.5,0"
              className={styles.latticeHex}
            />
          </pattern>
        </defs>
        <rect x="-36" y="-31" width="312" height="222" fill="url(#agentplane-lattice)" />
        <path className={styles.latticePath} d="M45 80 C74 36 116 36 146 80 S201 124 225 80" />
        <circle className={styles.latticeSignal} cx="118" cy="78" r="2.4" />
        <circle className={styles.latticeTrace} cx="171" cy="78" r="2" />
        <circle className={styles.latticeMemory} cx="81" cy="47" r="2" />
      </svg>
      <span className={`${styles.xrayMark} ${styles.xrayOne}`}>[ ROUTE_Q ]</span>
      <span className={`${styles.xrayMark} ${styles.xrayTwo}`}>[ ACR_SEQ ]</span>
      <span className={`${styles.xrayMark} ${styles.xrayThree}`}>[ CTX_BOUNDARY ]</span>
    </div>
  );
}

function HomeNav({ sections }: { sections: readonly FeatureSection[] }): ReactNode {
  return (
    <header className={styles.localNav}>
      <Link className={styles.localLogo} to="/">
        AgentPlane <sup>AP</sup>
      </Link>
      <nav className={styles.localMenu} aria-label="Homepage sections">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Hero(): ReactNode {
  const { hero, problem } = homepageContent;

  return (
    <section className={`${styles.bentoItem} ${styles.colSpan12} ${styles.heroItem}`}>
      <Lattice />
      <article className={`${styles.liquidGlass} ${styles.heroPanel}`}>
        <div className={styles.heroKicker}>
          <span>{hero.eyebrow}</span>
          <span>INIT::WORKFLOW</span>
        </div>
        <h1>{hero.title}</h1>
        <div>
          <p>{hero.subtitle}</p>
          <p className={styles.featureProof}>{hero.proofLine}</p>
        </div>
        <div className={styles.ctaGroup}>
          <Link
            className={styles.buttonPrimary}
            to={quickstartUrl}
            onClick={() => trackHomeEvent("quickstart_clicked_from_home_hero")}
          >
            Run quickstart
          </Link>
          <a
            className={styles.buttonSecondary}
            href={githubUrl}
            onClick={() => trackHomeEvent("github_clicked_from_home_hero")}
          >
            GitHub
          </a>
        </div>
      </article>
      <article className={`${styles.liquidGlass} ${styles.problemPanel}`}>
        <div className={styles.editorialHeader}>
          <h2>{problem.title}</h2>
          <div className={styles.editorialMeta}>
            <span className={styles.circleNum}>1</span>
            <span>Context</span>
          </div>
        </div>
        <p>{problem.text}</p>
        <ul className={styles.problemList}>
          {problem.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className={styles.projectFooter}>
          <span className={styles.hardwareLabel}>status</span>
          <span className={styles.hwLamp} />
          <span className={styles.monoSm}>DRIFT_VISIBLE</span>
        </div>
      </article>
    </section>
  );
}

function SectionDivider(): ReactNode {
  return (
    <div className={`${styles.bentoItem} ${styles.sectionDivider} ${styles.colSpan12}`}>
      <div className={styles.editorialHeader}>
        <h2>Product surfaces</h2>
        <div className={styles.editorialMeta}>
          <span className={styles.circleNum}>2</span>
          <span>Navigation</span>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ section, index }: { section: FeatureSection; index: number }): ReactNode {
  const isWide = index === 0 || index === 2 || index === 5;
  const spanClass = isWide ? styles.colSpan8 : styles.colSpan4;

  return (
    <article
      id={section.id}
      className={`${styles.bentoItem} ${styles.blueprint} ${spanClass}`}
      aria-labelledby={`${section.id}-title`}
    >
      <div className={styles.editorialHeader}>
        <div className={styles.editorialMeta}>
          <span className={styles.circleNum}>{index + 1}</span>
          <span>{section.code}</span>
        </div>
        <span className={styles.monoSm}>{section.status}</span>
      </div>
      <h3 id={`${section.id}-title`}>{section.title}</h3>
      <p>{section.text}</p>
      <p className={styles.featureProof}>{section.proof}</p>
      <div className={styles.projectFooter}>
        <Link
          className={styles.buttonSecondary}
          to={section.to}
          onClick={() => trackHomeEvent(`${section.id}_docs_clicked_from_home`)}
        >
          {section.linkLabel}
        </Link>
      </div>
    </article>
  );
}

function InstallPanel(): ReactNode {
  const { quickstart, artifacts, worksWith } = homepageContent;

  return (
    <>
      <section className={`${styles.bentoItem} ${styles.colSpan6}`}>
        <div className={styles.editorialHeader}>
          <h3>{quickstart.title}</h3>
          <span className={styles.monoSm}>local</span>
        </div>
        <p>{quickstart.text}</p>
        <pre className={styles.codeBlock} aria-label="AgentPlane install command">
          <code>{[installCommand, "agentplane init", "agentplane quickstart"].join("\n")}</code>
        </pre>
        <Link className={styles.buttonPrimary} to={quickstartUrl}>
          Open setup docs
        </Link>
      </section>
      <section className={`${styles.bentoItem} ${styles.colSpan6} ${styles.contactPanel}`}>
        <div className={styles.editorialHeader}>
          <h3>{artifacts.title}</h3>
          <span className={styles.monoSm}>git evidence</span>
        </div>
        <p>{artifacts.text}</p>
        <div className={styles.artifactList}>
          {artifacts.items.map((artifact) => (
            <div key={artifact.path}>
              <strong>{artifact.path}</strong>
              <span>{artifact.text}</span>
            </div>
          ))}
        </div>
      </section>
      <section className={`${styles.bentoItem} ${styles.colSpan12}`}>
        <div className={styles.editorialHeader}>
          <h3>{worksWith.title}</h3>
          <span className={styles.monoSm}>adapter neutral</span>
        </div>
        <div className={styles.logoStrip}>
          {worksWith.items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </>
  );
}

export default function Home(): ReactNode {
  const { seo, menuSections, closing } = homepageContent;

  return (
    <Layout title={seo.title} description={seo.description}>
      <main className={styles.page}>
        <div className={styles.bentoWrapper}>
          <HomeNav sections={menuSections} />
          <div className={styles.bentoGrid}>
            <Hero />
            <SectionDivider />
            {menuSections.map((section, index) => (
              <FeatureCard key={section.id} section={section} index={index} />
            ))}
            <InstallPanel />
            <section className={`${styles.bentoItem} ${styles.colSpan12} ${styles.contactPanel}`}>
              <div className={styles.editorialHeader}>
                <h3>{closing.title}</h3>
                <span className={styles.monoSm}>open source</span>
              </div>
              <p>{closing.text}</p>
              <div className={styles.ctaGroup}>
                <Link className={styles.buttonPrimary} to={docsUrl}>
                  Read docs
                </Link>
                <a className={styles.buttonSecondary} href={githubUrl}>
                  Star on GitHub
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
}
