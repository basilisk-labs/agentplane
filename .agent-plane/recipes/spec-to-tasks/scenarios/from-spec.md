# Spec to tasks (from spec text)

## Goal
Convert a written specification into a task batch and plan that can be imported via agentctl.

## Required inputs
- `spec_slug`: {{spec_slug}}
- `spec_title`: {{spec_title}}
- `spec_text` (markdown/plain):
{{spec_text}}

## Optional inputs
- `constraints`: {{constraints}}
- `acceptance_criteria`: {{acceptance_criteria}}
- `task_batch_size`: {{task_batch_size}}
- `task_granularity`: {{task_granularity}}
- `repo_paths_allowlist`: {{repo_paths_allowlist}}

## Hard rules
- Do not invent repository facts or components. If data is missing, output **Pending Actions**.
- Any task creation or updates must go through **agentctl** (do not write to `.agent-plane/tasks/**`).
- Every task must include `verification` and `files_touched` (use "TBD" if unknown).
- Follow the allowlist of paths:
{{repo_paths_allowlist}}

## Agent flow
1) **ORCHESTRATOR** — confirm scope and missing inputs.
2) **PLANNER** — map the spec into milestones and dependencies.
3) **CODER** — derive implementation steps and risks.
4) **REVIEWER** — validate completeness and feasibility.

## Outputs
- `.agent-plane/.runs/{{run_id}}/artifacts/{{spec_slug}}.plan.json`
- `.agent-plane/.runs/{{run_id}}/artifacts/{{spec_slug}}.tasks.draft.md`

## Pending Actions
If the spec is incomplete:
- list 3-7 clarifying questions;
- list required repo files/paths.
