Task: `202609071123-3B0812`
Title: Fix Homebrew executable links and prevent formula regression
Canonical task record: `.agentplane/tasks/202609071123-3B0812/README.md`

## Summary

Fix Homebrew executable links and prevent formula regression

User approved fixing the diagnosed Homebrew 0.7.8 packaging defect and opening PRs. Correct scripts/generate/render-homebrew-formula.mjs and its checks to install the staged agentplane executable and expose agentplane and ap. Update basilisk-labs/homebrew-tap Formula/agentplane.rb with the same fix through a PR. Verify generated formula and both commands after isolated clean install and reinstall where available. No merge, version change, release or publication. Stop after PR handoff.

## Scope

- In scope: User approved fixing the diagnosed Homebrew 0.7.8 packaging defect and opening PRs. Correct scripts/generate/render-homebrew-formula.mjs and its checks to install the staged agentplane executable and expose agentplane and ap. Update basilisk-labs/homebrew-tap Formula/agentplane.rb with the same fix through a PR. Verify generated formula and both commands after isolated clean install and reinstall where available. No merge, version change, release or publication. Stop after PR handoff.
- Out of scope: unrelated refactors not required for "Fix Homebrew executable links and prevent formula regression".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-07T11:30:09.703Z
- Branch: task/202609071123-3B0812/fix-homebrew-executable-links-and-prevent-formul
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 scripts/generate/render-homebrew-formula.mjs | 25 +++++++++++++++++++++----
 1 file changed, 21 insertions(+), 4 deletions(-)
```

</details>
