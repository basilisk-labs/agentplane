Task: `202605141242-DQV6A3`
Title: Use full-width README header on GitHub and npm
Canonical task record: `.agentplane/tasks/202605141242-DQV6A3/README.md`

## Summary

Use full-width README header on GitHub and npm

Make the generated header image use full available width in the root README and add the same generated header to the npm package README surface.

## Scope

- In scope: Make the generated header image use full available width in the root README and add the same generated header to the npm package README surface.
- Out of scope: unrelated refactors not required for "Use full-width README header on GitHub and npm".

## Verification

- State: ok
- Note:

```text
Re-verified after addressing Codex review: README headers now use CSS style width/max-width instead
of invalid percentage width attributes; formatting, policy routing, doctor, npm pack dry run, and
whitespace checks passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T13:02:26.120Z
- Branch: task/202605141242-DQV6A3/npm-readme-header
- Head: e6c6e16a941e

```text
 .../blueprint/resolved-snapshot.json               | 357 +++++++++++++++++++++
 README.md                                          |   2 +-
 packages/agentplane/README.md                      |   4 +
 3 files changed, 362 insertions(+), 1 deletion(-)
```

</details>
