# Task → roadmap (from issue)

## Goal
Build a roadmap and task draft from an issue/ticket without relying on network access.
If the environment allows network access, it can be used only after explicit user approval.

## Required inputs
- `roadmap_slug`: {{roadmap_slug}}
- `roadmap_title`: {{roadmap_title}}
- `issue_url`: {{issue_url}}
- `issue_body` (paste the issue text here):
{{issue_body}}

## Optional inputs
- `issue_comments`: {{issue_comments}}
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
- Do not rely on the network; treat URLs as unavailable unless data is explicitly provided.
- Do not invent repository context. If files are needed, list them in **Pending Actions**.

## Agent flow
1) **ORCHESTRATOR** — restates scope and flags missing inputs.
2) **PLANNER** — extracts requirements and defines milestones.
3) **CODER** — derives implementation steps, test strategy, and risks.
4) **REVIEWER** — checks completeness, feasibility, and risk coverage.

## Outputs
- `{{output_dir}}/{{roadmap_slug}}.roadmap.md`
- `{{runs_dir}}/{{run_id}}/artifacts/{{roadmap_slug}}.plan.json`
- `{{runs_dir}}/{{run_id}}/artifacts/{{roadmap_slug}}.tasks.draft.md`

## Pending Actions
If the issue is incomplete:
- list missing inputs and minimal clarifying questions.
