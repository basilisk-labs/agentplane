Task: `202609142329-DN50HH`
Title: Release AgentPlane 0.6.30 from the 0.6 maintenance branch
Canonical task record: `.agentplane/tasks/202609142329-DN50HH/README.md`

## Summary

Release AgentPlane 0.6.30 from exact maintenance base 9001433ac67aa2973b6e3323de041216864eed61. Do not modify main. Include the install-layout guard from PR #5958 and its active-runtime correction from PR #5959.

## Scope

- In scope: rebase and qualify the prepared 0.6.30 candidate on exact maintenance SHA 9001433ac67aa2973b6e3323de041216864eed61, merge only to codex/release-v0.6.27-reclaim-fix, publish from the exact merged SHA, and verify all required channels.
- Out of scope: main and unrelated refactors.

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-16T21:07:56.022Z
- Branch: task/202609142329-DN50HH/release-agentplane-0-6-30-from-the-0-6-maintenan
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   3 +-
 .agentplane/workflows/last-known-good.md           |   3 +-
 bun.lock                                           |  12 ++++----
 docs/assets/header.svg                             |   4 +--
 docs/assets/readme-headers/adr.svg                 |   4 +--
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +--
 docs/assets/readme-headers/agentplane.svg          |   4 +--
 docs/assets/readme-headers/core.svg                |   4 +--
 docs/assets/readme-headers/docs.svg                |   4 +--
 docs/assets/readme-headers/humanizer.svg           |   4 +--
 docs/assets/readme-headers/recipes.svg             |   4 +--
 docs/assets/readme-headers/releases.svg            |   4 +--
 docs/assets/readme-headers/schemas.svg             |   4 +--
 docs/assets/readme-headers/scripts.svg             |   4 +--
 docs/assets/readme-headers/skills.svg              |   4 +--
 docs/assets/readme-headers/spec.svg                |   4 +--
 docs/assets/readme-headers/testkit.svg             |   4 +--
 docs/reference/generated-reference.mdx             |   6 ++--
 docs/releases/v0.6.30.md                           |  34 +++++++++++++++++++++
 packages/agentplane/package.json                   |   6 ++--
 .../run-cli.core.hooks.pre-push-full-fast.test.ts  |   8 ++---
 .../src/cli/run-cli.core.incidents.test.ts         |   4 +--
 .../cli/run-cli.core.task-hosted-close-pr.test.ts  |   1 +
 .../src/cli/run-cli.core.task-hosted-close.test.ts |   1 +
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +--
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.30.png    | Bin 0 -> 54283 bytes
 website/static/img/social/manifest.json            |   8 +++++
 31 files changed, 100 insertions(+), 54 deletions(-)
```

</details>
