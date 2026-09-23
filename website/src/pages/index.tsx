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
    caption: "The agent reads the rules before it touches the code.",
    notes: ["Start with the boundary.", "Instructions live with the repo.", "Scope comes first."],
    preview: [
      "# AGENTS.md",
      "",
      "## Scope",
      "Work only inside the approved task.",
      "Read the current WorkOrder before editing.",
      "",
      "## Checks",
      "Return evidence for every required check.",
    ],
  },
  {
    file: ".agentplane/tasks/<task-id>/README.md",
    category: "02 / TASK RECORD",
    caption: "A task has an owner, a plan, and a reviewable path to done.",
    notes: ["A plan you can inspect.", "One task, one record.", "No hidden handoff."],
    preview: [
      "# Fix parser edge case",
      "",
      "Status: DOING",
      "Plan approval: approved",
      "",
      "## Scope",
      "Update the parser and its focused checks.",
      "",
      "## Verify Steps",
      "Run the checks named in this task.",
    ],
  },
  {
    file: "observations.jsonl",
    category: "03 / OBSERVED",
    caption: "Repository facts are captured separately from the agent's report.",
    notes: ["Show what happened.", "Claims differ from observations.", "Readable later."],
    preview: [
      '{"kind":"workspace_observation",',
      ' "task_id":"parser-edge",',
      ' "changed_paths":["src/parser/token.ts"],',
      ' "checks":[{"name":"unit","status":"passed"}],',
      ' "source":"repository_readback"}',
    ],
  },
  {
    file: "acr.json",
    category: "04 / CHANGE RECORD",
    caption: "The Agent Change Record connects the work to its authority and proof.",
    notes: ["Authority, in writing.", "Changes you can inspect.", "Every change leaves a record."],
    preview: [
      "{",
      '  "version": "1",',
      '  "task": "fix-parser-edge-case",',
      '  "authority": {',
      '    "actor": "code-agent:cli",',
      '    "policy": "AGENTS.md",',
      '    "scope": ["src/parser/**"]',
      "  },",
      '  "changes": [',
      "    {",
      '      "path": "src/parser/lexer.ts",',
      '      "action": "modify",',
      '      "summary": "Handle empty input edge case"',
      "    },",
      "    {",
      '      "path": "src/parser/lexer.test.ts",',
      '      "action": "add",',
      '      "summary": "Add regression test"',
      "    }",
      "  ],",
      '  "observations": "see observations.jsonl",',
      '  "verified": {',
      '    "checks": ["lint", "typecheck", "tests"],',
      '    "status": "passed"',
      "  }",
      "}",
    ],
  },
  {
    file: "evidence/manifest.json",
    category: "05 / EVIDENCE",
    caption: "A manifest keeps the checks and their source files together in Git.",
    notes: ["Find the evidence.", "Verify the bundle.", "Keep the record."],
    preview: [
      "{",
      '  "schema_version": 1,',
      '  "task_id": "parser-edge",',
      '  "artifacts": [',
      '    "verification/result.json",',
      '    "observations.jsonl"',
      "  ]",
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
      "1. Review the approved scope in AGENTS.md.",
      "2. Make the change and run the project checks.",
      "3. Review the task record and evidence in Git.",
    ],
  },
] as const;

