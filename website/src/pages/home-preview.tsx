import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { homepageContent } from "../data/homepage-content";
import styles from "./home-preview.module.css";

type Action = {
  label: string;
  to: string;
  variant: "primary" | "secondary";
};

function ActionLink({ action }: { action: Action }): ReactNode {
  const className =
    action.variant === "primary"
      ? `${styles.action} ${styles.actionPrimary}`
      : `${styles.action} ${styles.actionSecondary}`;

  return (
    <Link className={className} to={action.to}>
      {action.label}
    </Link>
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

export default function HomePreview(): ReactNode {
  const {
    seo,
    hero,
    contrast,
    repositorySurface,
    controlModel,
    workflowModes,
    docsRail,
    journal,
    closing,
  } = homepageContent;

  return (
    <Layout title={seo.title} description={seo.description}>
      <main className={styles.page}>
        <div className={styles.pageGlow} aria-hidden="true" />
        <div className={styles.pageNoise} aria-hidden="true" />

        <section className={`${styles.hero} ${styles.shell}`}>
          <div className={styles.heroCopy}>
            <div className={styles.brandRow}>
              <span className={styles.heroEyebrow}>{hero.eyebrow}</span>
              <img className={styles.wordmark} src="/img/agentplane.svg" alt="AgentPlane" />
            </div>

            <div className={styles.heroChips}>
              {hero.chips.map((chip) => (
                <span key={chip} className={styles.heroChip}>
                  {chip}
                </span>
              ))}
            </div>

            <h1>{hero.title}</h1>
            <p className={styles.heroSubtitle}>{hero.subtitle}</p>

            <div className={styles.heroSupporting}>
              {hero.supportingCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className={styles.actionsRow}>
              {hero.actions.map((action) => (
                <ActionLink key={action.label} action={action} />
              ))}
            </div>
          </div>

          <div className={styles.heroVisual}>
            <article className={`${styles.commandCard} grid-paper`}>
              <div className={styles.commandBar}>
                <span />
                <span />
                <span />
              </div>
              <p className={styles.commandLabel}>{hero.commandWindow.title}</p>
              <pre className={styles.commandPre} aria-label="AgentPlane first controlled loop">
                <code>
                  {hero.commandWindow.lines.map((line) => (
                    <span key={line} className={styles.commandLine}>
                      <span className={styles.commandPrompt}>$</span>
                      {line}
                    </span>
                  ))}
                </code>
              </pre>
            </article>

            <div className={styles.proofGrid}>
              {hero.proofCards.map((card) => (
                <article key={card.label} className={styles.proofCard}>
                  <span className={styles.proofLabel}>{card.label}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={contrast.label} title={contrast.title} text={contrast.text} />

          <div className={styles.compareGrid}>
            <article className={`${styles.compareCard} ${styles.compareCardMuted}`}>
              <span className={styles.compareLabel}>{contrast.beforeTitle}</span>
              <ul className={styles.compareList}>
                {contrast.before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={`${styles.compareCard} ${styles.compareCardAccent}`}>
              <span className={styles.compareLabel}>{contrast.afterTitle}</span>
              <ul className={styles.compareList}>
                {contrast.after.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <div className={styles.stickyLeadWrap}>
            <SectionLead
              label="Operator surface"
              title="Read the product through state, files, and integration choices."
              text="Switch views instead of scanning three separate sections. The same repository story is exposed as artifacts, lifecycle, and workflow mode."
            />
          </div>

          <div className={styles.tabsBlock}>
            <Tabs
              className={styles.previewTabs}
              defaultValue="repository"
              groupId="home-preview-surface"
            >
              <TabItem value="repository" label={repositorySurface.label}>
                <div className={styles.tabPanel}>
                  <article className={`${styles.surfaceTreeCard} ${styles.surfaceCard}`}>
                    <div className={styles.cardChrome}>
                      <span className={styles.cardKicker}>Repository preview</span>
                      <h3>{repositorySurface.title}</h3>
                      <p>{repositorySurface.intro}</p>
                      <pre className={styles.treePre} aria-label="Repository structure preview">
                        <code>
                          {repositorySurface.tree.map((line) => (
                            <span key={line} className={styles.treeLine}>
                              {line}
                            </span>
                          ))}
                        </code>
                      </pre>
                    </div>
                  </article>

                  <div className={styles.surfaceList}>
                    {repositorySurface.items.map((item) => (
                      <article key={item.name} className={styles.surfaceCard}>
                        <div className={styles.cardChrome}>
                          <span className={styles.cardKicker}>{item.path}</span>
                          <h3>{item.name}</h3>
                          <p>{item.text}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </TabItem>

              <TabItem value="control" label={controlModel.label}>
                <div className={styles.tabPanel}>
                  <article className={styles.panelIntroCard}>
                    <span className={styles.cardKicker}>Lifecycle map</span>
                    <h3>{controlModel.title}</h3>
                    <p>{controlModel.text}</p>
                  </article>

                  <ol className={styles.timeline}>
                    {controlModel.steps.map((step, index) => (
                      <li key={step.name} className={styles.timelineItem}>
                        <span className={styles.timelineIndex}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className={styles.timelineContent}>
                          <h3>{step.name}</h3>
                          <p>{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </TabItem>

              <TabItem value="modes" label={workflowModes.label}>
                <div className={styles.tabPanel}>
                  <article className={styles.panelIntroCard}>
                    <span className={styles.cardKicker}>Mode selection</span>
                    <h3>{workflowModes.title}</h3>
                    <p>Pick the workflow by integration discipline, not by product tier.</p>
                  </article>

                  <div className={styles.modeGrid}>
                    {workflowModes.items.map((mode) => (
                      <article key={mode.name} className={styles.modeCard}>
                        <span className={styles.modeBadge}>{mode.badge}</span>
                        <h3>{mode.name}</h3>
                        <p>{mode.text}</p>
                        <ul className={styles.modeList}>
                          {mode.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </TabItem>
            </Tabs>
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={docsRail.label} title={docsRail.title} />

          <div className={styles.docsGrid}>
            {docsRail.groups.map((group) => (
              <article key={group.name} className={styles.docsCard}>
                <h3>{group.name}</h3>
                <div className={styles.docsLinks}>
                  {group.links.map((link) => (
                    <Link key={link.label} className={styles.inlineLink} to={link.to}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.shell}`}>
          <SectionLead label={journal.label} title={journal.title} />

          <div className={styles.journalGrid}>
            {journal.items.map((item) => (
              <Link key={item.name} className={styles.journalCard} to={item.to}>
                <span className={styles.cardKicker}>{item.name}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className={`${styles.shell} ${styles.closingWrap}`}>
          <article className={styles.closingCard}>
            <span className={styles.sectionLabel}>{closing.label}</span>
            <h2>{closing.title}</h2>
            <p>{closing.text}</p>
            <div className={styles.actionsRow}>
              {closing.actions.map((action) => (
                <ActionLink key={action.label} action={action} />
              ))}
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
}
