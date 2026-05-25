Task: `202605251957-4ABD2H`
Title: Optimize CLI startup fast paths
Canonical task record: `.agentplane/tasks/202605251957-4ABD2H/README.md`

## Summary

Optimize CLI startup fast paths

Reduce AgentPlane CLI startup overhead for fast commands such as version/help/quickstart by avoiding unnecessary project, config, and runtime registry loading where command dispatch metadata says it is not required.

## Scope

- In scope: Reduce AgentPlane CLI startup overhead for fast commands such as version/help/quickstart by avoiding unnecessary project, config, and runtime registry loading where command dispatch metadata says it is not required.
- Out of scope: unrelated refactors not required for "Optimize CLI startup fast paths".

## Verification

- State: ok
- Note:

```text
Implemented runtime freshness optimization and ran focused checks. typecheck, focused
dist-guard/repo-local-handoff tests, targeted eslint, framework bootstrap, and policy routing
passed. bench:cli:time:check still fails on this local machine but shows the changed path avoids
dirty runtime snapshot hashing only after commit/bootstrap; residual startup cost remains in dist
import/project command execution and is recorded as follow-up risk.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T20:00:44.941Z
- Branch: task/202605251957-4ABD2H/optimize-cli-startup-fast-paths
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/bin/agentplane.js          | 10 ++++++++--
 packages/agentplane/bin/dist-guard.js          | 11 +++++++++++
 packages/agentplane/src/cli/dist-guard.test.ts | 24 ++++++++++++++++++++++++
 3 files changed, 43 insertions(+), 2 deletions(-)
```

</details>
