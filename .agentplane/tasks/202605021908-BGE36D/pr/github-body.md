Task: `202605021908-BGE36D`
Title: Define managed recipe materialization contract

## Related Tasks

- Primary: `202605021908-BGE36D`
- Included: `202605021909-2GJ5SR`
- Included: `202605021909-4V65QP`
- Included: `202605021909-XANHF2`
- Included: `202605021926-0H15MJ`

## Summary

Define managed recipe materialization contract

Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.

## Scope

- In scope: Document the target behavior for recipe activation: managed prompt source files are changed only by AgentPlane, recipe registry records active recipes, prompt graph is a diagnostic index, and gateway.user.instructions is the human-editable extension point.
- Out of scope: unrelated refactors not required for "Define managed recipe materialization contract".

## Verification

- State: ok
- Note: Verified batch implementation after related task evidence commit. Evidence: policy routing OK; targeted prompt/pr/schema tests passed; git diff --check passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T19:39:18.473Z
- Branch: task/202605021908-BGE36D/managed-recipe-materialization
- Head: 0cb4247d3998

```text
 .agentplane/policy/workflow.branch_pr.md           |  18 +++
 .agentplane/tasks/202605021909-2GJ5SR/README.md    | 145 ++++++++++++++++++++
 .agentplane/tasks/202605021909-4V65QP/README.md    | 145 ++++++++++++++++++++
 .agentplane/tasks/202605021909-XANHF2/README.md    | 145 ++++++++++++++++++++
 .agentplane/tasks/202605021926-0H15MJ/README.md    | 149 +++++++++++++++++++++
 docs/developer/modular-prompt-assembly.mdx         |  17 +++
 docs/developer/recipes-how-it-works.mdx            |  17 +++
 docs/developer/recipes-spec.mdx                    |   6 +
 packages/agentplane/assets/AGENTS.md               |   8 +-
 .../agentplane/assets/policy/workflow.branch_pr.md |  18 +++
 .../src/commands/pr/internal/review-template.ts    |  16 +++
 .../src/commands/pr/internal/sync-model.ts         |   1 +
 .../src/commands/pr/internal/sync-open-step.ts     |   4 +
 .../src/commands/pr/internal/sync-update-step.ts   |   3 +
 .../agentplane/src/commands/pr/internal/sync.ts    |  16 +++
 packages/agentplane/src/commands/pr/open.ts        |   3 +
 packages/agentplane/src/commands/pr/pr.command.ts  |   2 +
 packages/agentplane/src/commands/pr/pr.spec.ts     |  33 ++++-
 packages/agentplane/src/commands/pr/update.ts      |   2 +
 .../recipes/impl/managed-prompt-sources.ts         |  88 ++++++++++++
 .../src/commands/recipes/impl/overlay-publish.ts   |   9 ++
 packages/agentplane/src/commands/shared/pr-meta.ts |  26 ++++
 .../src/runner/context/base-prompt-sources.ts      |  17 +++
 .../agentplane/src/runner/context/base-prompts.ts  |   2 +
 .../src/runner/context/prompt-block-shared.ts      |   1 +
 .../src/runner/context/prompt-module-bridge.ts     |   5 +-
 packages/core/schemas/pr-meta.schema.json          |   7 +
 .../src/tasks/task-artifact-schema.pr-metadata.ts  |   1 +
 packages/spec/schemas/pr-meta.schema.json          |   7 +
 29 files changed, 903 insertions(+), 8 deletions(-)
```

</details>
