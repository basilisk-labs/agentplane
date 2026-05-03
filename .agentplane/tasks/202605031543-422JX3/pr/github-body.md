Task: `202605031543-422JX3`
Title: Auto-bootstrap stale framework CLI for diagnostics

## Summary

Auto-bootstrap stale framework CLI for diagnostics

Make framework-checkout stale runtime handling rebuild or stop instead of returning stale config for diagnostic commands.

## Scope

- In scope: Make framework-checkout stale runtime handling rebuild or stop instead of returning stale config for diagnostic commands.
- Out of scope: unrelated refactors not required for "Auto-bootstrap stale framework CLI for diagnostics".

## Verification

- State: ok
- Note: Verified: stale framework CLI diagnostics now auto-bootstrap before rerun; WORKFLOW.md-only bootstrap root detection works; targeted tests, routing, doctor, eslint, and diff check passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-03T15:56:35.667Z
- Branch: task/202605031543-422JX3/stale-cli-autobootstrap
- Head: 0fd7fdecc1f6

```text
 packages/agentplane/bin/agentplane.js              |  95 ++++++++++++++++++-
 .../src/cli/bootstrap-framework-dev-script.test.ts |  18 ++++
 .../agentplane/src/cli/stale-dist-readonly.test.ts | 103 +++++++++++++++++++++
 scripts/bootstrap-framework-dev.mjs                |   5 +-
 4 files changed, 219 insertions(+), 2 deletions(-)
```

</details>
