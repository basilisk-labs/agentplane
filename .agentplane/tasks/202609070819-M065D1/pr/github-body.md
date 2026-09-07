Task: `202609070819-M065D1`
Title: Keep setup-agentplane installations usable across workflow steps
Canonical task record: `.agentplane/tasks/202609070819-M065D1/README.md`

## Summary

Repair setup-agentplane input handling and installation lifetime, then enable explicit hosted setup-tag recovery for the qualified historical release. Source repair is local; publication and final release evidence remain separately authorized operator work.

## Scope

In scope: scripts/generate/render-setup-agentplane-action.mjs, scripts/release/publish-external-distribution.mjs, .github/workflows/publish.yml, and the three nearest release contract test files named in the structured plan. Preserve normal tag mismatch refusal and all source, signing, npm and release-tag guards. Out of scope: external writes during semantic work, public version changes, unrelated channel changes, and edits to the pending release evidence PR.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T08:23:50.856Z
- Branch: task/202609070819-M065D1/keep-setup-agentplane-installations-usable-acros
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                      |  23 +-
 .../publish-external-distribution-script.test.ts   | 314 +++++++++++++++------
 .../release/publish-workflow-contract.test.ts      |  59 +++-
 ...ender-scoop-and-setup-standalone-script.test.ts | 119 +++++++-
 .../generate/render-setup-agentplane-action.mjs    |  17 +-
 scripts/release/publish-external-distribution.mjs  |  32 ++-
 6 files changed, 451 insertions(+), 113 deletions(-)
```

</details>
