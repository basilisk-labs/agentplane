# QA plan (from release context)

## Goal
Produce a QA checklist and test plan for a release or deployment.

## Required inputs
- `release_slug`: {{release_slug}}
- `release_title`: {{release_title}}
- `scope_summary`: {{scope_summary}}

## Optional inputs
- `risk_areas`: {{risk_areas}}
- `environments`: {{environments}}
- `existing_tests`: {{existing_tests}}
- `constraints`: {{constraints}}
- `non_goals`: {{non_goals}}
- `target_date`: {{target_date}}

## Hard rules
- Do not invent repository facts. If inputs are missing, output **Pending Actions**.
- Do not create tasks directly; use agentctl if task updates are required and confirmed.
- Keep the plan focused on the stated scope and environments.

## Agent flow
1) **ORCHESTRATOR** — confirm scope and missing inputs.
2) **TESTER** — draft QA checklist, test matrix, and risk coverage.
3) **REVIEWER** — validate completeness and gaps.

## Outputs
- `.agent-plane/.runs/{{run_id}}/artifacts/{{release_slug}}.qa.md`

## Pending Actions
If required inputs are missing:
- list 3-7 clarifying questions;
- list required repo files/paths.
