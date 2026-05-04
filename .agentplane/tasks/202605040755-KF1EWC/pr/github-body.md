Task: `202605040755-KF1EWC`
Title: Fix launch README example role leakage

## Batch Tasks

- Primary: `202605040755-KF1EWC`
- Closure policy: `all_or_fail`
- Included: `202605040755-SM1KH2`
- Included: `202605040756-SV9YYN`
- Included: `202605040756-TVF732`

## Summary

Fix launch README example role leakage

Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.

## Scope

- In scope: Replace public quickstart examples that foreground internal role IDs with role-free commands and a single configurable-agents note.
- Out of scope: unrelated refactors not required for "Fix launch README example role leakage".

## Verification

- State: ok
- Note: Public examples no longer expose concrete internal role IDs; targeted homepage import and lint passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-04T08:08:46.737Z
- Branch: task/202605040755-KF1EWC/launch-punch-list
- Head: da0a0606181b

```text
 .agentplane/tasks/202605040755-SM1KH2/README.md | 129 +++++++++++++++++++++++
 .agentplane/tasks/202605040756-SV9YYN/README.md | 129 +++++++++++++++++++++++
 .agentplane/tasks/202605040756-TVF732/README.md | 131 ++++++++++++++++++++++++
 README.md                                       |  14 +--
 docs/assets/header.png                          | Bin 170586 -> 98544 bytes
 docs/launch/checklist.md                        |  52 ++++++++++
 docs/launch/hn.md                               |  44 ++++++++
 docs/launch/reddit.md                           |  60 +++++++++++
 docs/launch/twitter.md                          |  62 +++++++++++
 package.json                                    |   5 +-
 packages/agentplane/README.md                   |  14 +--
 packages/spec/examples/acr.json                 |   4 +-
 scripts/README.md                               |  53 +++++-----
 scripts/check-acr-example-version.mjs           |  31 ++++++
 website/src/data/homepage-content.ts            |   6 +-
 website/static/img/header.png                   | Bin 170586 -> 98544 bytes
 16 files changed, 687 insertions(+), 47 deletions(-)
```

</details>
