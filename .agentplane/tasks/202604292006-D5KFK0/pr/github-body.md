## Summary

Harden incident findings and release evidence diagnostics

Finish the interrupted incident findings hardening scope: prevent successful closure notes from being promoted as incidents, add scoped release/hosted-close evidence audit support, preserve the active incident registry against current main, and add regression coverage for release-mode git config pollution diagnostics.

## Scope

- In scope: Finish the interrupted incident findings hardening scope: prevent successful closure notes from being promoted as incidents, add scoped release/hosted-close evidence audit support, preserve the active incident registry against current main, and add regression coverage for release-mode git config pollution diagnostics.
- Out of scope: unrelated refactors not required for "Harden incident findings and release evidence diagnostics".

## Verification

- State: ok
- Note: Incident findings hardening and release evidence diagnostics are implemented; declared verification passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-29T20:10:27.281Z
- Branch: task/202604292006-D5KFK0/incident-findings-hardening
- Head: 638426d5bbaa

```text
 .agentplane/policy/incidents.md                    |  24 +----
 docs/developer/incident-archive.mdx                |   8 ++
 packages/agentplane/assets/policy/incidents.md     |  24 +----
 .../agentplane/src/cli/run-cli.core.hooks.test.ts  |  34 ++++++
 .../agentplane/src/commands/hooks/run.pre-push.ts  |  13 +++
 .../release/release-task-evidence-script.test.ts   |  87 ++++++++++++++--
 .../src/runtime/incidents/plan-strategy.ts         |  44 ++++++--
 .../src/runtime/incidents/resolve.test.ts          |  32 +++++-
 packages/agentplane/src/runtime/incidents/types.ts |   2 +-
 scripts/release-task-evidence.mjs                  | 115 ++++++++++++++++++++-
 scripts/run-pre-push-hook.mjs                      |  21 ++++
 11 files changed, 341 insertions(+), 63 deletions(-)
```

</details>
