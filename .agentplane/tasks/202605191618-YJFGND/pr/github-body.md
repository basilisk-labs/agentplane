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
EVALUATOR quality gate passed. Evidence: GitHub PR #3944 checks passed including Core CI test,
test-windows, Release-ready manifest, Docs CI, CodeQL; local focused evidence/hosted-close tests,
agentplane typecheck, framework:dev:bootstrap, and strict evidence verification passed before
integration.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T16:50:20.903Z
- Branch: task/202605191618-YJFGND/hosted-close-evidence
- Head: f0db737713b9

```text
 .../202605191421-D566XJ/evidence/manifest.json     |  10 +-
 .agentplane/tasks/202605191618-YJFGND/acr.json     | 322 ++++++++++++
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 .../202605191618-YJFGND/evidence/manifest.json     |  69 +++
 .../src/commands/evidence/evidence.command.ts      |   2 +
 .../src/commands/task/hosted-close.command.ts      |  24 +
 6 files changed, 993 insertions(+), 5 deletions(-)
```

</details>
