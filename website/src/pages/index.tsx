import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import IconArrow from "@theme/Icon/Arrow";
import IconCopy from "@theme/Icon/Copy";
import IconEdit from "@theme/Icon/Edit";
import IconSuccess from "@theme/Icon/Success";
import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  acrUrl,
  examplesUrl,
  homepageContent,
  installCommand,
  quickstartUrl,
  siteRoutes,
} from "../data/homepage-content";
import { site } from "../data/site";
import styles from "./_home.module.css";

const tourDuration = 4500;
const artifacts = [
  {
    file: "AGENTS.md",
    category: "01 / AUTHORITY",
    caption: "AGENTS.md sets the guardrails; the CLI gives the agent one bounded action at a time.",
    notes: ["Rules live here.", "CLI returns the next step.", "Less to hold in context."],
    preview: [
      "# PURPOSE",
      "`AGENTS.md` is the policy gateway for agents in this repository.",
      "It provides strict routing, hard constraints, and command contracts.",
      "",
      "## COMMANDS",
      "```bash",
      "ap task active",
      "ap task advance <task-id> --agent-json",
      "```",
      "",
      "When `action.kind=agent_episode`, perform only the supplied semantic objective.",
    ],
  },
  {
    file: ".agentplane/tasks/<task-id>/README.md",
    category: "02 / TASK RECORD",
    caption: "A task has an owner, a plan, and a reviewable path to done.",
    notes: ["A plan you can inspect.", "One task, one record.", "No hidden handoff."],
    preview: [
      "---",
      'id: "202609231539-BY7E3D"',
      'title: "Redesign the Agentplane homepage with an interactive artifact explorer"',
      'status: "DONE"',
      'owner: "CODER"',
      "verify:",
      '  - "bun run docs:site:typecheck"',
      "---",
      "",
      "## Scope",
      "Update the homepage artifact explorer.",
    ],
  },
  {
    file: "observations.jsonl",
    category: "03 / OBSERVED",
    caption: "A task observation records a decision or risk as one JSONL entry.",
    notes: ["One entry per line.", "Keep decisions visible.", "Readable later."],
    preview: [
      '{"schema_version":"0.1","id":"obs-example-1","task_id":"202609231539-BY7E3D","created_at":"2026-09-23T15:40:00.000Z","author":"CODER","phase":"implementation","kind":"decision","severity":"low","summary":"Keep the artifact explorer keyboard-accessible.","status":"accepted"}',
    ],
  },
  {
    file: "acr.json",
    category: "04 / CHANGE RECORD",
    caption: "An ACR links the task, changes, verification, and result.",
    notes: ["Authority, in writing.", "Changes you can inspect.", "Record the outcome."],
    preview: [
      "{",
      '  "acr_version": "0.1.0",',
      '  "record_type": "agent_change_record",',
      '  "record_id": "acr_202609231539-BY7E3D",',
      '  "task": {',
      '    "task_id": "202609231539-BY7E3D",',
      '    "title": "Redesign the Agentplane homepage"',
      "  },",
      '  "changes": {',
      '    "summary": "Updated the homepage artifact explorer",',
      '    "diff_stats": { "files_changed": 2 }',
      "  },",
      '  "verification": {',
      '    "status": "passed"',
      "  },",
      '  "result": {',
      '    "status": "verified"',
      "  }",
      "}",
    ],
  },
  {
    file: "verification/<record-id>.json",
    category: "05 / EVIDENCE",
    caption: "A verification record ties the checked commit to the result.",
    notes: ["Check the commit.", "See who verified.", "Keep the record."],
    preview: [
      "{",
      '  "schema_version": 2,',
      '  "kind": "task_verification_record",',
      '  "task_id": "202609231539-BY7E3D",',
      '  "implementation_sha": "4c4b659b08416bc32b8b4db69314e2b825b15a34",',
      '  "result": "ok",',
      '  "verifier": "SUPERVISOR"',
      "}",
    ],
  },
  {
    file: "package.json",
    category: "06 / PROJECT",
    caption: "Agentplane works alongside the checks your project already runs.",
    notes: ["Your tools stay yours.", "Run the real checks.", "Keep the workflow local."],
    preview: [
      "{",
      '  "name": "web-app",',
      '  "private": true,',
      '  "scripts": {',
      '    "lint": "eslint .",',
      '    "typecheck": "tsc --noEmit",',
      '    "test": "vitest run"',
      "  }",
      "}",
    ],
  },
  {
    file: "README.md",
    category: "07 / REPOSITORY",
    caption: "People and agents share the same repository context.",
    notes: ["Built for your team.", "A familiar starting point.", "The record stays in Git."],
    preview: [
      "# web-app",
      "",
      "A small application with a reviewable agent workflow.",
      "",
      "## Work on a task",
      "",
      "1. Read AGENTS.md and the task's approved WorkOrder.",
      "2. Make the change and run the project checks.",
      "3. Review the task record and evidence in Git.",
    ],
  },
] as const;

