Task: `202609060720-NZXQ0E`
Title: Recover an interrupted integration queue supervisor intent before semantic rework
Canonical task record: `.agentplane/tasks/202609060720-NZXQ0E/README.md`

## Summary

Recover an interrupted integration queue supervisor intent before semantic rework

Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.

## Scope

- In scope: Blocking Clean Core recovery linked to 202608291006-255K66 and 202609042327-PH5N6S. A native integration.run_next worker was interrupted while PR #5899 remained open due to a genuine unresolved review. The journal retains a running cli_operation intent. A supported verify --rework correctly routes PH5N6S to CODER, but task advance cannot issue the episode: Another unresolved external-agent episode already owns this task. --replacement rejects a nonterminal intent. task run reconcile reports no_active_claim because this is a supervisor workflow operation, not a runner effect. Reproduce and repair recovery in the existing supervisor owners. Reconcile only with durable queue/provider evidence and exclusive ownership; never infer that an uncertain merge was not applied, rerun a completed effect, weaken identity or authority, or edit journals/projections manually. Restore the original task route and return to PH5N6S for its separate implementation_rework replay finding. Do not duplicate the PH5N6S implementation. Preserve all completed Clean Core tasks. Exclude MPXQBK, release/version/tag/publication, mass cleanup, history rewriting and unrelated work. One bounded recovery task is necessary because PH5N6S cannot receive a semantic episode and its approved five source paths exclude supervisor dispatch recovery.
- Out of scope: unrelated refactors not required for "Recover an interrupted integration queue supervisor intent before semantic rework".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-06T14:11:03.968Z
- Branch: task/202609060720-NZXQ0E/recover-an-interrupted-integration-queue-supervi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 docs/user/task-lifecycle.mdx                       |  56 ++
 ...n-cli.core.task-advance-effect-recovery.test.ts |  41 ++
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../cli/task-advance-effect-recovery.testkit.ts    | 126 ++++-
 .../src/cli/workflow-effect-recovery.testkit.ts    | 563 +++++++++++++++++++++
 .../shared/supervisor-execution-episode.test.ts    |  74 +++
 .../shared/supervisor-execution-episode.ts         |  13 +
 .../src/commands/task/advance.command.ts           |  26 +
 .../agentplane/src/commands/task/advance.spec.ts   |  12 +
 .../task/external-agent-supervisor-recovery.ts     |   2 +
 .../task/external-agent-workflow-recovery.ts       | 406 +++++++++++++++
 .../runner/supervisor-execution-episode.test.ts    |  56 ++
 .../src/runner/supervisor-execution-episode.ts     |  44 ++
 .../baselines/v0.7-compatibility-candidate.json    |  31 +-
 .../check-compatibility-contract-baseline.mjs      |  15 +
 website/static/llms-full.txt                       |  56 ++
 17 files changed, 1516 insertions(+), 13 deletions(-)
```

</details>
