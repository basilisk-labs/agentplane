Task: `202607242201-6BN1GV`
Title: Amend the AgentPlane 0.7 graph with the effect-in-doubt safety gate
Canonical task record: `.agentplane/tasks/202607242201-6BN1GV/README.md`

## Summary

Amend the AgentPlane 0.7 graph with the effect-in-doubt safety gate

Persist the mandatory durable effect_in_doubt follow-up in the AgentPlane 0.7 executable DAG, wire alpha.2 and typed runner lifecycle fan-in, and update the internal execution roadmap and closure counts.

## Scope

- In scope: persist effect journal task 202607242204-SX8T09 and operator resolution task 202607242158-QV09NA, add the resolved safety chain to the alpha.2 qualification and typed runner lifecycle dependency closure, make this graph amendment a prerequisite of the terminal safety leaf, and update docs/internal/v0.7-refactor-plan.md.
- Validate that every mandatory v0.7 leaf remains reachable from the stable release task and that no dependency cycle is introduced.
- Out of scope: implementation of RF-06b, RF-13 or effect runtime behavior; release publication; changes to agentplane-loops.

## Verification

- State: ok
- Note:

```text
PASS at b1e6bd6c6: split journal and operator-resolution leaves are approved, acyclic, reachable
from XV67TD, and wired through alpha.2 plus typed runner results. Checks passed: ap task lint
--verify-steps-changed; bun run task-state:check (3138 tasks); policy routing; format; doctor (0
errors, 3 recorded pre-existing warnings); pre-push docs-only fast CI.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T22:11:13.250Z
- Branch: task/202607242201-6BN1GV/amend-the-agentplane-0-7-graph-with-the-effect-i
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221850-R7WS01/README.md |   3 +-
 .agentplane/tasks/202607221908-9M2FBQ/README.md |   3 +-
 .agentplane/tasks/202607242158-QV09NA/README.md | 145 ++++++++++++++++++++++++
 .agentplane/tasks/202607242204-SX8T09/README.md | 136 ++++++++++++++++++++++
 docs/internal/v0.7-refactor-plan.md             |  20 +++-
 5 files changed, 303 insertions(+), 4 deletions(-)
```

</details>
