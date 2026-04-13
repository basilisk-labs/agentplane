## Summary

Make release apply branch_pr-aware for protected-main publish

When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.

## Scope

- In scope: When release apply runs with --push on a non-base branch in branch_pr mode, publish the release candidate by pushing the current task branch without creating or pushing a local release tag, and record that final publish is deferred to the main-driven workflow after merge.
- Out of scope: unrelated refactors not required for "Make release apply branch_pr-aware for protected-main publish".

## Verification

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/commands/release/apply.test.ts --hookTimeout 60000 --testTimeout 60000; bunx prettier --check packages/agentplane/src/commands/pr/internal/sync.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts .agentplane/tasks/202604130750-E2J835/README.md .agentplane/tasks/202604130750-E2J835/pr/diffstat.txt .agentplane/tasks/202604130750-E2J835/pr/github-body.md .agentplane/tasks/202604130750-E2J835/pr/meta.json .agentplane/tasks/202604130750-E2J835/pr/review.md; bun run framework:dev:bootstrap; agentplane pr update 202604130750-E2J835 | Result: pass | Evidence: 63/63 tests passed; targeted prettier check passed; repo-local runtime rebuilt cleanly; E2J835 pr artifacts regenerated without merged-stack refs from 7SRWEX/RRD2AC/M4MN2S/S42Z30 | Scope: packages/agentplane/src/commands/pr/internal/sync.ts, packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts, .agentplane/tasks/202604130750-E2J835/**
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-13T11:48:56.228Z
- Branch: task/202604130750-E2J835/release-apply-branch-pr-safe
- Head: 053e1a2fad04

```text
 .agentplane/tasks/202604130750-E2J835/README.md    | 142 ++++++++++++++++
 .../src/commands/release/apply.command.ts          | 151 +++++++++++++++--
 .../src/commands/release/apply.reporting.ts        |  26 ++-
 .../agentplane/src/commands/release/apply.test.ts  | 187 +++++++++++++++++++++
 .../agentplane/src/commands/release/apply.types.ts |  12 +-
 5 files changed, 495 insertions(+), 23 deletions(-)
```

</details>
