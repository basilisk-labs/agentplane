Task: `202610070801-91ZH0N`
Title: Remove duplicated release and benchmark script logic for 0.7.13
Canonical task record: `.agentplane/tasks/202610070801-91ZH0N/README.md`

## Summary

Remove duplicated release and benchmark script logic for 0.7.13

Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification.

## Scope

- In scope: Repair the real unchanged clone ratchet failure blocking release 0.7.13. Retained candidate report has 97 clones, 1610 duplicated lines, 10683 duplicated tokens against maxima 95,1482,10417. Extract genuine shared behavior from CLI baseline checks, distribution renderer argument handling, and only if needed CLI benchmark runners. Preserve exact public behavior, diagnostics, measurement semantics and distribution output. Do not increase or rewrite any baseline, exclude scanned sources, suppress failures, or alter measurement evidence. Add focused behavior tests where shared logic changes. Achieve all unchanged clone thresholds and affected tests. Failure report retained at .git/agentplane/recovery/2MV36M-clone-regression-20261007. Separate branch PR, independent evaluation, native full verification and integration required before candidate requalification.
- Out of scope: unrelated refactors not required for "Remove duplicated release and benchmark script logic for 0.7.13".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-07T08:17:00.443Z
- Branch: task/202610070801-91ZH0N/remove-duplicated-release-and-benchmark-script-l
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/checks/check-cli-cold-baseline.mjs         | 173 +++------------------
 scripts/checks/check-cli-walltime-baseline.mjs     | 169 +++-----------------
 scripts/generate/render-homebrew-formula.mjs       |  18 +--
 scripts/generate/render-scoop-manifest.mjs         |  18 +--
 .../generate/render-setup-agentplane-action.mjs    |  18 +--
 scripts/lib/cli-baseline-check.mjs                 | 169 ++++++++++++++++++++
 scripts/lib/cli-baseline-check.test.mjs            | 140 +++++++++++++++++
 scripts/lib/cli-benchmark-shared.test.mjs          |  20 +++
 scripts/lib/release-distribution-render.mjs        |  18 +++
 9 files changed, 397 insertions(+), 346 deletions(-)
```

</details>
