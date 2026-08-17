# Hermes AgentPlane Plugin Contract

The executable plugin is released from
[`basilisk-labs/agentplane-hermes-plugin`](https://github.com/basilisk-labs/agentplane-hermes-plugin).
This directory pins the AgentPlane-side protocol contract used by that plugin.

## Protocol v2

Hermes remains the LLM worker and owns board dispatch, the current claim, run lifecycle, retries,
comments, and dashboard state. AgentPlane owns engineering task state, roles, authority, repository
routing, verification, publication, integration, and the terminal decision.

The plugin exposes three native Hermes commands:

- `hermes agentplane doctor --json` validates plugin discovery, lane registration, executables, and
  the fail-closed workspace allowlist.
- `hermes agentplane run` consumes the AgentPlane custom-runner environment, asks Hermes to perform
  the supplied `WorkOrder`, validates `AgentSemanticResult v2`, and atomically writes the exact
  `AGENTPLANE_RUNNER_RESULT_PATH`.
- `hermes agentplane supervise --task-id <id> --root <repo>` repeatedly requests a fresh
  `ap task advance <id> --agent-json` packet. It executes only `agent_episode`, writes the typed
  result to the packet's exact `exchange.result_path`, and resumes with the exact
  `exchange.resume_argv`. It stops at approval, human, external, recovery, or terminal boundaries.

The worker-lane spawn callback must start `hermes agentplane supervise`; it must not call
`agentplane hermes supervise --execute-step`, infer lifecycle transitions, or write directly to
`kanban.db`.

## Runtime proof

Every plugin-owned AgentPlane process receives:

```text
AGENTPLANE_HERMES_PLUGIN_PROTOCOL=agentplane.hermes.plugin.v2
AGENTPLANE_HERMES_NATIVE_WORKER_LANE_API=1
AGENTPLANE_HERMES_ALLOWED_ROOTS=/workspace/repo-a:/workspace/repo-b
```

An empty allowlist is an error. The plugin passes only an explicit environment allowlist plus the
current Hermes claim fields; it never forwards the complete parent environment.

`agentplane hermes doctor --json` reports `installation_ready=true` only when the v2 capability
assertion, native lane API, lane registry, both executables, `branch_pr`, and a non-empty allowed
root set are all proven. `worker_context_ready` additionally requires the current task, board,
run id, workspace, and claim lock.

## Completion

Hermes may complete its root card only when AgentPlane returns
`agentplane.hermes.terminal-attestation.v1` with:

```json
{
  "hermes_root_complete_allowed": true,
  "terminal_outcome": "done"
}
```

The attestation is derived from the canonical route step (`workflowStep.kind=terminal` and
`workflowStep.outcome.type=done`), not from a local `DONE + verification` approximation.

See [`protocol-v2.schema.json`](./protocol-v2.schema.json) and
[`lane-registry.example.json`](./lane-registry.example.json).
