# Hermes AgentPlane Plugin

The executable Hermes plugin is maintained outside this repository:

<https://github.com/basilisk-labs/agentplane-hermes-plugin>

This directory is intentionally documentation-only. The older repo-local shim
patched `hermes_cli.kanban_db.dispatch_once`; that path is now removed because
Hermes exposes a native worker-lane registration contract:

```python
ctx.register_worker_lane(match="agentplane-*", spawn_fn=spawn_fn, profile_exists=True)
```

## Contract

- Hermes owns dispatch/run lifecycle: board, assignee, claim, run id, retry,
  crash detection, comments, and dashboard.
- AgentPlane owns engineering lifecycle: task truth, route oracle, `branch_pr`,
  verification, PR artifacts, finish, and ACR evidence.
- Hermes cards must carry an explicit AgentPlane task id in
  `metadata.agentplane.task_id` or `agentplane_task_id`.
- The plugin spawns `agentplane hermes supervise <task-id> --root <repo>
--execute-step --json` with Hermes run context in environment variables.
- The plugin must not write directly to `~/.hermes/kanban.db`.

## Deployment Variables

```bash
export AGENTPLANE_HERMES_LANE_REGISTRY=/opt/agentplane/lane-registry.json
export AGENTPLANE_BIN=/usr/local/bin/agentplane
export AGENTPLANE_HERMES_ALLOWED_ROOTS=/workspace
```

Use the external plugin README and registry example as the install source of
truth.
