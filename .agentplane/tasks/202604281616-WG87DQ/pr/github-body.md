## Summary

Harden branch_pr close and verification reconciliation

Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.

## Scope

- In scope: Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.
- Out of scope: unrelated refactors not required for "Harden branch_pr close and verification reconciliation".

## Verification

- State: ok
- Note: Command: git push origin HEAD; Result: pass. Evidence: pre-push fast gate passed after implementation commit b07c53a21661: format, schemas, agent templates, policy routing, release parity, CLI cold-start, build/typecheck/bundles, docs freshness, hotspot baseline, vitest project routing, lint, 245 fast test files with 1419 passed and 2 skipped, plus critical E2E 5 files with 14 passed. Scope: post-commit branch state pushed to PR #560.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T16:41:12.542Z
- Branch: task/202604281616-WG87DQ/close-verification-reconcile
- Head: b07c53a21661

```text
No changes detected.
```

</details>
