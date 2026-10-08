Task: `202610072154-CZEYZ1`
Title: Build frozen replay anchors with a separately captured isolated dependency closure
Canonical task record: `.agentplane/tasks/202610072154-CZEYZ1/README.md`

## Summary

Build frozen replay anchors with a separately captured isolated dependency closure

Resolve the broader release qualification defect diagnosed in SGYZBH without admitting arbitrary driver lock drift. Frozen source and current driver lock differ; three reachable runtime versions changed. Existing provenance contract docs/internal/v0.7-agent-efficiency-baseline.md records actual installed bytes, lock/workspace graph, resolved edges and platform with before/after checks, not historical cross-platform byte equivalence. Keep strict shared-driver assertAnchorLockCompatible. Add a bounded isolated anchor dependency route using exact frozen lock versions and resolution edges from repository-resident installed packages; reject missing or ambiguous required packages, escapes, and silent driver fallback. Use existing manifest APIs to capture truthful separate anchor closure and recheck bytes/edges before and after build while preserving validated driver dependency_claim and existing HEAD/tree/clean checks. Replace stale current-lock positive fixtures with deterministic approved-delta positives and current unsupported-drift negatives. Exercise real offline entrypoint. No network installs in semantic tests, frozen input or baseline rewriting, unsupported historical equivalence, paid campaign, measured savings or M05 disposition. This supersedes the insufficient Recipes-only approach; preserve SGYZBH failure evidence. User authorizes necessary release repair, mandatory validation, independent review and main integration.

## Scope

- In scope: Resolve the broader release qualification defect diagnosed in SGYZBH without admitting arbitrary driver lock drift. Frozen source and current driver lock differ; three reachable runtime versions changed. Existing provenance contract docs/internal/v0.7-agent-efficiency-baseline.md records actual installed bytes, lock/workspace graph, resolved edges and platform with before/after checks, not historical cross-platform byte equivalence. Keep strict shared-driver assertAnchorLockCompatible. Add a bounded isolated anchor dependency route using exact frozen lock versions and resolution edges from repository-resident installed packages; reject missing or ambiguous required packages, escapes, and silent driver fallback. Use existing manifest APIs to capture truthful separate anchor closure and recheck bytes/edges before and after build while preserving validated driver dependency_claim and existing HEAD/tree/clean checks. Replace stale current-lock positive fixtures with deterministic approved-delta positives and current unsupported-drift negatives. Exercise real offline entrypoint. No network installs in semantic tests, frozen input or baseline rewriting, unsupported historical equivalence, paid campaign, measured savings or M05 disposition. This supersedes the insufficient Recipes-only approach; preserve SGYZBH failure evidence. User authorizes necessary release repair, mandatory validation, independent review and main integration.
- Out of scope: unrelated refactors not required for "Build frozen replay anchors with a separately captured isolated dependency closure".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-08T01:34:50.066Z
- Branch: task/202610072154-CZEYZ1/build-frozen-replay-anchors-with-a-separately-ca
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...i.critical.agent-efficiency-anchor-lock.test.ts | 363 ++++++++++++++++++++-
 ...tical.agent-efficiency-replay-hardening.test.ts |  65 ++--
 .../agent-efficiency-anchor-dependencies.mjs       | 340 +++++++++++++++++++
 .../internal/agent-efficiency-anchor-runtime.mjs   |  40 ++-
 4 files changed, 755 insertions(+), 53 deletions(-)
```

</details>
