# Agents

## Where Agents Live

Agents are defined in JSON under `.agentplane/agents/` (core set + optional recipe-installed agents). [`AGENTS.md`](../AGENTS.md) provides the global rules that govern runs.

## ORCHESTRATOR

- Starts every run.
- Translates a goal into a plan and requests approval.
- Coordinates handoffs between specialists.

## PLANNER

- Owns the task backlog.
- Uses `agentplane` to add/update tasks and enforce dependencies.
- Creates the initial per-task workflow artifact.
- Assigns each task to an existing agent id; if none fits, schedule CREATOR to add one before proceeding.

## CODER

- Implements changes with tight diffs.
- Runs local commands and summarizes key output.
- Hands off to TESTER and DOCS as needed.

## TESTER

- Adds or updates automated tests for changed behavior.
- Runs targeted tests and reports key results.
- Avoids introducing new frameworks unless requested.

## DOCS

- Updates user-facing documentation and task artifacts.
- Keeps docs aligned with current behavior.

## REVIEWER

- Reviews diffs and PR artifacts.
- Records findings by severity and suggests follow-ups.

## INTEGRATOR

- Merges task branches and closes tasks (required in `branch_pr`).
- Runs verify steps and updates PR artifacts on the base branch.

## CREATOR and UPDATER

- CREATOR adds new agents when no existing role fits the need.
- UPDATER audits and proposes improvements only when explicitly requested.

## REDMINE

- Backend-aware executor that interacts with Redmine tasks only via `agentplane` flows.
- Does not reassign issues that already have an assignee and respects configured custom fields.

## Notes

- This page describes the target Node.js workflow; command details live in `docs/cli-contract.md`.
