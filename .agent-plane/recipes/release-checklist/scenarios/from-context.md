# Release checklist (from release context)

## Goal
Create a release checklist with verification, rollout, and rollback steps.

## Required inputs
- `release_slug`: {{release_slug}}
- `release_title`: {{release_title}}
- `deploy_targets`: {{deploy_targets}}

## Optional inputs
- `rollout_steps`: {{rollout_steps}}
- `verification_steps`: {{verification_steps}}
- `rollback_plan`: {{rollback_plan}}
- `risk_areas`: {{risk_areas}}
- `communications`: {{communications}}
- `constraints`: {{constraints}}

## Hard rules
- Do not invent deployment details. Missing inputs must trigger **Pending Actions**.
- Keep the checklist actionable and ordered.
- Avoid editing tasks directly; use agentctl if needed and confirmed.

## Agent flow
1) **ORCHESTRATOR** — confirm scope and missing inputs.
2) **CODER** — draft rollout/rollback and verification steps.
3) **REVIEWER** — verify completeness and sequencing.

## Outputs
- `.agent-plane/.runs/{{run_id}}/artifacts/{{release_slug}}.release.md`

## Pending Actions
If required inputs are missing:
- list 3-7 clarifying questions;
- list required repo files/paths.
