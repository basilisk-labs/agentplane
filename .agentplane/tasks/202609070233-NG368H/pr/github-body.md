Task: `202609070233-NG368H`
Title: Repair manual release recovery after npm publication
Canonical task record: `.agentplane/tasks/202609070233-NG368H/README.md`

## Summary

Repair manual release recovery after npm publication

Publish release run 34076162150 published the 0.7.8 npm packages from exact qualified SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5, then stopped because npm was still processing core and CLI. The existing detect condition skips the entire publish job when all three npm versions exist, which prevents recovery of missing GHCR, tag, GitHub Release and external distribution steps. Make explicit workflow_dispatch recovery continue after exact release-ready validation while preserving per-package skip guards, automatic publish restrictions, stable/version/SHA gates and canonical publish-result evidence. Add focused behavioral regression coverage. Do not change the published 0.7.8 payload, versions, release tag or verification criteria; integrate the workflow repair separately before resuming that exact historical release.

## Scope

- In scope: Publish release run 34076162150 published the 0.7.8 npm packages from exact qualified SHA 81b3fe507426d82ea903d7a63fd6335b583d81b5, then stopped because npm was still processing core and CLI. The existing detect condition skips the entire publish job when all three npm versions exist, which prevents recovery of missing GHCR, tag, GitHub Release and external distribution steps. Make explicit workflow_dispatch recovery continue after exact release-ready validation while preserving per-package skip guards, automatic publish restrictions, stable/version/SHA gates and canonical publish-result evidence. Add focused behavioral regression coverage. Do not change the published 0.7.8 payload, versions, release tag or verification criteria; integrate the workflow repair separately before resuming that exact historical release.
- Out of scope: unrelated refactors not required for "Repair manual release recovery after npm publication".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T02:47:00.620Z
- Branch: task/202609070233-NG368H/repair-manual-release-recovery-after-npm-publica
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                      |  3 +
 .../release/publish-workflow-contract.test.ts      | 73 +++++++++++++++++++++-
 2 files changed, 75 insertions(+), 1 deletion(-)
```

</details>
