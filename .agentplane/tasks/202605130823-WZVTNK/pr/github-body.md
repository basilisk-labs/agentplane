Task: `202605130823-WZVTNK`
Title: Stabilize fast suite regressions
Canonical task record: `.agentplane/tasks/202605130823-WZVTNK/README.md`

## Summary

Stabilize fast suite regressions

Fix current fast-suite failures in wait-remote checks, runner process supervision timeout metadata, and release asset generation tests; classify placeholder/stub findings so production TODO debt is not hidden by allowed sentinels.

## Scope

- In scope: Fix current fast-suite failures in wait-remote checks, runner process supervision timeout metadata, and release asset generation tests; classify placeholder/stub findings so production TODO debt is not hidden by allowed sentinels.
- Out of scope: unrelated refactors not required for "Stabilize fast suite regressions".

## Verification

- State: ok
- Note: Targeted checks, full test:fast, typecheck, lint, logging, doctor, and routing validation passed after fixes.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T09:15:48.531Z
- Branch: task/202605130823-WZVTNK/fast-suite-regressions
- Head: 5f696652f7ca

```text
 .../blueprint/resolved-snapshot.json               | 551 +++++++++++++++++++++
 .../generate-standalone-cli-assets-script.test.ts  |  34 +-
 .../process-supervision/timeout-controller.ts      |  19 +-
 scripts/generate-standalone-cli-assets.mjs         |  19 +-
 4 files changed, 602 insertions(+), 21 deletions(-)
```

</details>
