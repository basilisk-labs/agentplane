# Overview

## What Agent Plane Is
Agent Plane is a local, repo-scoped workflow framework for using OpenAI Codex in your IDE. The target v1 deliverable is a globally installable Node.js CLI named `agentplane` that provides:

- JSON-defined agents
- a task system with pluggable backends
- workflow guardrails and commit rules so work stays planned, traceable, and reviewable

## What Agent Plane Is Not
- Not a remote service or runner. Everything happens inside your local repo.
- Not an auto-commit bot. You stay in control of commands and commits.
- Not a replacement for your IDE. It is a workflow layer on top of it.

## Core Principles
- Local-first: no external runtime or daemon is required.
- Backend-driven truth: the canonical task source depends on the active backend.
- Traceability: every task ties back to a stable ID and a commit.
- Role clarity: each agent has a defined scope and permissions.
- Explicit approvals: plans require human approval; closure approvals follow the project config (`closure_commit_requires_approval`).

## Core Components
- [`AGENTS.md`](../AGENTS.md): global rules and workflow policies.
- `.agentplane/`: project state directory created by `agentplane init` (config, tasks, caches, recipes).
- `agentplane`: the Node.js CLI users run (`npx agentplane …` or `npm i -g agentplane`).
- [`docs/cli-contract.md`](cli-contract.md): the authoritative v1 command surface.
- [`packages/spec/`](../packages/spec/): v1 schemas/examples for config/tasks exports/PR meta.

## Where to Start
- Read [`AGENTS.md`](../AGENTS.md) for the global rules.
- Read [`../ROADMAP.md`](../ROADMAP.md) for v1 scope and milestones.
- For commands, follow [`cli-contract.md`](cli-contract.md).

## Planned Expansions
- Add a parity matrix vs the legacy Python implementation.
- Add a visual summary of backend flow (local vs redmine) and canonical source switching.
- Include a primer on the task ID format (`YYYYMMDDHHMM-<RAND>`).

## Legacy note
The repository currently contains a legacy Python workflow helper (`agentctl`) under `.agent-plane/`. The docs in `docs/` describe the target Node.js `agentplane` behavior.
