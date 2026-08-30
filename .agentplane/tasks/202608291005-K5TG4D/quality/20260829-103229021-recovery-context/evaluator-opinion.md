# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 6 typed finding(s).

## Findings
- ADR 0017 and the rebuild specification cover the target kernel, code ownership, invariants, adapters, migration, replay, dual-run, rollback, milestone gates, and the legacy roadmap traceability matrix.
- The implementation is limited to documentation and the supervisor recorded docs IA and formatting as passing at evaluated SHA c648b8727f1a1c648876ca060d25a92ed24f7dc1.
- docs/adr/README.md indexes ADR 0001 through ADR 0016 but does not index the newly added ADR 0017.
- The persisted Verify Steps section remains the generic PLANNER fallback even though acceptance-2 requires task-specific acceptance checks.
- Residual risk: Publishing without the index entry leaves the architecture decision undiscoverable from the canonical ADR list.
- Residual risk: Keeping generic Verify Steps weakens the persisted acceptance contract for later review and recovery.

## Evidence
- .agentplane/tasks/202608291005-K5TG4D/quality/objects/sha256/991fe4f8cfd40b027fed1e34442956c77ba8324246953e0dfae571500cb2b31d.patch

## Missing Tests
- none recorded

## Hidden Assumptions
- Passing docs IA was treated as sufficient index coverage even though the repository maintains a separate human ADR index.

## Residual Risks
- Add docs/adr/README.md to the bounded documentation scope and index ADR 0017. Replace the task Verify Steps through the standard AgentPlane task-document command with concrete checks for code-map coverage, kernel boundary, migration and replay contract, full legacy-task disposition, docs IA, formatting, and residual findings. Re-run the declared checks and obtain a fresh evaluator review.
