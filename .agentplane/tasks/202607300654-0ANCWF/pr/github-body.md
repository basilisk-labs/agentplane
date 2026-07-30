Task: `202607300654-0ANCWF`
Title: Atomically synchronize RF-04 incident archival across package assets
Canonical task record: `.agentplane/tasks/202607300654-0ANCWF/README.md`

## Summary

Atomically synchronize RF-04 incident archival across package assets

Supersede the unmergeable docs-only archival PR #4683 by applying the already-approved external-mitigation disposition atomically: remove INC-20260730-01 from the packaged canonical incident policy, synchronize the project policy target, regenerate built-in assets, and add the faithful historical archive record. Preserve CR9VTJ do_not_publish evidence and the no-retry/no-replacement boundary; do not call a provider, release, or publish a package.

## Scope

- In scope: Supersede the unmergeable docs-only archival PR #4683 by applying the already-approved external-mitigation disposition atomically: remove INC-20260730-01 from the packaged canonical incident policy, synchronize the project policy target, regenerate built-in assets, and add the faithful historical archive record. Preserve CR9VTJ do_not_publish evidence and the no-retry/no-replacement boundary; do not call a provider, release, or publish a package.
- Out of scope: unrelated refactors not required for "Atomically synchronize RF-04 incident archival across package assets".

## Verification

- State: ok
- Note:

```text
Atomic RF-04 archival is synchronized across package assets, project policy, generated table, and
archive; it contains no provider retry or release.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T06:55:50.968Z
- Branch: task/202607300654-0ANCWF/atomically-synchronize-rf-04-incident-archival-a
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                            | 1 -
 docs/developer/incident-archive.mdx                        | 4 ++++
 packages/agentplane/assets/policy/incidents.md             | 1 -
 packages/agentplane/src/shared/builtin-assets.generated.ts | 6 +++---
 4 files changed, 7 insertions(+), 5 deletions(-)
```

</details>
