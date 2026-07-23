# Semantic quality review: rework

Provenance: evaluator_supplied

Code, route, provenance, and evidence checks pass, but the committed workflow migration social card has a clipped title and requires visual rework.

## Findings
- website/static/img/social/docs/user/workflow-migration.png clips the 'Workflow migration and recovery' title at the right edge; the previous main artifact wrapped without clipping.

## Evidence
- .agentplane/tasks/202607221846-YGWMA2/README.md
- website/static/img/social/docs/user/workflow-migration.png
- docs/user/workflow-migration.mdx:2

## Missing Tests
- none recorded

## Hidden Assumptions
- none recorded

## Residual Risks
- The automated social freshness check validates freshness but does not detect layout clipping.
