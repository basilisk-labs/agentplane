Task: `202608070235-JPPAMT`
Title: Restore the release lint baseline
Canonical task record: `.agentplane/tasks/202608070235-JPPAMT/README.md`

## Summary

Restore the release lint baseline

Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.

## Scope

- In scope: Replace the obsolete global-regex String.replace call in the social image generator so the current main branch and every 0.7.5 PR pass the repository lint gate.
- Out of scope: unrelated refactors not required for "Restore the release lint baseline".

## Verification

- State: ok
- Note: Deterministic local and hosted evidence passes on the evaluated implementation.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-07T02:40:39.441Z
- Branch: task/202608070235-JPPAMT/restore-the-release-lint-baseline
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/scripts/generate-social-images.mjs | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

</details>