const stages = [
  { title: "Authority", text: "Repository rules and task-specific scope" },
  { title: "Observed", text: "Repository changes observed independently" },
  { title: "Verified", text: "Required checks run and recorded" },
  { title: "Recorded", text: "Task evidence retained in Git" },
] as const;

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
        "Agentplane gives coding agents one bounded action at a time. AGENTS.md supplies repository rules; the CLI tracks task state, approval boundaries, and observed checks in Git.",
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

function DoodleArrow({ reverse = false }: { reverse?: boolean }): ReactNode {
  return (
    <svg
      className={[styles.doodleArrow, reverse ? styles.doodleArrowReverse : ""].join(" ")}
      viewBox="0 0 94 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M88 37C62 44 38 36 10 9M10 9l2 17M10 9l17 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StageGlyph({
  stage,
}: {
  stage: "Authority" | "Observed" | "Verified" | "Recorded";
}): ReactNode {
  if (stage === "Verified") return <IconSuccess aria-hidden="true" />;
  if (stage === "Authority") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path
          d="M6 2.8h8l4 4V21H6zM14 2.8V7h4M9 11h6M9 14h6M9 17h4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (stage === "Observed") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="10.6" cy="10.6" r="6.2" />
        <path d="m15.3 15.3 5 5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <ellipse cx="12" cy="5.2" rx="6.8" ry="2.7" />
      <path d="M5.2 5.2v13.6c0 1.5 3 2.7 6.8 2.7s6.8-1.2 6.8-2.7V5.2M5.2 10c0 1.5 3 2.7 6.8 2.7s6.8-1.2 6.8-2.7M5.2 14.6c0 1.5 3 2.7 6.8 2.7s6.8-1.2 6.8-2.7" />
    </svg>
  );
}

function FolderGlyph(): ReactNode {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M2 4.5a1.5 1.5 0 0 1 1.5-1.5h4l1.7 1.8h7.3A1.5 1.5 0 0 1 18 6.3v9.2a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15.5z" />
    </svg>
  );
}

function RepoGlyph(): ReactNode {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="2.5" width="13" height="15" rx="1.5" />
      <path d="M7 6.5h6M7 10h6M7 13.5h4" />
    </svg>
  );
}

function BranchGlyph(): ReactNode {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="5" cy="3.5" r="1.5" />
      <circle cx="15" cy="6.5" r="1.5" />
      <circle cx="5" cy="16.5" r="1.5" />
      <path d="M5 5v10M15 8v2a5 5 0 0 1-5 5H5" />
    </svg>
  );
}

function SearchGlyph(): ReactNode {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5" />
      <path d="m12.5 12.5 4 4" />
    </svg>
  );
}

