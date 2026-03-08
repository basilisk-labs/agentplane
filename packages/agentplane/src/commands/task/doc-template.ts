import { setMarkdownSection } from "@agentplaneorg/core";

export const TASK_DOC_VERSION_V3 = 3;

function normalizeTaskHumanText(text: string): string {
  let next = text.replaceAll("\r\n", "\n");
  const escapedDoubleNewline =
    next.includes(String.raw`\n\n`) || next.includes(String.raw`\r\n\r\n`);
  const escapedNewlineMatches = next.match(/\\n/g) ?? [];
  if (escapedDoubleNewline || escapedNewlineMatches.length >= 2) {
    next = next.replaceAll(String.raw`\r\n`, "\n").replaceAll(String.raw`\n`, "\n");
  }
  return next.trim();
}

function normalizeTaskHumanInlineText(text: string): string {
  return normalizeTaskHumanText(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function ensureTrailingSentence(text: string): string {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function buildDefaultSummary(opts: { title: string; description: string }): string {
  return `${opts.title}\n\n${normalizeTaskHumanText(opts.description)}`;
}

function buildDefaultScope(opts: { title: string; description: string }): string {
  const summary = ensureTrailingSentence(normalizeTaskHumanInlineText(opts.description));
  return [
    `- In scope: ${summary}`,
    `- Out of scope: unrelated refactors not required for "${opts.title}".`,
  ].join("\n");
}

function buildDefaultPlan(opts: { title: string }): string {
  return [
    `1. Implement the change for "${opts.title}".`,
    "2. Run required checks and capture verification evidence.",
    "3. Finalize task findings and finish with traceable commit metadata.",
  ].join("\n");
}

function buildDefaultVerifyStepsTemplate(): string {
  return [
    "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
    "",
    "1. <Action>. Expected: <observable result>.",
    "2. <Action>. Expected: <observable result>.",
    "3. <Action>. Expected: <observable result>.",
  ].join("\n");
}

function buildDefaultVerificationTemplate(): string {
  return ["<!-- BEGIN VERIFICATION RESULTS -->", "<!-- END VERIFICATION RESULTS -->"].join("\n");
}

function buildDefaultRollbackPlan(): string {
  return [
    "- Revert task-related commit(s).",
    "- Re-run required checks to confirm rollback safety.",
  ].join("\n");
}

export function defaultTaskDocV3(opts: { title: string; description: string }): string {
  let body = [
    "## Summary",
    "",
    "## Scope",
    "",
    "## Plan",
    "",
    "## Verify Steps",
    "",
    "## Verification",
    "",
    "## Rollback Plan",
    "",
    "## Findings",
    "",
  ].join("\n");

  body = setMarkdownSection(
    body,
    "Summary",
    buildDefaultSummary({ title: opts.title, description: opts.description }),
  );
  body = setMarkdownSection(
    body,
    "Scope",
    buildDefaultScope({ title: opts.title, description: opts.description }),
  );
  body = setMarkdownSection(body, "Plan", buildDefaultPlan({ title: opts.title }));
  body = setMarkdownSection(body, "Verify Steps", buildDefaultVerifyStepsTemplate());
  body = setMarkdownSection(body, "Verification", buildDefaultVerificationTemplate());
  body = setMarkdownSection(body, "Rollback Plan", buildDefaultRollbackPlan());
  body = setMarkdownSection(body, "Findings", "");
  return body;
}

export function buildDefaultVerifyStepsSection(opts: {
  primary: string;
  verifyCommands: string[];
}): string {
  const commandSteps =
    opts.verifyCommands.length > 0
      ? opts.verifyCommands.map(
          (command, index) =>
            `${index + 1}. Run \`${command}\`. Expected: it succeeds and confirms the requested outcome for this task.`,
        )
      : [];
  const genericSteps = [
    `Review the changed artifact or behavior for the \`${opts.primary}\` task. Expected: the requested outcome is visible and matches the approved scope.`,
    "Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.",
  ];

  if (commandSteps.length === 0) {
    return [
      "<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->",
      "",
      "1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.",
      "2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.",
      "3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.",
    ].join("\n");
  }

  return [
    ...commandSteps,
    ...genericSteps.map((step, index) => `${commandSteps.length + index + 1}. ${step}`),
  ].join("\n");
}
