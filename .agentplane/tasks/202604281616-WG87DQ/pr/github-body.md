## Summary

Harden branch_pr close and verification reconciliation

Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.

## Scope

- In scope: Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.
- Out of scope: unrelated refactors not required for "Harden branch_pr close and verification reconciliation".

## Verification

- State: ok
- Note: Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; Result: pass; Evidence: 12 pass, 0 fail, including dirty PR fast-fail. Scope: remote check watcher. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts; Result: pass; Evidence: 4 pass, 0 fail, including remote merged close PR duplicate skip. Scope: hosted-close-pr lifecycle. Command: bun x prettier --check <changed files>; Result: pass. Scope: formatting. Command: bun x eslint <changed files>; Result: pass. Scope: changed script/source/test files. Command: bun run typecheck; Result: pass; Evidence: tsc -b. Scope: workspace types. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime 0.3.29 matches expected. Scope: framework dev runtime. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T16:17:24.671Z
- Branch: task/202604281616-WG87DQ/close-verification-reconcile
- Head: aa15db323eda

```text
No changes detected.
```

</details>
