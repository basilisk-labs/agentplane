# Hermes Agentplane Plugin

This is a reference Hermes worker-lane adapter for Agentplane-owned engineering tasks.

It is intentionally small:

- Hermes keeps the dispatch/run lifecycle: board, assignee, claim, run id, retry, crash detection, comments, and dashboard.
- Agentplane keeps the engineering lifecycle: task truth, route oracle, `branch_pr`, verification, PR artifacts, finish, and ACR evidence.
- The adapter only spawns `agentplane hermes supervise <agentplane-task-id> --root <repo> --json` with Hermes run context in environment variables.

This package is repo-local for now. Do not publish it separately until the Hermes external CLI lane API is pinned enough to make the spawn hook stable.

## Spawn Contract

A Hermes plugin `spawn_fn(task, workspace, board)` should extract the Agentplane task id from the card projection created by:

```bash
agentplane hermes enqueue <task-id> --json
```

Then it should spawn:

```bash
hermes-agentplane-spawn \
  --agentplane-task-id 202605311941-K4FCKS \
  --repo /srv/repos/my-project \
  --hermes-task-id <kanban-card-id> \
  --board <board-id> \
  --run-id <hermes-run-id> \
  --workspace /srv/repos/my-project
```

The script prints the spawned process pid when available. Hermes remains responsible for associating that pid with crash detection and run ownership.

## Non-Goals

- No direct writes to `~/.hermes/kanban.db`.
- No attempt to make Hermes status canonical for Agentplane task state.
- No raw execution of `task next-action` command strings.
- No GitHub publication or merge from the Hermes plugin.
