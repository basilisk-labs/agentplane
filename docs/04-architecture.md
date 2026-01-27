# Architecture

## Summary

Agent Plane v1 is a Node.js CLI (`agentplane`) plus a per-project state directory (`.agentplane/`). It combines JSON-defined agents, a pluggable task backend, and explicit workflow guardrails so multi-agent work stays planned and traceable.

## Key Concepts

- Global rules are defined in [`AGENTS.md`](../AGENTS.md).
- Agents are defined in `.agentplane/agents/` (created/managed by `agentplane init` and recipes).
- Task source-of-truth is backend-driven (local folder or Redmine).
- Local task storage lives under `.agentplane/tasks/` and doubles as a cache when backend=redmine.
- Backend plugin configs live under `.agentplane/backends/`.
- `tasks.json` is an exported view for local browsing and integrations (checksum-bearing).

## Architectural Layers

1. **Agent layer:** Orchestrator + specialist agents (core set + recipe-installed).
2. **Workflow layer:** `agentplane` CLI enforces guardrails and routes task ops to the active backend.
3. **Backend layer:** pluggable task storage (local or Redmine), with offline-first behavior and explicit sync.
4. **Export layer:** `tasks.json` generated from the canonical backend; consumers should treat it as a read-only snapshot.
5. **Recipes layer:** optional, installable extensions (agents/tools/scenarios/assets) that do not block core operation.

## Where to Read Next

- [`../ROADMAP.md`](../ROADMAP.md) for the v1 scope and milestones.
- [`05-workflow.md`](05-workflow.md) for end-to-end process details.
- [`07-tasks-and-backends.md`](07-tasks-and-backends.md) for backend behavior and the task ID format.
- [`08-branching-and-pr-artifacts.md`](08-branching-and-pr-artifacts.md) for `workflow_mode` specifics.
- [`cli-contract.md`](cli-contract.md) for the command surface.
- [`recipes-spec.md`](recipes-spec.md) for recipes behavior.

## Planned Expansions

- Add a parity matrix vs the legacy Python implementation.
- Add a sequence diagram for offline fallback and explicit sync.
- Document backend plugin loading and validation rules.
