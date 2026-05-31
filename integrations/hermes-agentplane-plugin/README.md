# Hermes Agentplane Plugin

This is a reference Hermes worker-lane adapter for Agentplane-owned engineering tasks.

It is intentionally small:

- Hermes keeps the dispatch/run lifecycle: board, assignee, claim, run id, retry, crash detection, comments, and dashboard.
- Agentplane keeps the engineering lifecycle: task truth, route oracle, `branch_pr`, verification, PR artifacts, finish, and ACR evidence.
- The adapter only spawns `agentplane hermes supervise <agentplane-task-id> --root <repo> --json` with Hermes run context in environment variables.

This package is repo-local for now. Do not publish it separately until the Hermes external CLI lane API is pinned enough to make the spawn hook stable.

## Hermes Image Requirements

The current Arkady image exposes the documented `spawn_fn` seam inside `hermes_cli.kanban_db`, but
the gateway dispatcher does not yet expose a public external-lane registry. For effective
Agentplane operation, add these changes to the Hermes image/runtime:

1. Put `/opt/hermes/bin` on `PATH` for all entrypoints and services.
   The observed container exits with `exec: gateway: not found` even though Hermes ships
   `/opt/hermes/bin/hermes`.
2. Add a stable Kanban worker-lane registry:
   `register_worker_lane(name|prefix, spawn_fn, profile_exists=True)`.
   The gateway and CLI dispatch paths should call this registry instead of hard-coding only Hermes
   profiles.
3. Make dispatcher spawn selection plugin-aware.
   `gateway/run.py`, `hermes_cli/kanban.py`, and the dashboard dispatch route should all pass the
   registered spawn function into `kanban_db.dispatch_once`.
4. Treat registered external lanes as spawnable assignees.
   Today `dispatch_once` skips non-profile assignees before spawn. External lanes need a first-class
   spawnability check that does not require creating fake Hermes profiles.
5. Expose Kanban lifecycle client functions to plugins.
   Plugins need supported calls for `comment`, `block`, `complete`, `heartbeat`, and current-run
   validation. They should not write `kanban.db` directly.
6. Provide structured card metadata access.
   External workers need a stable way to read the card metadata/body/idempotency key and extract
   provider projections such as `agentplane.task_id`, `repo`, `role`, and `task_revision`.
7. Add run freshness guards.
   Before a plugin completes or blocks a card, Hermes should expose `is_current_run(task_id, run_id,
claim_lock)` so stale workers cannot close superseded runs.
8. Add an image-level Agentplane dependency option.
   Either include Node plus `agentplane` on `PATH`, or support `AGENTPLANE_BIN=/workspace/.../agentplane`
   as a documented deployment variable.
9. Add plugin install support for local/bind-mounted plugins.
   `hermes plugins install` is Git-oriented; development and private deployments need a documented
   local path install or enable path.
10. Add a dispatcher compatibility test.
    A fixture should create a Kanban card assigned to `agentplane-coder`, dispatch once, assert the
    registered spawn function was called, and assert `worker_pid` is recorded.

## Spawn Contract

On current Hermes images this plugin runs as a compatibility shim: `register(ctx)` patches
`hermes_cli.kanban_db.dispatch_once` in the Hermes process and injects a spawn function for
`agentplane-*` assignees. Once Hermes exposes a first-class lane registry, replace the patch with
that registry call.

The spawn function extracts the Agentplane task id from the card projection created by:

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

## Local Install

Until Hermes supports local path installs, copy or bind-mount this directory into:

```bash
~/.hermes/plugins/agentplane
```

Then enable it:

```bash
hermes plugins enable agentplane
HERMES_PLUGINS_DEBUG=1 hermes agentplane doctor --json
```

Set `AGENTPLANE_BIN` when `agentplane` is not on the container `PATH`:

```bash
export AGENTPLANE_BIN=/workspace/agentplane/packages/agentplane/bin/agentplane.js
```

## Non-Goals

- No direct writes to `~/.hermes/kanban.db`.
- No attempt to make Hermes status canonical for Agentplane task state.
- No raw execution of `task next-action` command strings.
- No GitHub publication or merge from the Hermes plugin.
