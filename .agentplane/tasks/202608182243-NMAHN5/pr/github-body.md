Task: `202608182243-NMAHN5`
Title: Redesign the Agentplane homepage around a clear authority-to-proof happy path
Canonical task record: `.agentplane/tasks/202608182243-NMAHN5/README.md`

## Summary

Redesign the Agentplane homepage around a clear authority-to-proof happy path

Implement the selected hybrid visual target: compact header from concept 3, icon-led diagrams and evidence storytelling from concept 1, a white background, modern multicolor semantic accents, responsive behavior, and restrained microinteractions. Preserve the current Git-native control-plane positioning and working navigation/CTAs.

## Scope

- In scope: Implement the selected hybrid visual target: compact header from concept 3, icon-led diagrams and evidence storytelling from concept 1, a white background, modern multicolor semantic accents, responsive behavior, and restrained microinteractions. Preserve the current Git-native control-plane positioning and working navigation/CTAs.
- Out of scope: unrelated refactors not required for "Redesign the Agentplane homepage around a clear authority-to-proof happy path".

## Verification

- State: ok
- Note:

```text
After rebase onto current main, task branch still contains only intended homepage redesign changes
and remains aligned with PR #4849.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-19T12:20:15.551Z
- Branch: task/202608182243-NMAHN5/redesign-the-agentplane-homepage-around-a-clear
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 website/docusaurus.config.ts         |   10 +-
 website/src/data/homepage-content.ts |  200 +++---
 website/src/pages/_home.module.css   | 1291 ++++++++++++++++++++++++----------
 website/src/pages/index.tsx          |  538 +++++++-------
 4 files changed, 1243 insertions(+), 796 deletions(-)
```

</details>
