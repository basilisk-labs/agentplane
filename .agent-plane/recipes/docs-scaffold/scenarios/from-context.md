# Docs scaffold (from feature context)

## Goal
Generate a documentation scaffold for a new feature or workflow.

## Required inputs
- `docs_slug`: {{docs_slug}}
- `doc_title`: {{doc_title}}
- `feature_summary`: {{feature_summary}}

## Optional inputs
- `audience`: {{audience}}
- `prerequisites`: {{prerequisites}}
- `step_overview`: {{step_overview}}
- `examples`: {{examples}}
- `references`: {{references}}
- `related_docs`: {{related_docs}}

## Hard rules
- Do not overwrite existing docs. If the target file exists, output **Pending Actions**.
- Do not invent missing details; ask for them in **Pending Actions**.
- Keep the scaffold consistent with current docs structure.

## Agent flow
1) **ORCHESTRATOR** — confirm scope and missing inputs.
2) **DOCS** — draft scaffold sections and placeholders.
3) **REVIEWER** — check structure and completeness.

## Outputs
- `docs/{{docs_slug}}.md`

## Pending Actions
If required inputs are missing or the target file exists:
- list 3-7 clarifying questions;
- list required repo files/paths.
