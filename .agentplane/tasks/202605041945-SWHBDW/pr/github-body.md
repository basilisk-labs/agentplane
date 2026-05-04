Task: `202605041945-SWHBDW`
Title: Expand blueprint implementation specification

## Summary

Expand blueprint implementation specification

Expand docs/developer/blueprints.mdx with implementation-ready references, v0 module plan, validation invariants, resolver contract, test matrix, and rollout sequence.

## Scope

- In scope: Expand docs/developer/blueprints.mdx with implementation-ready references, v0 module plan, validation invariants, resolver contract, test matrix, and rollout sequence.
- Out of scope: unrelated refactors not required for "Expand blueprint implementation specification".

## Verification

- State: ok
- Note: Docs updated and verified. Checks passed: node .agentplane/policy/check-routing.mjs; agentplane doctor; bun run docs:ia:check; bun run format:check -- docs/developer/blueprints.mdx; git diff --check. Doctor still reports an unrelated existing warning for two shipped branch_pr tasks on base branch.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T19:59:03.637Z
- Branch: task/202605041945-SWHBDW/blueprint-implementation-spec
- Head: de2a586b3550

```text
 .agentplane/policy/check-routing.mjs           |  46 +-
 .agentplane/policy/incidents.md                |   1 +
 docs/developer/blueprints.mdx                  | 636 +++++++++++++++++++++----
 packages/agentplane/assets/policy/incidents.md |   1 +
 4 files changed, 580 insertions(+), 104 deletions(-)
```

</details>
