Task: `202605131913-YPT798`
Title: Serialize framework dev build lane
Canonical task record: `.agentplane/tasks/202605131913-YPT798/README.md`

## Summary

Serialize framework dev build lane

Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime.

## Scope

- In scope: Prevent concurrent framework bootstrap/build/pre-push paths from deleting shared dist while another AgentPlane CLI process needs repo-local runtime.
- Out of scope: unrelated refactors not required for "Serialize framework dev build lane".

## Verification

- State: ok
- Note: Verified framework build-lane serialization fix. Passed: focused Vitest bootstrap/stale-dist suite (25 tests), targeted ESLint, targeted Prettier check, git diff --check, policy routing, helper import smoke, and package agentplane build. Broader ci:local:fast docs-only loaded the new helper but failed on pre-existing Prettier drift in packages/agentplane/src/cli/spec/docs-render.ts outside this diff.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T21:15:08.827Z
- Branch: task/202605131913-YPT798/serialize-build-lane
- Head: d0d89c65d620

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 packages/agentplane/bin/agentplane.js              |  61 ++-
 .../src/cli/bootstrap-framework-dev-script.test.ts |  74 +++
 packages/agentplane/src/cli/spec/docs-render.ts    |   5 +-
 scripts/checks/run-local-ci.mjs                    |   9 +-
 scripts/lib/framework-build-lock.mjs               | 113 +++++
 scripts/workflow/bootstrap-framework-dev.mjs       |  31 +-
 7 files changed, 791 insertions(+), 28 deletions(-)
```

</details>
