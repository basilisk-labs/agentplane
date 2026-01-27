# Task → roadmap (refactor existing)

## Goal
Convert an existing implementation into a refactor roadmap:
- define the target architecture and migration strategy,
- keep compatibility constraints explicit,
- produce a detailed, incremental plan with rollback steps.

## Required inputs
- `roadmap_slug`: {{roadmap_slug}}
- `roadmap_title`: {{roadmap_title}}
- `existing_paths` (where to look in the repo):
{{existing_paths}}
- `pain_points`:
{{pain_points}}

## Optional inputs
- `compat_constraints`: {{compat_constraints}}
- `constraints`: {{constraints}}
- `risk_level`: {{risk_level}}
- `acceptance_criteria`: {{acceptance_criteria}}
- `milestone_count`: {{milestone_count}}
- `task_batch_size`: {{task_batch_size}}
- `task_granularity`: {{task_granularity}}

## Hard rules
- Avoid "big bang" rewrites; propose an incremental migration if risk is high.
- Every change must include a minimal rollback strategy.
- Include a dedicated task for tests/invariants.

## Agent flow
1) **ORCHESTRATOR** — restates scope and flags missing inputs.
2) **PLANNER** — defines migration phases and sequencing.
3) **CODER** — produces refactor steps, tests, and cleanup tasks.
4) **REVIEWER** — checks risk, reversibility, and completeness.

## Outputs
- `{{output_dir}}/{{roadmap_slug}}.roadmap.md`
- `{{runs_dir}}/{{run_id}}/artifacts/{{roadmap_slug}}.plan.json`
- `{{runs_dir}}/{{run_id}}/artifacts/{{roadmap_slug}}.tasks.draft.md`
- `{{runs_dir}}/{{run_id}}/artifacts/{{roadmap_slug}}.migration.md`
