Task: `202605131637-33VQFN`
Title: Add local insights report command
Canonical task record: `.agentplane/tasks/202605131637-33VQFN/README.md`

## Summary

Add local insights report command

Implement a local-only agentplane insights report command that summarizes privacy-safe repository and AgentPlane diagnostic state for user-shared support analysis without uploading telemetry.

## Scope

- In scope: Implement a local-only agentplane insights report command that summarizes privacy-safe repository and AgentPlane diagnostic state for user-shared support analysis without uploading telemetry.
- Out of scope: unrelated refactors not required for "Add local insights report command".

## Verification

- State: ok
- Note: Verified: implemented local-only insights report CLI with privacy-bounded payload, generated CLI docs, and targeted command coverage. Checks passed: bun test packages/agentplane/src/cli/run-cli/command-catalog.test.ts packages/agentplane/src/cli/run-cli.core.insights-report.test.ts (8 pass); bun run typecheck; bun run lint:core; bun run format:check; node .agentplane/policy/check-routing.mjs; ap doctor; node packages/agentplane/bin/agentplane.js insights report --json --recent-limit 1. Full bun run lint still fails in unrelated website TypeScript/Docusaurus typing files outside this task scope; core lint passes.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:38:35.527Z
- Branch: task/202605131637-33VQFN/insights-report
- Head: c5f2d3ca04b9

```text
No changes detected.
```

</details>
