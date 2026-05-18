Task: `202605171326-FXRVNW`
Title: Freeze release candidate base and scope after late merges
Canonical task record: `.agentplane/tasks/202605171326-FXRVNW/README.md`

## Summary

Freeze release candidate base and scope after late merges

Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.

## Scope

- In scope: Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
- Out of scope: unrelated refactors not required for "Freeze release candidate base and scope after late merges".

## Verification

- State: ok
- Note:

```text
Verified: release planning now records baseSha and release candidate/apply fails closed if HEAD
drifts from the planned base; focused release plan tests, builds, policy routing, and doctor passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T17:41:11.285Z
- Branch: task/202605171326-FXRVNW/v063-prerelease-rough-edges
- Head: 3fc54e6d4072

```text
No changes detected.
```

</details>
