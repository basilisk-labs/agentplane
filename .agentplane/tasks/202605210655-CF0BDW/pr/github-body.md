Task: `202605210655-CF0BDW`
Title: Align website design source and docs routing
Canonical task record: `.agentplane/tasks/202605210655-CF0BDW/README.md`

## Summary

Align website design source and docs routing

Update the website design source to reflect the current Geist/orange/compact-radius visual system, tighten live CSS radius tokens, update stale homepage release proof, and verify docs routes/sidebar links open correctly.

## Scope

- In scope: Update the website design source to reflect the current Geist/orange/compact-radius visual system, tighten live CSS radius tokens, update stale homepage release proof, and verify docs routes/sidebar links open correctly.
- Out of scope: unrelated refactors not required for "Align website design source and docs routing".

## Verification

- State: ok
- Note:

```text
Updated website design contract to current Geist/orange/compact-radius language, verified docs IA,
links, browser navigation, typecheck, build, smoke, policy routing, and ap doctor.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T07:46:22.971Z
- Branch: task/202605210655-CF0BDW/website-design-routing
- Head: 7a2601983b59

```text
 .../blueprint/resolved-snapshot.json               | 572 +++++++++++++++++++++
 marketing                                          |   2 +-
 scripts/checks/check-design-language.mjs           |  47 +-
 website/src/css/custom.css                         |  28 +-
 website/src/data/homepage-content.ts               |   6 +-
 website/static/img/social/docs/releases/v0.6.4.png | Bin 0 -> 41128 bytes
 6 files changed, 636 insertions(+), 19 deletions(-)
```

</details>
