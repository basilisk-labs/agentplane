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
REWORK PASS at 0b9d9e4d5: SX8T09 now requires an atomic cross-process single-winner race with
exactly one adapter spawn; R7WS01 consumes typed effect_in_doubt/applied/not_applied states and
resolution provenance while forbidding generic retry; the roadmap separates provider_key_forwarded
from provider exactly-once and gates the latter on a documented, integration-tested provider
deduplication contract. Checks passed: task lint, task-state (3138), routing, format and doctor (0
errors; 3 recorded pre-existing warnings).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T22:11:13.250Z
- Branch: task/202607242201-6BN1GV/amend-the-agentplane-0-7-graph-with-the-effect-i
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221850-R7WS01/README.md |  35 ++++--
 .agentplane/tasks/202607221908-9M2FBQ/README.md |   3 +-
 .agentplane/tasks/202607242158-QV09NA/README.md | 145 ++++++++++++++++++++++++
 .agentplane/tasks/202607242204-SX8T09/README.md | 140 +++++++++++++++++++++++
 docs/internal/v0.7-refactor-plan.md             |  24 +++-
 5 files changed, 333 insertions(+), 14 deletions(-)
```

</details>
