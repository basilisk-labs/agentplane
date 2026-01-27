# Task → roadmap (from text)

## Goal
Transform a top-level task description into:
1) a detailed roadmap (milestones, deliverables, dependencies, risks, verification);
2) a structured plan JSON for downstream orchestration;
3) a tasks draft ready for agentctl transfer.

## Required inputs
- `roadmap_slug`: {{roadmap_slug}}
- `roadmap_title`: {{roadmap_title}}
- `task_description` (markdown/plain):
{{task_description}}

## Optional inputs
- `constraints`: {{constraints}}
- `non_goals`: {{non_goals}}
- `acceptance_criteria`: {{acceptance_criteria}}
- `success_metrics`: {{success_metrics}}
- `stakeholders`: {{stakeholders}}
- `dependencies`: {{dependencies}}
- `target_scope`: {{target_scope}}
- `risk_level`: {{risk_level}}
- `milestone_count`: {{milestone_count}}
- `task_batch_size`: {{task_batch_size}}
- `task_granularity`: {{task_granularity}}

## Hard rules
- Do not invent repo-specific facts or components. If data is missing, output **Pending Actions**.
- Any task creation or updates must go through **agentctl** (do not write to `.agent-plane/tasks/**` directly).
- Every task must be verifiable: include `verification` and `files_touched` (use "TBD" if unknown).
- Follow the allowlist of paths:
{{repo_paths_allowlist}}

## Agent flow
1) **ORCHESTRATOR** — restates scope and flags missing inputs.
2) **PLANNER** — defines milestones, dependencies, and sequencing.
3) **CODER** — derives implementation steps, test strategy, and risks.
4) **REVIEWER** — checks completeness, feasibility, and risk coverage.

## Outputs
- `{{output_dir}}/{{roadmap_slug}}.roadmap.md`
- `{{runs_dir}}/{{run_id}}/artifacts/{{roadmap_slug}}.plan.json`
- `{{runs_dir}}/{{run_id}}/artifacts/{{roadmap_slug}}.tasks.draft.md`

## Pending Actions
If the task is too abstract or requires repository inspection:
- list 3–7 clarifying questions;
- list which repo files/paths must be reviewed.
