## Summary

Publish v0.4.0 release

Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.

## Scope

- In scope: Release the current modular prompt assembly work as v0.4.0 instead of v0.3.30. Prepare the release candidate through the branch_pr route, satisfy release gates, merge to main, wait for hosted Publish to npm, and verify npm, tag, and GitHub Release evidence.
- Out of scope: unrelated refactors not required for "Publish v0.4.0 release".

## Verification

- State: pending
- Note: Not recorded yet.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-30T10:29:26.977Z
- Branch: task/202604300956-6CRM12/v0-4-0-release
- Head: 186c284b3b6f

```text
 docs/releases/v0.4.0.md                            | 156 +++++++
 .../agentplane/src/agents/agents-template.test.ts  |  15 +-
 packages/agentplane/src/agents/agents-template.ts  |   3 +-
 .../src/cli/run-cli.core.hooks.pre-commit.test.ts  | 158 +++++++
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  | 142 ------
 .../src/cli/run-cli/commands/init/write-agents.ts  |   4 +-
 .../src/runtime/prompt-modules/compiler.merge.ts   | 183 ++++++++
 .../src/runtime/prompt-modules/compiler.shared.ts  |  41 ++
 .../src/runtime/prompt-modules/compiler.ts         | 220 +---------
 .../src/runtime/prompt-modules/registry.test.ts    |   3 +-
 scripts/baselines/knip-baseline.json               | 487 ++++++++++++++++-----
 11 files changed, 935 insertions(+), 477 deletions(-)
```

</details>
