Task: `202605131632-TDMHEC`
Title: Introduce bounded agentic classification and curation surfaces
Canonical task record: `.agentplane/tasks/202605131632-TDMHEC/README.md`

## Summary

Introduce bounded agentic classification and curation surfaces

Move semantic task intake, incident curation, context harvest extraction, and PR summary guidance behind named one-word agent roles while preserving deterministic validation gates. Remove obsolete upgrade semantic review framing.

## Scope

- In scope: Move semantic task intake, incident curation, context harvest extraction, and PR summary guidance behind named one-word agent roles while preserving deterministic validation gates. Remove obsolete upgrade semantic review framing.
- Out of scope: unrelated refactors not required for "Introduce bounded agentic classification and curation surfaces".

## Verification

- State: ok
- Note: Verified bounded agentic role contracts and deterministic gates. Checks: focused bun tests for blueprints/context harvest/PR template/task scaffolding/upgrade/prompt modules; upgrade merge rerun after formatting; bun run typecheck; bun run agents:check; bun run assets:builtin:check; bun run docs:cli:check; prettier check on touched files with --ignore-unknown; git diff --check; node .agentplane/policy/check-routing.mjs; agentplane doctor.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:33:56.982Z
- Branch: task/202605131632-TDMHEC/agentic-classifiers
- Head: c5f2d3ca04b9

```text
No changes detected.
```

</details>
