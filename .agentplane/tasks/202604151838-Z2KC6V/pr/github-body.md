## Summary

Prefer artifact-bearing recovery run over artifact-missing direct Core CI run

When resolving release-ready source for a canonical release SHA, continue past a successful direct Core CI run that lacks release-ready artifacts and prefer a later successful recovery run that actually carries the exact release-ready artifact.

## Scope

- In scope: When resolving release-ready source for a canonical release SHA, continue past a successful direct Core CI run that lacks release-ready artifacts and prefer a later successful recovery run that actually carries the exact release-ready artifact.
- Out of scope: unrelated refactors not required for "Prefer artifact-bearing recovery run over artifact-missing direct Core CI run".

## Verification

- State: ok
- Note: Targeted resolver regression tests passed; live exact-sha resolution now selects recovery run 24464054933 with artifact release-ready-ceaa8754... instead of stopping at direct artifact-missing run 24402404778.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-15T18:42:38.531Z
- Branch: task/202604151838-Z2KC6V/prefer-artifact-bearing-recovery-run
- Head: ae22254c3737

```text
 .agentplane/tasks/202604151838-Z2KC6V/README.md    | 99 ++++++++++++++++++++++
 .../resolve-release-ready-source-script.test.ts    | 68 +++++++++++++++
 scripts/lib/release-ready-source.mjs               | 33 ++++++--
 3 files changed, 195 insertions(+), 5 deletions(-)
```

</details>
