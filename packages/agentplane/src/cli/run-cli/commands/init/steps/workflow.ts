import type { WorkflowMode } from "../../../../../agents/agents-template.js";
import type { InitDefaults, InitFlags } from "../model.js";
import { INIT_DEFAULTS } from "../presets.js";

import { selectStepValue } from "./prompt-utils.js";
import type { InitSetupProfileMode, InitPromptClack, WorkflowStepAnswers } from "./contracts.js";

type DirectCloseDirtyPolicyChoice = "allow-other-task-readmes" | "strict";

const workflowOptions: { value: WorkflowMode; label: string; hint: string }[] = [
  { value: "direct", label: "Direct", hint: "One checkout; task lifecycle runs in place." },
  { value: "branch_pr", label: "Branch PR", hint: "Worktree and PR-first task lifecycle." },
];

const directCloseDirtyPolicyOptions: {
  value: DirectCloseDirtyPolicyChoice;
  label: string;
  hint: string;
}[] = [
  {
    value: "allow-other-task-readmes",
    label: "Allow other task READMEs",
    hint: "Ignore only README updates for other active tasks.",
  },
  { value: "strict", label: "Strict", hint: "Block on any unrelated tracked change." },
];

function directCloseDirtyPolicyToChoice(
  policy: NonNullable<InitFlags["directCloseDirtyPolicy"]>,
): DirectCloseDirtyPolicyChoice {
  return policy === "strict" ? "strict" : "allow-other-task-readmes";
}

function directCloseDirtyChoiceToPolicy(
  choice: DirectCloseDirtyPolicyChoice,
): NonNullable<InitFlags["directCloseDirtyPolicy"]> {
  return choice === "strict" ? "strict" : "allow_other_task_readmes";
}

export async function promptWorkflowStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "workflow" | "directCloseDirtyPolicy">;
  setupProfileMode: InitSetupProfileMode;
  defaults?: Pick<InitDefaults, "workflow" | "directCloseDirtyPolicy">;
}): Promise<WorkflowStepAnswers> {
  const defaults = opts.defaults ?? INIT_DEFAULTS;
  const workflow =
    opts.flags.workflow ??
    (opts.setupProfileMode === "full"
      ? await selectStepValue(opts.clack, {
          message: "Workflow mode",
          options: workflowOptions,
          initialValue: defaults.workflow,
          cancelMessage: "Workflow selection cancelled.",
        })
      : defaults.workflow);

  if (workflow !== "direct") {
    return {
      workflow,
      directCloseDirtyPolicy: opts.flags.directCloseDirtyPolicy ?? defaults.directCloseDirtyPolicy,
    };
  }

  const directCloseDirtyPolicy =
    opts.flags.directCloseDirtyPolicy ??
    (opts.setupProfileMode === "full"
      ? directCloseDirtyChoiceToPolicy(
          await selectStepValue(opts.clack, {
            message: "Direct close dirt policy",
            options: directCloseDirtyPolicyOptions,
            initialValue: directCloseDirtyPolicyToChoice(defaults.directCloseDirtyPolicy),
            cancelMessage: "Direct close dirt policy selection cancelled.",
          }),
        )
      : defaults.directCloseDirtyPolicy);

  return { workflow, directCloseDirtyPolicy };
}
