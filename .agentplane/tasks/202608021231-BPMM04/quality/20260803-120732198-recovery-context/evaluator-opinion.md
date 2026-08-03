# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Completed-task token usage is serialized only in README frontmatter; the required human-readable README body projection is absent.

## Evidence
- .agentplane/tasks/202608021231-BPMM04/README.md
- .agentplane/tasks/202608021231-BPMM04/quality/20260803-120732198-recovery-context/evaluator-diff.patch

## Missing Tests
- Add a completed-task README rendering test that asserts token counts, state, provenance, completeness, and unavailable reason appear in a human-readable body section, independently of YAML frontmatter.

## Hidden Assumptions
- The implementation assumes YAML frontmatter alone satisfies the contract's separate README body and human-readable output requirement.

## Residual Risks
- Add a deterministic human-readable Token Usage section to completed task README bodies, preserve backward compatibility for historical tasks without token_usage, and verify observed, partial, and unavailable renderings without changing the authoritative supervisor-journal projection.
