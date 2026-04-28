## Summary

Consolidate freshness and sync script helpers

Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.

## Scope

- In scope: Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.
- Out of scope: unrelated refactors not required for "Consolidate freshness and sync script helpers".

## Verification

- State: ok
- Note: Command: bun run docs:scripts:check; Result: pass. Command: bun run schemas:check; Result: pass. Command: bun run agents:check; Result: pass. Command: git diff --check; Result: pass. Scope: scripts README check/generate now reuses shared generated text artifact helpers; existing schema and agent sync checks remain green.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-28T07:01:12.107Z
- Branch: task/202604270855-5AVFXS/freshness-sync-helpers
- Head: 6b2e7a46fc11

```text
 scripts/generate-scripts-readme.mjs | 28 ++++++++++++++++------------
 scripts/lib/generated-artifacts.mjs | 22 +++++++++++++++++++++-
 2 files changed, 37 insertions(+), 13 deletions(-)
```

</details>
