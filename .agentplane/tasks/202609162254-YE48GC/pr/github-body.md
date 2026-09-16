Task: `202609162254-YE48GC`
Title: Implement and qualify AgentPlane 0.7.10 Blueprint retirement
Canonical task record: `.agentplane/tasks/202609162254-YE48GC/README.md`

## Summary

Implement and qualify AgentPlane 0.7.10 Blueprint retirement

Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.

## Scope

- In scope: Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.10 Blueprint retirement".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-16T23:02:04.476Z
- Branch: task/202609162254-YE48GC/implement-and-qualify-agentplane-0-7-10-blueprin
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                    |  81 ++-
 scripts/checks/blueprint-retirement-map.json     | 796 +++++++++++++++++++++++
 scripts/checks/blueprint-retirement-map.test.mjs | 203 ++++++
 scripts/generate/render-ghcr-image-metadata.mjs  |  19 +-
 scripts/release/manifest.mjs                     |  30 +
 scripts/release/stable-channel-policy.mjs        | 127 ++++
 scripts/release/stable-channel-policy.test.mjs   |  77 +++
 7 files changed, 1314 insertions(+), 19 deletions(-)
```

</details>
