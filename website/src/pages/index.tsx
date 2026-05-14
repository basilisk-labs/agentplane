import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import {
  docsUrl,
  githubUrl,
  homepageContent,
  installCommand,
  recipesIndexUrl,
} from "../data/homepage-content";
import styles from "./_home.module.css";

type ButtonVariant = "primary" | "secondary" | "copy";

type Action = {
  label: string;
  variant: ButtonVariant;
  to?: string;
  command?: string;
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
}: {
  command: string;
  label?: string;
  className?: string;
}): ReactNode {
  const copyCommand = (event: unknown) => {
    const { currentTarget: button } = event as { currentTarget: HTMLButtonElement };

    void copyTextToClipboard(command).then(() => {
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
      <CopyCommand command={action.command} label={action.label} className={styles.actionCopy} />
    );
  }

  const className =
    action.variant === "primary"
      ? `${styles.action} ${styles.actionPrimary}`
      : `${styles.action} ${styles.actionSecondary}`;

  return (
    <Link className={className} to={action.to ?? "/"}>
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
            </span>
          ))}
          <span className={styles.terminalCursor} aria-hidden="true" />
        </code>
      </pre>
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

function WorkflowCard({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}): ReactNode {
  return (
    <article className={styles.workflowCard}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function FileTree({ lines }: { lines: readonly string[] }): ReactNode {
  return (
    <pre className={styles.fileTree} aria-label="AgentPlane repository artifact tree">
      <code>{lines.join("\n")}</code>
    </pre>
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
  const sorted = versions.toSorted((left, right) => compareVersions(left.version, right.version));
  return sorted[0]?.version ?? null;
}

function buildInstallCommand(recipe: RecipeEntry): string {
  return `agentplane recipes install ${recipe.id} --index ${recipesIndexUrl} --refresh --yes`;
}

function RecipeCard({ recipe }: { recipe: RecipeEntry }): ReactNode {
  const latest = latestVersion(recipe);
  const installCommand = buildInstallCommand(recipe);

  return (
    <article className={styles.recipeCard}>
      <h3>{recipe.id}</h3>
      <p className={styles.recipeDescription}>{recipe.description}</p>
      <p>{recipe.summary}</p>
      <div className={styles.recipeMeta}>
        <span>{latest ? `latest: ${latest}` : "version: n/a"}</span>
      </div>
      <CopyCommand command={installCommand} label="Install" className={styles.recipeAction} />
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
  }, [state, recipes, errorMessage]);

  return (
    <section className={`${styles.section} ${styles.shell}`}>
      <SectionLead label="Recipes" title={recipesCatalog.title} text={recipesCatalog.text} />
      <p className={styles.sectionLeadText}>{recipesCatalog.stepText}</p>
      {content}
    </section>
  );
}

function NextStepCard({
  item,
}: {
  item: (typeof homepageContent.nextSteps.items)[number];
}): ReactNode {
  const featured = "featured" in item && item.featured;

  return (
    <article className={`${styles.nextStepCard}${featured ? ` ${styles.nextStepFeatured}` : ""}`}>
      <div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
      <Link to={item.to}>{item.action}</Link>
    </article>
  );
}

export default function Home(): ReactNode {
  const {
    seo,
    hero,
    problem,
    demo,
    comparison,
    workflow,
    artifacts,
    acr,
    context,
    whyNow,
    nextSteps,
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
                <p className={styles.flowLine}>{hero.flow}</p>
                <ActionsRow
                  actions={[
                    { label: "Generate your first ACR", to: acr.action.to, variant: "primary" },
                    { label: "View on GitHub", to: githubUrl, variant: "secondary" },
                    { label: installCommand, command: installCommand, variant: "copy" },
                  ]}
                />
                <ul className={styles.assuranceList}>
                  {hero.assurances.map((assurance) => (
                    <li key={assurance}>{assurance}</li>
                  ))}
                </ul>
              </article>

              <img
                className={styles.heroDemo}
                src="/img/agentplane-demo.gif"
                alt="AgentPlane CLI demo showing task evidence and ACR generation"
              />
            </div>
          </div>
        </section>

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

        <section className={`${styles.section} ${styles.demoSection}`}>
          <div className={styles.shell}>
            <SectionLead label="Demo / proof" title={demo.title} text={demo.text} />
            <div className={styles.demoGrid}>
              <TerminalPreview title={demo.terminal.title} lines={demo.terminal.lines} />
              <div className={styles.demoAside}>
                <span className={styles.sectionLabel}>Try it locally</span>
                <pre aria-label="AgentPlane local try commands">
                  <code>{demo.tryCommands.join("\n")}</code>
                </pre>
                <Link className={`${styles.action} ${styles.actionPrimary}`} to={githubUrl}>
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>

        <RecipesCatalogSection />

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Comparison" title={comparison.title} text={comparison.text} />
          <div className={styles.comparisonList}>
            {comparison.rows.map((row) => (
              <article key={row.label} className={styles.comparisonRow}>
                <h3>{row.label}</h3>
                <p>{row.value}</p>
              </article>
            ))}
          </div>
          <Link className={`${styles.action} ${styles.actionSecondary}`} to={comparison.action.to}>
            {comparison.action.label}
          </Link>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Core workflow" title={workflow.title} text={workflow.text} />
          <div className={styles.workflowGrid}>
            {workflow.items.map((item, index) => (
              <WorkflowCard key={item.title} title={item.title} text={item.text} index={index} />
            ))}
          </div>
          <p className={styles.workflowNote}>{workflow.note}</p>
        </section>

        <section className={`${styles.section} ${styles.artifactSection}`}>
          <div className={styles.shell}>
            <div className={styles.artifactGrid}>
              <FileTree lines={artifacts.tree} />
              <div className={styles.artifactCopy}>
                <SectionLead
                  label="Repo-local artifacts"
                  title={artifacts.title}
                  text={artifacts.text}
                />
                <ul className={styles.artifactBullets}>
                  {artifacts.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <Link className={`${styles.action} ${styles.actionSecondary}`} to={docsUrl}>
                  Read the docs
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Agent Change Record" title={acr.title} text={acr.text} />
          <div className={styles.demoGrid}>
            <TerminalPreview title={acr.terminal.title} lines={acr.terminal.lines} compact />
            <div className={styles.demoAside}>
              <span className={styles.sectionLabel}>Review path</span>
              <p>
                Humans read `acr explain`. CI reads `acr check`. External tools read `acr.json`.
              </p>
              <Link className={`${styles.action} ${styles.actionPrimary}`} to={acr.action.to}>
                {acr.action.label}
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Context management" title={context.title} text={context.text} />
          <div className={styles.demoGrid}>
            <TerminalPreview
              title={context.terminal.title}
              lines={context.terminal.lines}
              compact
            />
            <div className={styles.demoAside}>
              <span className={styles.sectionLabel}>Repo-owned memory</span>
              <ul className={styles.artifactBullets}>
                {context.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link className={`${styles.action} ${styles.actionPrimary}`} to={context.action.to}>
                {context.action.label}
              </Link>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.whyNowSection}`}>
          <div className={styles.shell}>
            <SectionLead label="Why now" title={whyNow.title} text={whyNow.text} />
            <Link className={`${styles.action} ${styles.actionPrimary}`} to={whyNow.action.to}>
              {whyNow.action.label}
            </Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label="Docs paths" title={nextSteps.title} />
          <div className={styles.nextStepsGrid}>
            {nextSteps.items.map((item) => (
              <NextStepCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.shell}>
            <h2>{closing.title}</h2>
            <CopyCommand command={installCommand} />
            <ActionsRow
              actions={[
                { label: "View on GitHub", to: githubUrl, variant: "primary" },
                { label: "Read the docs", to: docsUrl, variant: "secondary" },
              ]}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
