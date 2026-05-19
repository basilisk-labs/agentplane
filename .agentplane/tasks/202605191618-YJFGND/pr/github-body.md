Task: `202605191618-YJFGND`
Title: Refresh evidence bundle during hosted close
Canonical task record: `.agentplane/tasks/202605191618-YJFGND/README.md`

## Summary

Refresh evidence bundle during hosted close

Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close.

## Scope

- In scope: Ensure branch_pr hosted close regenerates task evidence manifests after final task README and PR metadata mutations so strict evidence verification remains valid on main after close.
- Out of scope: unrelated refactors not required for "Refresh evidence bundle during hosted close".

## Verification

- State: ok
- Note:

```text
Implemented hosted close evidence refresh and repaired stale evidence manifest for
202605191421-D566XJ on main. Checks passed: hosted-close/evidence focused tests, agentplane
typecheck, framework:dev:bootstrap, evidence verify --strict for both tasks.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T16:23:20.591Z
- Branch: task/202605191618-YJFGND/hosted-close-evidence
- Head: 3842d635d8a2

```text
 .../202605191421-D566XJ/evidence/manifest.json     |  10 +-
 .agentplane/tasks/202605191618-YJFGND/acr.json     | 241 +++++++++
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 .../202605191618-YJFGND/evidence/manifest.json     |  69 +++
 .../src/commands/task/hosted-close.command.ts      |  22 +
 5 files changed, 908 insertions(+), 5 deletions(-)
```

</details>
