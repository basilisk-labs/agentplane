Task: `202605150704-5TCB66`
Title: Geist typography and website/blog layout refresh
Canonical task record: `.agentplane/tasks/202605150704-5TCB66/README.md`

## Summary

Geist typography and website/blog layout refresh

Switch website typography to Geist, align navbar interaction with basilisk-labs.com behavior, convert Product surfaces into an accordion, increase layout spacing, and redesign blog landing in the homepage visual language.

## Scope

- In scope: Switch website typography to Geist, align navbar interaction with basilisk-labs.com behavior, convert Product surfaces into an accordion, increase layout spacing, and redesign blog landing in the homepage visual language.
- Out of scope: unrelated refactors not required for "Geist typography and website/blog layout refresh".

## Verification

- State: ok
- Note:

```text
Implemented Geist typography, basilisk-like floating navbar behavior, Product surfaces accordion,
expanded spacing, and blog landing redesign in homepage style. Verified with prettier on changed
files and website production build (docusaurus build).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-15T07:09:15.476Z
- Branch: task/202605150704-5TCB66/geist-navbar-accordion-blog
- Head: cd755f496b90

```text
 website/src/css/custom.css              |  83 ++++++++++++-
 website/src/pages/_home.module.css      |  71 ++++++++++-
 website/src/pages/blog/index.module.css | 206 +++++++++++++-------------------
 website/src/pages/blog/index.tsx        |  28 +++--
 website/src/pages/index.tsx             |  79 ++++++------
 website/src/theme/Root.tsx              |  38 ++++--
 6 files changed, 313 insertions(+), 192 deletions(-)
```

</details>
