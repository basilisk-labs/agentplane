Task: `202605141400-RT8HXD`
Title: Harden release publish evidence and external metadata
Canonical task record: `.agentplane/tasks/202605141400-RT8HXD/README.md`

## Summary

Harden release publish evidence and external metadata

Fix release publish evidence resolution for branch_pr merge commits and correct external repository topics API payloads so hosted publish logs produce durable task evidence without GitHub 422 warnings.

## Scope

- In scope: Fix release publish evidence resolution for branch_pr merge commits and correct external repository topics API payloads so hosted publish logs produce durable task evidence without GitHub 422 warnings.
- Out of scope: unrelated refactors not required for "Harden release publish evidence and external metadata".

## Verification

- State: ok
- Note:

```text
Focused release hardening checks passed: release-task-evidence merge-commit regression suite 5/5,
publish-external-distribution topics payload suite 4/4, policy routing OK, git diff whitespace check
clean.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T14:02:12.360Z
- Branch: task/202605141400-RT8HXD/release-evidence-hardening
- Head: 3d5c3b4706ea

```text
No changes detected.
```

</details>
