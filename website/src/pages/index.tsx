import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import {
  comparisonUrl,
  docsUrl,
  contributingUrl,
  githubProofFallback,
  githubUrl,
  homepageContent,
  installCommand,
  quickstartUrl,
  roadmapUrl,
  recipesIndexUrl,
  securityUrl,
} from "../data/homepage-content";
import styles from "./_home.module.css";

type ButtonVariant = "primary" | "secondary" | "copy";

type Action = {
  label: string;
  variant: ButtonVariant;
  to?: string;
  command?: string;
  eventName?: string;
};

type RecipeVersion = {
  version: string;
  url?: string;
  sha256?: string;
};

type RecipeEntry = {
  id: string;
  summary: string;
  description: string;
  versions?: RecipeVersion[];
};

type RecipeLoadState = "idle" | "loading" | "ready" | "error";

type RecipeIndexPayload = {
  recipes?: unknown[];
};

type GithubProof = typeof githubProofFallback;

type GithubRepoPayload = {
  stargazers_count?: number;
  forks_count?: number;
  license?: { spdx_id?: string | null } | null;
  language?: string | null;
};

type GithubReleasePayload = {
  tag_name?: string;
};

function trackHomeEvent(eventName?: string): void {
  if (!eventName || typeof globalThis.window === "undefined") return;
  const gtag = (globalThis.window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", eventName, { event_category: "home" });
}

async function copyTextToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function showCopiedFeedback(button: HTMLButtonElement): void {
  button.dataset.copied = "true";
  globalThis.setTimeout(() => {
    delete button.dataset.copied;
  }, 1600);
}

function CopyCommand({
  command,
  label = command,
  className,
  eventName,
}: {
  command: string;
  label?: string;
  className?: string;
  eventName?: string;
}): ReactNode {
  const copyCommand = (event: unknown) => {
    const { currentTarget: button } = event as { currentTarget: HTMLButtonElement };

    void copyTextToClipboard(command).then(() => {
      trackHomeEvent(eventName ?? "copy_install_clicked");
      showCopiedFeedback(button);
      return null;
    });
  };

  return (
    <button
      className={`${styles.copyCommand}${className ? ` ${className}` : ""}`}
      type="button"
      onClick={copyCommand}
      aria-label={`Copy command: ${command}`}
      aria-live="polite"
    >
      <span className={styles.copyText}>
        <code>{label}</code>
      </span>
      <span className={styles.copyFeedback}>Copied</span>
    </button>
  );
}

function ActionControl({ action }: { action: Action }): ReactNode {
  if (action.command) {
    return (
      <CopyCommand
        command={action.command}
        label={action.label}
        className={styles.actionCopy}
        eventName={action.eventName}
      />
    );
  }

  const className =
    action.variant === "primary"
      ? `${styles.action} ${styles.actionPrimary}`
      : `${styles.action} ${styles.actionSecondary}`;

  return (
    <Link
      className={className}
      to={action.to ?? "/"}
      onClick={() => trackHomeEvent(action.eventName)}
    >
      {action.label}
    </Link>
  );
}

function ActionsRow({ actions }: { actions: readonly Action[] }): ReactNode {
  return (
    <div className={styles.actionsRow}>
      {actions.map((action) => (
        <ActionControl key={action.label} action={action} />
      ))}
    </div>
  );
}

function SectionLead({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text?: string;
}): ReactNode {
  return (
    <div className={styles.sectionLead}>
      <span className={styles.sectionLabel}>{label}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function TerminalPreview({
  title,
  lines,
  compact = false,
}: {
  title: string;
  lines: readonly string[];
  compact?: boolean;
}): ReactNode {
  return (
    <div className={`${styles.terminalPreview}${compact ? ` ${styles.terminalCompact}` : ""}`}>
      <div className={styles.terminalTopbar}>
        <span>{title}</span>
        <span>local</span>
      </div>
      <pre className={styles.terminalBody} aria-label={title}>
        <code>
          {lines.map((line, index) => (
            <span key={`${line}-${index}`} className={styles.terminalLine}>
              <span className={styles.commandPrompt}>$</span>
              {line}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

function HeroArtifactVisual(): ReactNode {
  const { heroArtifacts, hero } = homepageContent;

  return (
    <div className={styles.heroArtifactPanel} aria-label="AgentPlane evidence artifact flow">
      <div className={styles.traceLine}>{hero.flow}</div>
      <div className={styles.traceCards}>
        {heroArtifacts.map((artifact) => (
          <article key={artifact.path} className={styles.traceCard}>
            <div className={styles.traceCardTop}>
              <span>{artifact.label}</span>
              <strong>{artifact.status}</strong>
            </div>
            <h3>{artifact.path}</h3>
            <pre>
              <code>{artifact.lines.join("\n")}</code>
            </pre>
          </article>
        ))}
      </div>
    </div>
  );
}

function useGithubProof(): GithubProof {
  const [proof, setProof] = useState<GithubProof>(githubProofFallback);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProof(): Promise<void> {
      try {
        const [repoResponse, releaseResponse] = await Promise.all([
          fetch("https://api.github.com/repos/basilisk-labs/agentplane", {
            signal: controller.signal,
            headers: { accept: "application/vnd.github+json" },
          }),
          fetch("https://api.github.com/repos/basilisk-labs/agentplane/releases/latest", {
            signal: controller.signal,
            headers: { accept: "application/vnd.github+json" },
          }),
        ]);

        if (!repoResponse.ok || !releaseResponse.ok) return;

        const repo = (await repoResponse.json()) as GithubRepoPayload;
        const latest = (await releaseResponse.json()) as GithubReleasePayload;

        setProof({
          ...githubProofFallback,
          stars: repo.stargazers_count ?? githubProofFallback.stars,
          forks: repo.forks_count ?? githubProofFallback.forks,
          latestRelease: latest.tag_name ?? githubProofFallback.latestRelease,
          license: repo.license?.spdx_id ?? githubProofFallback.license,
          language: repo.language ?? githubProofFallback.language,
        });
      } catch {
        setProof(githubProofFallback);
      }
    }

    void loadProof();

    return () => controller.abort();
  }, []);

  return proof;
}

function ProofStrip(): ReactNode {
  const proof = useGithubProof();

  return (
    <section className={`${styles.proofStrip} ${styles.shell}`} aria-label="GitHub project proof">
      <p>
        <strong>Early OSS project</strong> - star it if you want local-first evidence for coding
        agents.
      </p>
      <div className={styles.proofStats}>
        <span>{proof.stars} stars</span>
        <span>{proof.forks} forks</span>
        <span>{proof.releases} releases</span>
        <span>{proof.latestRelease}</span>
        <span>{proof.license}</span>
        <span>{proof.language}</span>
        <span>{proof.posture}</span>
      </div>
    </section>
  );
}

function normalizeVersion(version: string): number[] {
  return String(version)
    .trim()
    .split(".")
    .map((part) => Number.parseInt(part, 10))
    .map((part) => (Number.isNaN(part) ? 0 : part));
}

function compareVersions(left: string, right: string): number {
  const leftParts = normalizeVersion(left);
  const rightParts = normalizeVersion(right);
  const maxLength = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < maxLength; index += 1) {
    const leftPart = leftParts[index] ?? 0;
    const rightPart = rightParts[index] ?? 0;
    if (leftPart > rightPart) return -1;
    if (leftPart < rightPart) return 1;
  }
  return 0;
}

function parseRecipes(payload: unknown): RecipeEntry[] {
  if (!payload || typeof payload !== "object") return [];
  const raw = (payload as RecipeIndexPayload).recipes;
  if (!Array.isArray(raw)) return [];

  const normalized: RecipeEntry[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const candidate = item as Partial<RecipeEntry>;
    const id = String(candidate.id ?? "").trim();
    const summary = String(candidate.summary ?? "").trim();
    const description = String(candidate.description ?? "").trim();
    if (!id || !summary || !description) continue;

    const versions = Array.isArray(candidate.versions)
      ? candidate.versions
          .filter((entry): entry is RecipeVersion => {
            if (!entry || typeof entry !== "object") return false;
            const typed = entry as Partial<RecipeVersion>;
            return typeof typed.version === "string" && typed.version.trim().length > 0;
          })
          .map((entry) => ({
            version: String(entry.version).trim(),
            url: typeof entry.url === "string" ? entry.url.trim() : undefined,
            sha256: typeof entry.sha256 === "string" ? entry.sha256.trim() : undefined,
          }))
      : [];

    normalized.push({
      id,
      summary,
      description,
      versions,
    });
  }

  return normalized.sort((left, right) => left.id.localeCompare(right.id));
}

function latestVersion(recipe: RecipeEntry): string | null {
  const versions = recipe.versions?.filter((entry) => entry.version.trim().length > 0) ?? [];
  if (versions.length === 0) return null;
  return (
    versions.toSorted((left, right) => compareVersions(left.version, right.version))[0]?.version ??
    null
  );
}

function buildInstallCommand(recipe: RecipeEntry): string {
  return `agentplane recipes install ${recipe.id} --index ${recipesIndexUrl} --refresh --yes`;
}

function RecipeCard({ recipe }: { recipe: RecipeEntry }): ReactNode {
  const latest = latestVersion(recipe);
  const recipeInstallCommand = buildInstallCommand(recipe);

  return (
    <article className={styles.recipeCard}>
      <h3>{recipe.id}</h3>
      <p className={styles.recipeDescription}>{recipe.description}</p>
      <p>{recipe.summary}</p>
      <div className={styles.recipeMeta}>
        <span>{latest ? `latest: ${latest}` : "version: n/a"}</span>
      </div>
      <CopyCommand
        command={recipeInstallCommand}
        label="Install"
        className={styles.recipeAction}
        eventName="copy_recipe_install_clicked"
      />
    </article>
  );
}

function RecipesCatalogSection(): ReactNode {
  const { recipesCatalog } = homepageContent;
  const [state, setState] = useState<RecipeLoadState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [recipes, setRecipes] = useState<RecipeEntry[]>([]);

  const loadRecipes = useCallback(async () => {
    setState("loading");
    setErrorMessage("");
    const controller = new AbortController();
    const timeoutId = globalThis.setTimeout(() => {
      controller.abort();
    }, 9000);

    try {
      const response = await fetch(recipesIndexUrl, {
        signal: controller.signal,
        headers: {
          accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Catalog request failed: ${response.status} ${response.statusText}`);
      }

      const payload = (await response.json()) as unknown;
      const parsed = parseRecipes(payload);
      setRecipes(parsed);
      setState("ready");
    } catch (error) {
      setRecipes([]);
      setState("error");
      setErrorMessage(error instanceof Error ? error.message : "Cannot fetch recipes catalog");
    } finally {
      globalThis.clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    if (state === "idle") {
      void loadRecipes();
    }
  }, [loadRecipes, state]);

  const content = useMemo(() => {
    if (state === "loading") {
      return (
        <p className={styles.recipeStatus} aria-live="polite">
          Loading recipes catalog...
        </p>
      );
    }

    if (state === "error") {
      return (
        <div className={styles.recipeStatus}>
          <p>{errorMessage}</p>
          <button className={styles.recipeAction} type="button" onClick={() => void loadRecipes()}>
            Retry
          </button>
        </div>
      );
    }

    if (state === "ready" && recipes.length === 0) {
      return <p className={styles.recipeStatus}>No recipes found in catalog.</p>;
    }

    return (
      <div className={styles.recipeGrid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    );
  }, [state, recipes, errorMessage, loadRecipes]);

  return (
    <section className={`${styles.section} ${styles.shell}`}>
      <SectionLead label="Advanced" title={recipesCatalog.title} text={recipesCatalog.text} />
      <p className={styles.sectionLeadText}>{recipesCatalog.stepText}</p>
      {content}
    </section>
  );
}

function StarCta({
  eventName,
  text,
  compact = false,
}: {
  eventName: string;
  text: string;
  compact?: boolean;
}): ReactNode {
  return (
    <div className={`${styles.starCta}${compact ? ` ${styles.starCtaCompact}` : ""}`}>
      <p>{text}</p>
      <span className={styles.githubEmbedSlot}>
        <a
          className="github-button"
          href={githubUrl}
          data-color-scheme="no-preference: light; light: light; dark: dark;"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star basilisk-labs/agentplane on GitHub"
          onClick={() => trackHomeEvent(eventName)}
        >
          Star
        </a>
        <a
          className={styles.githubFallbackButton}
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackHomeEvent(eventName)}
        >
          ★ Star on GitHub
        </a>
      </span>
    </div>
  );
}

export default function Home(): ReactNode {
  const {
    seo,
    hero,
    problem,
    quickstart,
    projectStatus,
    artifacts,
    worksWith,
    comparison,
    acr,
    whoShouldStar,
    context,
    contribute,
    security,
    roadmap,
    closing,
  } = homepageContent;

  return (
    <Layout title={seo.title} description={seo.description}>
      <main className={styles.page}>
        <section className={styles.heroStage}>
          <div className={styles.shell}>
            <div className={styles.heroGrid}>
              <article className={styles.heroCopy}>
                <span className={styles.heroEyebrow}>{hero.eyebrow}</span>
                <h1>{hero.title}</h1>
                <p className={styles.heroSubtitle}>{hero.subtitle}</p>
                <ActionsRow
                  actions={[
                    {
                      label: installCommand,
                      command: installCommand,
                      variant: "copy",
                      eventName: "copy_install_clicked",
                    },
                    {
                      label: "Run the 90-second quickstart",
                      to: quickstartUrl,
                      variant: "secondary",
                      eventName: "quickstart_clicked",
                    },
                    {
                      label: "View on GitHub",
                      to: githubUrl,
                      variant: "secondary",
                      eventName: "github_clicked_from_hero",
                    },
                    {
                      label: "Read the docs",
                      to: docsUrl,
                      variant: "secondary",
                      eventName: "docs_clicked_from_hero",
                    },
                  ]}
                />
                <StarCta compact eventName="github_star_hero_clicked" text="Star the repo:" />
                <p className={styles.proofLine}>{hero.proofLine}</p>
                <div className={styles.trustStrip} aria-label="Open source trust signals">
                  {hero.trustItems.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
              <HeroArtifactVisual />
            </div>
          </div>
        </section>

        <ProofStrip />

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.problemBand}>
            <SectionLead label="Problem" title={problem.title} text={problem.text} />
            <ul className={styles.problemList}>
              {problem.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.quickstartPanel}>
            <SectionLead label="Quickstart" title={quickstart.title} text={quickstart.text} />
            <TerminalPreview title="90-second quickstart" lines={quickstart.lines} />
            <div className={styles.expectedArtifacts}>
              <span>Expected local artifacts</span>
              {quickstart.expectedArtifacts.map((artifact) => (
                <code key={artifact}>{artifact}</code>
              ))}
            </div>
            <div className={styles.quickstartActions}>
              <CopyCommand
                command={quickstart.lines.join("\n")}
                label="Copy quickstart"
                eventName="copy_install_clicked"
              />
              <StarCta
                compact
                eventName="github_star_quickstart_clicked"
                text={quickstart.afterAction}
              />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.statusPanel}>
            <SectionLead
              label="Project status"
              title={projectStatus.title}
              text={projectStatus.text}
            />
            <div className={styles.statusColumns}>
              <div>
                <h3>Current scope</h3>
                <ul>
                  {projectStatus.currentScope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Not in scope</h3>
                <ul>
                  {projectStatus.notInScope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell} ${styles.artifactSection}`}>
          <SectionLead label="Artifacts" title={artifacts.title} text={artifacts.text} />
          <div className={styles.artifactGrid}>
            {artifacts.items.map((artifact) => (
              <article key={artifact.path} className={styles.artifactCard}>
                <span>{artifact.label}</span>
                <h3>{artifact.path}</h3>
                <p>{artifact.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Works with" title={worksWith.title} />
          <div className={styles.logoStrip}>
            {worksWith.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Compare" title={comparison.title} text={comparison.text} />
          <div className={styles.comparisonList}>
            {comparison.rows.map((row) => (
              <article key={row.label} className={styles.comparisonRow}>
                <h3>{row.label}</h3>
                <p>{row.value}</p>
              </article>
            ))}
          </div>
          <div className={styles.inlineActions}>
            <Link
              className={`${styles.action} ${styles.actionSecondary}`}
              to={comparisonUrl}
              onClick={() => trackHomeEvent("compare_clicked_from_home")}
            >
              Compare with LangSmith/LangGraph
            </Link>
            <StarCta compact eventName="github_star_compare_clicked" text={comparison.starLine} />
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.acrPanel}>
            <SectionLead label="Agent Change Record" title={acr.title} text={acr.text} />
            <pre className={styles.acrSnippet} aria-label="Agent Change Record JSON example">
              <code>{acr.snippet.join("\n")}</code>
            </pre>
            <Link
              className={`${styles.action} ${styles.actionSecondary}`}
              to={acr.action.to}
              onClick={() => trackHomeEvent("acr_example_clicked")}
            >
              {acr.action.label}
            </Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.starAudience}>
            <SectionLead label="OSS signal" title={whoShouldStar.title} />
            <ul>
              {whoShouldStar.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.advancedPanel}>
            <SectionLead label="Advanced" title={context.title} text={context.text} />
            <ActionsRow
              actions={[
                {
                  label: context.action.label,
                  to: context.action.to,
                  variant: "secondary",
                  eventName: "docs_clicked_from_home",
                },
                {
                  label: "Read the docs",
                  to: docsUrl,
                  variant: "secondary",
                  eventName: "docs_clicked_from_home",
                },
              ]}
            />
          </div>
        </section>

        <RecipesCatalogSection />

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.ossPanel}>
            <article>
              <SectionLead label="Open Source" title={contribute.title} text={contribute.text} />
              <ul>
                {contribute.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{contribute.note}</p>
              <ActionsRow
                actions={[
                  {
                    label: "Contributing guide",
                    to: contributingUrl,
                    variant: "secondary",
                    eventName: "contributing_clicked_from_home",
                  },
                ]}
              />
            </article>
            <article>
              <SectionLead label="Trust" title={security.title} text={security.text} />
              <ActionsRow
                actions={[
                  {
                    label: "Security policy",
                    to: securityUrl,
                    variant: "secondary",
                    eventName: "security_clicked_from_home",
                  },
                ]}
              />
            </article>
            <article>
              <SectionLead label="Direction" title={roadmap.title} text={roadmap.text} />
              <ActionsRow
                actions={[
                  {
                    label: "Roadmap",
                    to: roadmapUrl,
                    variant: "secondary",
                    eventName: "roadmap_clicked_from_home",
                  },
                ]}
              />
            </article>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.shell}>
            <h2>{closing.title}</h2>
            <p>{closing.text}</p>
            <StarCta
              eventName="github_star_footer_clicked"
              text="Help make AI work reviewable in Git:"
            />
            <CopyCommand
              command={installCommand}
              label={installCommand}
              eventName="copy_install_clicked"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
