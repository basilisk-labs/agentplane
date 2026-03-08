import { setMarkdownSection } from "@agentplaneorg/core";

export const TASK_DOC_VERSION_V3 = 3;

function buildDefaultSummary(opts: { title: string; description: string }): string {
  return `${opts.title}\n\n${opts.description}`;
}

function buildDefaultScope(opts: { title: string; description: string }): string {
  return [
    `- In scope: ${opts.description}.`,
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
