Task: `202608040031-4XD57R`
Title: Attribute and remove redundant Git observations from direct supervisor preparation
Canonical task record: `.agentplane/tasks/202608040031-4XD57R/README.md`

## Summary

Attribute and remove redundant Git observations from direct supervisor preparation

Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.

## Scope

- In scope: Extend the packed supervisor benchmark with deterministic per-command Git histograms, use those measurements to identify and remove only duplicated direct-workflow observations whose values are already covered by the same command context or route snapshot, preserve all stale-state and side-effect-safety invariants, and restore every cold and warm median and p95 surface below the unchanged +10% v0.6.26 ceiling.
- Out of scope: unrelated refactors not required for "Attribute and remove redundant Git observations from direct supervisor preparation".

## Verification

- State: ok
- Note:

```text
Verified committed sync head a53d59cbb: current-main flake fix plus unchanged measured performance
implementation pass focused token-usage, qualification contract, critical CLI 79/79, TS7 typecheck,
lint/format, policy routing, and doctor. Preserved 20-cold/30-warm evidence remains bound to exact
product SHA 3a526415.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-04T00:32:36.930Z
- Branch: task/202608040031-4XD57R/attribute-and-remove-redundant-git-observations
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/workflow-step-fingerprint.ts   | 49 +++++++++++-----------
 .../shared/workflow-step-policy-scope.test.ts      | 32 ++++++++++++++
 .../commands/shared/workflow-step-policy-scope.ts  |  5 ++-
 .../measure-v0.7.1-supervisor-latency.mjs          | 40 ++++++++++++++++++
 .../qualification/release-qualification.test.mjs   | 47 ++++++++++++++++++++-
 5 files changed, 146 insertions(+), 27 deletions(-)
```

</details>
