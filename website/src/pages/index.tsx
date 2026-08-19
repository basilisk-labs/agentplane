import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import IconArrow from "@theme/Icon/Arrow";
import IconCopy from "@theme/Icon/Copy";
import IconEdit from "@theme/Icon/Edit";
import IconSuccess from "@theme/Icon/Success";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  acrUrl,
  examplesUrl,
  homepageContent,
  installCommand,
  quickstartUrl,
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
        "Agentplane is the Git-native control plane for coding agents. It bounds delegated authority and keeps approvals, observed proof, recovery, and closure inspectable in Git.",
      ],
      [
        "Does Agentplane replace coding agents?",
        "No. Coding agents remain the workers. Agentplane controls their delegated lifecycle through bounded authority, independent observation, verification, recovery, and closure.",
      ],
      [
        "Does Agentplane run locally?",
        "Yes. The quickstart runs locally, writes repository-owned artifacts, and does not require an account.",
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

function CopyInstallButton({ location }: { location: string }): ReactNode {
  const [copied, setCopied] = useState(false);

  async function copyInstall(): Promise<void> {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    trackHomeEvent("copy_install_click", { location });
    globalThis.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      className={`${styles.installButton} ${copied ? styles.installButtonCopied : ""}`}
      type="button"
      aria-live="polite"
      onClick={() => void copyInstall()}
    >
      <code>{copied ? "Copied to clipboard" : installCommand}</code>
      <IconCopy className={styles.copyIcon} />
    </button>
  );
}

function HeroReceipt(): ReactNode {
  const { receipt } = homepageContent;

  return (
    <article className={styles.heroReceipt} aria-label="Example Agentplane execution receipt">
      <header className={styles.receiptHeader}>
        <div>
          <span className={styles.receiptType}>Execution receipt</span>
          <p>{receipt.id}</p>
        </div>
        <span className={styles.receiptAuthority}>Authority + proof</span>
      </header>

      <div className={styles.receiptTitle}>
        <p>WorkOrder</p>
        <h2>{receipt.objective}</h2>
      </div>

      <dl className={styles.receiptRows}>
        {receipt.rows.map(([label, value, detail], index) => (
          <div key={label} className={styles.receiptRow}>
            <dt>{label}</dt>
            <dd>{value}</dd>
            <dd className={styles.receiptDetail}>
              {index >= 2 ? <IconSuccess aria-hidden="true" /> : null}
              {detail}
            </dd>
          </div>
        ))}
      </dl>

      <footer className={styles.receiptFooter}>
        <span className={styles.verifiedMark}>
          <IconSuccess aria-hidden="true" />
        </span>
        <div>
          <strong>Durable record in Git</strong>
          <p>Task state, ACR, and evidence manifest stay reviewable with the code.</p>
        </div>
        <code>{receipt.commit}</code>
      </footer>
    </article>
  );
}

function Hero(): ReactNode {
  const { hero } = homepageContent;

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{hero.eyebrow}</p>
          <h1 aria-label={hero.title}>
            {hero.titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className={styles.lede}>{hero.subtitle}</p>
          <div className={styles.ctaGroup}>
            <Link
              className={styles.buttonPrimary}
              to={quickstartUrl}
              onClick={() => trackHomeEvent("quickstart_click", { location: "hero_primary" })}
            >
              Start in your repository
            </Link>
            <CopyInstallButton location="hero" />
          </div>
          <p className={styles.trust}>{hero.trustLine}</p>
        </div>
        <HeroReceipt />
      </div>
    </section>
  );
}

function AuthorityGap(): ReactNode {
  const { authorityGap } = homepageContent;

  return (
    <section className={`${styles.section} ${styles.reveal}`}>
      <div className={styles.splitSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>{authorityGap.eyebrow}</p>
          <h2>{authorityGap.title}</h2>
          <p>{authorityGap.text}</p>
        </div>
        <div className={styles.diffPanel} aria-label="Git diff without authority evidence">
          <header>
            <code>git diff -- src/parser/token.ts</code>
          </header>
          <pre>
            <code>
              <span className={styles.diffMeta}>@@ -142,7 +142,7 @@ parse_token(...)</span>
              {"\n"}
              <span className={styles.diffRemove}>
                - if (c == EOF &amp;&amp; !in_string) &#123;
              </span>
              {"\n"}
              <span className={styles.diffAdd}>
                + if (c == EOF &amp;&amp; !in_string &amp;&amp; !escaped) &#123;
              </span>
              {"\n"}
              {"    return ERROR_UNTERMINATED;\n  }"}
            </code>
          </pre>
          <footer>
            <strong>Missing proof</strong>
            <p>No record of scope, allowed effects, approver, or independent verification.</p>
          </footer>
        </div>
      </div>
    </section>
  );
}

const toneClasses = {
  blue: styles.toneBlue,
  violet: styles.toneViolet,
  green: styles.toneGreen,
  coral: styles.toneCoral,
} as const;

function StepIcon({ icon }: { icon: string }): ReactNode {
  if (icon === "authorize") return <IconEdit />;
  if (icon === "verify") return <IconSuccess />;
  if (icon === "record") return <IconCopy />;
  return <IconArrow />;
}

function ControlLoop(): ReactNode {
  const { controlLoop } = homepageContent;
  const [activeId, setActiveId] = useState<(typeof controlLoop.steps)[number]["id"]>(
    controlLoop.steps[0].id,
  );
  const activeStep = useMemo(
    () => controlLoop.steps.find((step) => step.id === activeId) ?? controlLoop.steps[0],
    [activeId, controlLoop.steps],
  );

  return (
    <section className={`${styles.section} ${styles.loopSection} ${styles.reveal}`}>
      <div className={styles.sectionIntroWide}>
        <p className={styles.kicker}>{controlLoop.eyebrow}</p>
        <h2>{controlLoop.title}</h2>
        <p>{controlLoop.text}</p>
      </div>

      <div className={styles.loopGrid}>
        {controlLoop.steps.map((step, index) => {
          const active = step.id === activeId;
          return (
            <div className={styles.loopCell} key={step.id}>
              <button
                className={`${styles.loopStep} ${toneClasses[step.tone]} ${active ? styles.loopStepActive : ""}`}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveId(step.id)}
              >
                <span className={styles.stepNumber}>0{index + 1}</span>
                <span className={styles.stepIcon}>
                  <StepIcon icon={step.icon} />
                </span>
                <strong>{step.title}</strong>
                <span className={styles.stepText}>{step.text}</span>
              </button>
              {index < controlLoop.steps.length - 1 ? (
                <IconArrow className={styles.loopArrow} aria-hidden="true" />
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={`${styles.loopEvidence} ${toneClasses[activeStep.tone]}`} aria-live="polite">
        <span>{activeStep.title}</span>
        <strong>{activeStep.evidence}</strong>
        <code>{activeStep.artifact}</code>
      </div>
    </section>
  );
}

function DurableProof(): ReactNode {
  const { durableProof } = homepageContent;

  return (
    <section className={`${styles.section} ${styles.proofSection} ${styles.reveal}`}>
      <div className={styles.sectionIntroWide}>
        <p className={styles.kicker}>{durableProof.eyebrow}</p>
        <h2>{durableProof.title}</h2>
        <p>{durableProof.text}</p>
      </div>

      <div className={styles.proofLedger}>
        <header>
          <div>
            <code>{durableProof.commit}</code>
            <strong>{durableProof.summary}</strong>
          </div>
          <span className={styles.proofStatus}>
            <IconSuccess aria-hidden="true" /> verified
          </span>
        </header>
        <div className={styles.proofBody}>
          <ul className={styles.fileList} aria-label="Repository evidence files">
            {durableProof.files.map((file) => (
              <li key={file}>
                <code>{file}</code>
              </li>
            ))}
          </ul>
          <dl className={styles.proofFacts}>
            {durableProof.facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <footer>{durableProof.footer}</footer>
      </div>
    </section>
  );
}

function WorksWith(): ReactNode {
  const { worksWith } = homepageContent;
  return (
    <section className={`${styles.section} ${styles.worksSection} ${styles.reveal}`}>
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>The worker stays replaceable</p>
        <h2>{worksWith.title}</h2>
        <p>{worksWith.text}</p>
      </div>
      <div className={styles.toolList} aria-label="Agentplane compatibility">
        {worksWith.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <Link className={styles.textLink} to={examplesUrl}>
        Explore runnable examples
      </Link>
    </section>
  );
}

function FinalCta(): ReactNode {
  const { closing } = homepageContent;
  return (
    <section className={`${styles.section} ${styles.finalCta} ${styles.reveal}`}>
      <div>
        <p className={styles.kicker}>Start locally</p>
        <h2>{closing.title}</h2>
        <p>{closing.text}</p>
      </div>
      <div className={styles.ctaGroup}>
        <Link className={styles.buttonPrimary} to={quickstartUrl}>
          Run quickstart
        </Link>
        <CopyInstallButton location="closing" />
        <Link className={styles.textLink} to={acrUrl}>
          Inspect an Agent Change Record
        </Link>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { seo } = homepageContent;

  useEffect(() => {
    document.documentElement.classList.add("agentplane-home");
    document.body.classList.add("agentplane-home");

    return () => {
      document.documentElement.classList.remove("agentplane-home");
      document.body.classList.remove("agentplane-home");
    };
  }, []);

  return (
    <Layout title={seo.title} description={seo.description}>
      <HomeJsonLd />
      <main className={styles.page}>
        <Hero />
        <AuthorityGap />
        <ControlLoop />
        <DurableProof />
        <WorksWith />
        <FinalCta />
      </main>
    </Layout>
  );
}