function StageStrip({ mobile = false }: { mobile?: boolean }): ReactNode {
  return (
    <div
      className={`${styles.stageStrip} ${mobile ? styles.stageStripMobile : styles.stageStripDesktop}`}
      aria-label="How Agentplane records agent work"
    >
      {stages.map((stage, index) => (
        <div className={styles.stage} key={stage.title}>
          <span className={[styles.stageIcon, styles["stageIcon" + stage.title]].join(" ")}>
            <StageGlyph stage={stage.title} />
          </span>
          <span>
            <strong>{stage.title}</strong>
            <small>{stage.text}</small>
          </span>
          {index < stages.length - 1 ? (
            <IconArrow className={styles.stageArrow} aria-hidden="true" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function highlightLine(line: string): ReactNode {
  if (!line) return "\u00a0";
  const tokens: ReactNode[] = [];
  const pattern = /("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*")|\b(true|false|null)\b/g;
  let position = 0;
  for (const match of line.matchAll(pattern)) {
    const start = match.index ?? 0;
    if (start > position) tokens.push(line.slice(position, start));
    tokens.push(
      <span className={match[1] ? styles.codeKey : styles.codeValue} key={start}>
        {match[0]}
      </span>,
    );
    position = start + match[0].length;
  }
  if (position < line.length) tokens.push(line.slice(position));
  return tokens.length ? tokens : line;
}

function ArtifactExplorer(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(3);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [segmentStart, setSegmentStart] = useState(0);
  const remainingRef = useRef(tourDuration);
  const startedAtRef = useRef<number | null>(null);
  const active = artifacts[activeIndex];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReducedMotion(preference.matches);
      setPlaying(!preference.matches);
      remainingRef.current = tourDuration;
      setSegmentStart(0);
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    startedAtRef.current = performance.now();
    const timer = window.setTimeout(() => {
      remainingRef.current = tourDuration;
      startedAtRef.current = null;
      setSegmentStart(0);
      setActiveIndex((index) => (index + 1) % artifacts.length);
    }, remainingRef.current);
    return () => window.clearTimeout(timer);
  }, [activeIndex, playing, reducedMotion]);

  function pauseTour(): void {
    if (!playing) return;
    const elapsed = performance.now() - (startedAtRef.current ?? performance.now());
    remainingRef.current = Math.max(1, remainingRef.current - elapsed);
    setSegmentStart(1 - remainingRef.current / tourDuration);
    startedAtRef.current = null;
    setPlaying(false);
  }

  function selectArtifact(index: number): void {
    remainingRef.current = tourDuration;
    startedAtRef.current = null;
    setSegmentStart(0);
    setPlaying(false);
    setActiveIndex(index);
    trackHomeEvent("artifact_select", { file: artifacts[index].file });
  }

  function toggleTour(): void {
    if (reducedMotion) {
      remainingRef.current = tourDuration;
      setSegmentStart(0);
      setActiveIndex((index) => (index + 1) % artifacts.length);
      return;
    }
    if (playing) {
      pauseTour();
      return;
    }
    setPlaying(true);
  }

  const progressStyle = {
    "--progress-start": String(((activeIndex + segmentStart) / artifacts.length) * 100) + "%",
    "--progress-end": String(((activeIndex + 1) / artifacts.length) * 100) + "%",
    "--tour-duration": String(remainingRef.current) + "ms",
  } as CSSProperties;

  return (
    <div className={styles.explorerScene}>
      <div className={styles.annotationTop}>
        <DoodleArrow />
        <span key={active.file + "-top"}>{active.notes[0]}</span>
      </div>
      <div className={styles.annotationRight}>
        <DoodleArrow reverse />
        <span key={active.file + "-right"}>{active.notes[1]}</span>
      </div>
      <div className={styles.artifactWindow} onFocusCapture={pauseTour}>
        <div className={styles.windowChrome}>
          <div className={styles.repoName}>
            <span className={styles.repoGlyph} aria-hidden="true">
              <RepoGlyph />
            </span>
            <span>acme / web-app</span>
            <span className={styles.windowBranch}>
              <BranchGlyph /> main
            </span>
          </div>
          <div className={styles.windowActions} aria-hidden="true">
            <span className={styles.searchFiles}>
              <SearchGlyph /> Search files...
            </span>
            <span className={styles.chromeAction}>◩</span>
            <span className={styles.chromeAction}>•••</span>
          </div>
        </div>
        <div className={styles.windowBody}>
          <nav className={styles.fileTree} aria-label="Explore Agentplane artifacts">
            <p className={styles.treeFolder}>
              ⌄ <FolderGlyph /> .agentplane
            </p>
            <p className={`${styles.treeFolder} ${styles.treeFolderNested}`}>
              ⌄ <FolderGlyph /> tasks
            </p>
            <button
              className={`${styles.treeFolder} ${styles.treeFolderTask} ${styles.treeFolderButton}`}
              type="button"
              onClick={() => selectArtifact(1)}
              aria-label="Open task README.md"
            >
              › <FolderGlyph /> 202609231539-BY7E3D
            </button>
            <div className={styles.treeFiles}>
              {[2, 3, 4, 0, 5, 6].map((index) => {
                const artifact = artifacts[index];
                return (
                  <div className={styles.treeFileGroup} key={artifact.file}>
                    {index === 4 ? (
                      <p className={`${styles.treeFolder} ${styles.treeFolderEvidence}`}>
                        ⌄ <FolderGlyph /> verification
                      </p>
                    ) : null}
                    {index === 6 ? (
                      <>
                        <p className={styles.treeFolder}>
                          › <FolderGlyph /> src
                        </p>
                        <p className={styles.treeFolder}>
                          › <FolderGlyph /> tests
                        </p>
                      </>
                    ) : null}
                    <button
                      type="button"
                      className={[
                        styles.fileButton,
                        index === activeIndex ? styles.fileButtonActive : "",
                      ].join(" ")}
                      aria-current={index === activeIndex ? "true" : undefined}
                      onClick={() => selectArtifact(index)}
                    >
                      <span className={styles.fileGlyph} aria-hidden="true">
                        {artifact.file.endsWith(".json") ? "{}" : "▤"}
                      </span>
                      <span>{artifact.file.split("/").at(-1)}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </nav>
          <nav
            className={styles.mobileFileTabs}
            aria-label="Explore Agentplane artifacts on mobile"
          >
            {[0, 6, 3, 1, 2, 4, 5].map((index) => (
              <button
                key={artifacts[index].file}
                type="button"
                className={index === activeIndex ? styles.mobileFileTabActive : ""}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => selectArtifact(index)}
              >
                <span className={styles.mobileTabGlyph} aria-hidden="true">
                  {artifacts[index].file.endsWith(".json") ? "{}" : "▤"}
                </span>
                {index === 1 ? "task README.md" : artifacts[index].file.split("/").at(-1)}
              </button>
            ))}
          </nav>
          <div className={styles.editor}>
            <div className={styles.editorTab}>
              <span className={styles.tabFileIcon} aria-hidden="true">
                {active.file.endsWith(".json") ? "{}" : "▤"}
              </span>
              {active.file}
              <span className={styles.tabClose} aria-hidden="true">
                ×
              </span>
            </div>
            <div className={styles.editorContent} key={active.file}>
              <div
                className={`${styles.codeLines} ${active.file.endsWith(".jsonl") ? styles.jsonlCodeLines : ""}`}
                aria-label={"Representative excerpt from " + active.file}
              >
                {active.preview.map((line, index) => (
                  <div className={styles.codeLine} key={index}>
                    <span className={styles.lineNumber} aria-hidden="true">
                      {index + 1}
                    </span>
                    <code>{highlightLine(line)}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <StageStrip />
      </div>
      <div className={styles.progressTrack} aria-hidden="true">
        <span
          key={activeIndex}
          className={
            reducedMotion
              ? styles.progressReduced
              : playing
                ? styles.progressAnimating
                : styles.progressStatic
          }
          style={progressStyle}
        />
      </div>
      <div className={styles.explorerFooter}>
        <p className={styles.artifactCaption} aria-live={playing ? "off" : "polite"}>
          <span>{active.category}</span>
          {active.caption}
        </p>
        <button
          className={styles.tourControl}
          type="button"
          onClick={toggleTour}
          aria-label={reducedMotion ? "Next file" : playing ? "Pause file tour" : "Play file tour"}
        >
          {reducedMotion ? "NEXT FILE" : playing ? "PAUSE TOUR" : "PLAY TOUR"}
          <span aria-hidden="true">{reducedMotion ? "→" : playing ? "Ⅱ" : "▷"}</span>
        </button>
      </div>
      <div className={styles.annotationBottom}>
        <span key={active.file + "-bottom"}>{active.notes[2]}</span>
        <DoodleArrow />
      </div>
      <StageStrip mobile />
    </div>
  );
}

function Hero(): ReactNode {
  const { hero } = homepageContent;
  return (
    <section className={styles.hero}>
      <div className={styles.heroIntro}>
        <p className={styles.kicker}>
          <span className={styles.kickerDot} />
          {hero.eyebrow}
        </p>
        <h1>
          {hero.titleLines[0]}
          <br />
          {hero.titleLines[1]}
        </h1>
        <p className={styles.lede}>{hero.subtitle}</p>
        <div className={styles.ctaGroup}>
          <Link
            className={styles.buttonPrimary}
            to={quickstartUrl}
            onClick={() => trackHomeEvent("quickstart_click", { location: "hero_primary" })}
          >
            Follow the quickstart <span aria-hidden="true">→</span>
          </Link>
          <CopyInstallButton location="hero" />
        </div>
        <p className={styles.trust}>{hero.trustLine}</p>
      </div>
      <ArtifactExplorer />
    </section>
  );
}

function ProofOverview(): ReactNode {
  return (
    <section className={`${styles.proofOverview} ${styles.reveal}`}>
      <div className={styles.proofOverviewInner}>
        <p className={styles.kicker}>One job at a time</p>
        <h2>The agent sees the next job. The CLI keeps the state.</h2>
        <p className={styles.proofOverviewLede}>
          A compact WorkOrder gives the agent the objective, scope, and context it needs. The CLI
          tracks the rest of the workflow, so the agent can focus on the code.
        </p>
        <div className={styles.proofOverviewGrid}>
          <div>
            <span className={`${styles.stageIcon} ${styles.stageIconAuthority}`}>
              <StageGlyph stage="Authority" />
            </span>
            <h3>Repository rules</h3>
            <p>AGENTS.md gives the agent its guardrails and command contract.</p>
          </div>
          <div>
            <span className={`${styles.stageIcon} ${styles.stageIconVerified}`}>
              <IconArrow aria-hidden="true" />
            </span>
            <h3>Bounded handoff</h3>
            <p>
              The CLI returns the next objective, permitted scope, expected result, and stop rules.
            </p>
          </div>
          <div>
            <span className={`${styles.stageIcon} ${styles.stageIconRecorded}`}>
              <StageGlyph stage="Recorded" />
            </span>
            <h3>Reviewable outcome</h3>
            <p>Observed changes and check results stay in the repository after the session ends.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AuthorityGap(): ReactNode {
  const { authorityGap } = homepageContent;

  return (
    <section className={`${styles.section} ${styles.authoritySection} ${styles.reveal}`}>
      <div className={styles.splitSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>{authorityGap.eyebrow}</p>
          <h2>{authorityGap.title}</h2>
          <p>{authorityGap.text}</p>
        </div>
        <div className={styles.diffPanel} aria-label="Git diff without authority evidence">
          <header>
            <span className={styles.diffFile}>
              <RepoGlyph /> <code>src/parser/lexer.ts</code>
            </span>
            <span className={styles.diffStats} aria-label="Two additions and one deletion">
              <span>+2</span> <span>−1</span>
            </span>
          </header>
          <pre>
            <code>
              <span className={styles.diffMeta}>42 function tokenize(input: string) &#123;</span>
              <span>43 const tokens = [];</span>
              <span>44 let i = 0;</span>
              <span className={styles.diffRemove}>45 - if (ch === "-") &#123;</span>
              <span className={styles.diffAdd}>46 + if (ch === "-") &#123;</span>
              <span className={styles.diffAdd}>47 + tokens.push(ch);</span>
              <span>48 return tokens;</span>
            </code>
          </pre>
          <footer>
            <strong>Missing context</strong>
            <p>This diff alone shows no approved scope, approver, or check result.</p>
          </footer>
        </div>
        <div className={styles.authorityAnnotation} aria-hidden="true">
          <DoodleArrow /> <span>Changes here. Boundaries in the task record.</span>
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
  if (icon === "authorize") return <StageGlyph stage="Authority" />;
  if (icon === "verify") return <StageGlyph stage="Verified" />;
  if (icon === "record") return <StageGlyph stage="Recorded" />;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m8 4 12 8-12 8z" strokeLinejoin="round" />
    </svg>
  );
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
        <span className={styles.loopEvidenceIcon} aria-hidden="true">
          <StepIcon icon={activeStep.icon} />
        </span>
        <span className={styles.loopEvidenceCopy}>
          <strong>{activeStep.evidence}</strong>
          <small>{activeStep.text}</small>
        </span>
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
            <span className={styles.ledgerRepo}>
              <RepoGlyph /> acme / web-app
            </span>
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
                <RepoGlyph />
                <code title={file}>{file.replace(".agentplane/tasks/parser-edge/", "")}</code>
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

function FormalChecks(): ReactNode {
  const { formalChecks } = homepageContent;

  return (
    <section className={`${styles.section} ${styles.formalSection} ${styles.reveal}`}>
      <div className={styles.formalInner}>
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>{formalChecks.eyebrow}</p>
          <h2>{formalChecks.title}</h2>
          <p>{formalChecks.text}</p>
        </div>
        <div className={styles.formalPanel}>
          <header>
            <span>Safety rule / effect ownership</span>
            <code>Task Kernel</code>
          </header>
          <strong>{formalChecks.rule}</strong>
          <ol>
            {formalChecks.steps.map(([label, description]) => (
              <li key={label}>
                <span>{label}</span>
                <p>{description}</p>
              </li>
            ))}
          </ol>
          <footer>{formalChecks.scope}</footer>
        </div>
      </div>
    </section>
  );
}

function WorksWith(): ReactNode {
  const { worksWith } = homepageContent;
  return (
    <section className={`${styles.section} ${styles.worksSection} ${styles.reveal}`}>
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>Keep your tools</p>
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

function WorkflowModes(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.modesSection} ${styles.reveal}`}>
      <div className={styles.sectionIntroWide}>
        <p className={styles.kicker}>Choose the route</p>
        <h2>Choose how each task moves to review.</h2>
        <p>
          Work in the current checkout for a focused change, or use an isolated worktree and PR.
          Both routes keep task state and check results in the repository.
        </p>
      </div>
      <div className={styles.modeGrid}>
        <div className={styles.modeCard}>
          <span className={styles.modeGlyph} aria-hidden="true">
            <IconEdit />
          </span>
          <span className={styles.modeIndex}>01 / LOCAL LOOP</span>
          <h3>
            <code>direct</code>
          </h3>
          <p>
            Make a focused change in the current checkout. Review its task record and required
            checks before closing.
          </p>
          <ul>
            <li>Fast iteration in your environment</li>
            <li>Full control and visibility</li>
            <li>The same verification record</li>
          </ul>
        </div>
        <div className={styles.modeCard}>
          <span className={styles.modeGlyph} aria-hidden="true">
            <IconArrow />
          </span>
          <span className={styles.modeIndex}>02 / REVIEW ROUTE</span>
          <h3>
            <code>branch_pr</code>
          </h3>
          <p>
            Use an isolated worktree and a PR for changes that need a formal review and integration
            path.
          </p>
          <ul>
            <li>Isolated changes in a branch</li>
            <li>Review and discuss like normal</li>
            <li>Evidence included with the PR</li>
          </ul>
        </div>
      </div>
      <Link className={styles.textLink} to={siteRoutes.overview}>
        Explore the workflow <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}

function DocsRail(): ReactNode {
  const groups = [
    { label: "Getting started", title: "Run your first task", href: siteRoutes.quickstart },
    { label: "Workflow model", title: "See how control works", href: siteRoutes.overview },
    { label: "Reference", title: "Inspect the ACR", href: siteRoutes.acr },
    { label: "Developer track", title: "Explore runnable examples", href: siteRoutes.examples },
    { label: "Support", title: "Compare approaches", href: siteRoutes.compare },
  ];

  return (
    <section className={`${styles.section} ${styles.docsSection} ${styles.reveal}`}>
      <div className={styles.sectionIntroWide}>
        <p className={styles.kicker}>What to read next</p>
        <h2>Choose the next step for your repository.</h2>
      </div>
      <div className={styles.docsGrid}>
        {groups.map((group) => (
          <Link className={styles.docsCard} to={group.href} key={group.label}>
            <span>{group.label}</span>
            <strong>{group.title}</strong>
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
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
          Run quickstart <span aria-hidden="true">→</span>
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
        <ProofOverview />
        <AuthorityGap />
        <ControlLoop />
        <DurableProof />
        <FormalChecks />
        <WorksWith />
        <WorkflowModes />
        <DocsRail />
        <FinalCta />
      </main>
    </Layout>
  );
}