const stages = [
  { title: "Authority", text: "Bounded by AGENTS.md and approved scope" },
  { title: "Observed", text: "Agent actions and rationale captured" },
  { title: "Verified", text: "Tests and checks must pass" },
  { title: "Recorded", text: "Durable, auditable evidence in Git" },
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
              › <FolderGlyph /> task-001-fix-parser
            </button>
            <p className={`${styles.treeFolder} ${styles.treeFolderTask}`}>
              › <FolderGlyph /> task-002-add-tests
            </p>
            <div className={styles.treeFiles}>
              {[2, 3, 4, 0, 5, 6].map((index) => {
                const artifact = artifacts[index];
                return (
                  <div className={styles.treeFileGroup} key={artifact.file}>
                    {index === 4 ? (
                      <p className={`${styles.treeFolder} ${styles.treeFolderEvidence}`}>
                        ⌄ <FolderGlyph /> evidence
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
              <div className={styles.codeLines} aria-label={"Example contents of " + active.file}>
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
          Let agents write code.
          <br />
          Keep authority and <br className={styles.heroMobileBreak} />
          proof in Git.
        </h1>
        <p className={styles.lede}>
          Agentplane puts coding agents on an approved, verifiable repository workflow.
        </p>
        <div className={styles.ctaGroup}>
          <Link
            className={styles.buttonPrimary}
            to={quickstartUrl}
            onClick={() => trackHomeEvent("quickstart_click", { location: "hero_primary" })}
          >
            Start in your repository <span aria-hidden="true">→</span>
          </Link>
          <CopyInstallButton location="hero" />
        </div>
        <p className={styles.trust}>
          Agent-agnostic &nbsp; · &nbsp; Local-first &nbsp; · &nbsp; No account required &nbsp; ·
          &nbsp; MIT licensed
        </p>
      </div>
      <ArtifactExplorer />
    </section>
  );
}

function ProofOverview(): ReactNode {
  return (
    <section className={`${styles.proofOverview} ${styles.reveal}`}>
      <div className={styles.proofOverviewInner}>
        <p className={styles.kicker}>Built for real development</p>
        <h2>Proof lives with the code.</h2>
        <p className={styles.proofOverviewLede}>
          Every change from an agent runs in a controlled workflow,
          <br />
          with tests, checks, and a permanent record in Git.
        </p>
        <div className={styles.proofOverviewGrid}>
          <div>
            <span className={`${styles.stageIcon} ${styles.stageIconAuthority}`}>
              <StageGlyph stage="Authority" />
            </span>
            <h3>Clear authority</h3>
            <p>Define what agents can do in AGENTS.md with explicit scope and constraints.</p>
          </div>
          <div>
            <span className={`${styles.stageIcon} ${styles.stageIconVerified}`}>
              <IconSuccess aria-hidden="true" />
            </span>
            <h3>Verifiable work</h3>
            <p>
              Agents run locally, changes pass your checks, and nothing lands without verification.
            </p>
          </div>
          <div>
            <span className={`${styles.stageIcon} ${styles.stageIconRecorded}`}>
              <StageGlyph stage="Recorded" />
            </span>
            <h3>A durable record</h3>
            <p>
              Task state, ACR, and evidence are committed to your repository alongside the code.
            </p>
          </div>
        </div>
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

function WorkflowModes(): ReactNode {
  return (
    <section className={`${styles.section} ${styles.modesSection} ${styles.reveal}`}>
      <div className={styles.sectionIntroWide}>
        <p className={styles.kicker}>Choose the route</p>
        <h2>One control model. Two ways to work.</h2>
        <p>
          Use the workflow that fits the size of the change. Both keep task state and verification
          in your repository.
        </p>
      </div>
      <div className={styles.modeGrid}>
        <div className={styles.modeCard}>
          <span className={styles.modeIndex}>01 / LOCAL LOOP</span>
          <h3>
            <code>direct</code>
          </h3>
          <p>
            Work in the current checkout for quick, focused changes. Review the task record and
            required checks before closing.
          </p>
        </div>
        <div className={styles.modeCard}>
          <span className={styles.modeIndex}>02 / REVIEW ROUTE</span>
          <h3>
            <code>branch_pr</code>
          </h3>
          <p>
            Use an isolated worktree and a PR for changes that need a formal review and integration
            path.
          </p>
        </div>
      </div>
      <Link className={styles.textLink} to={siteRoutes.overview}>
        Explore the workflow <IconArrow aria-hidden="true" />
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
        <p className={styles.kicker}>Keep exploring</p>
        <h2>Find the next useful page.</h2>
      </div>
      <div className={styles.docsGrid}>
        {groups.map((group) => (
          <Link className={styles.docsCard} to={group.href} key={group.label}>
            <span>{group.label}</span>
            <strong>{group.title}</strong>
            <IconArrow aria-hidden="true" />
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
        <ProofOverview />
        <AuthorityGap />
        <ControlLoop />
        <DurableProof />
        <WorksWith />
        <WorkflowModes />
        <DocsRail />
        <FinalCta />
      </main>
    </Layout>
  );
}
