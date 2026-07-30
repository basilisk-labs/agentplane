# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The bounded knowledge-request handler is exported but never invoked by a CLI or runner episode path, so an EXECUTOR/EVALUATOR request cannot receive the promised response or durable run audit.
- The declared task_context scope constrains only projection kind, not task identity or authorized paths; retrieval searches the repository-wide context projection and may return unrelated context.

## Evidence
- .agentplane/tasks/202607221852-01ACZ9/quality/20260730-134905320-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221852-01ACZ9/quality/20260730-134905320-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607221852-01ACZ9/README.md

## Missing Tests
- An end-to-end runner/CLI test that consumes a needs_context semantic result, serves the request, returns the bounded response, and verifies that the audit is persisted and reused on the next round.
- A negative authorization test proving task_context retrieval cannot return a matching document outside the current task/work-order context or allowed authority roots.
- A restart/recovery test proving persisted audits, rather than caller-supplied in-memory arrays alone, enforce round limits and repeated-unresolved escalation.

## Hidden Assumptions
- A later caller will invoke serveTaskKnowledgeRequest and persist its audit even though no such lifecycle integration is included.
- Filtering by desired_kind is sufficient to implement task_context scope.
- Prior audits supplied by a caller are complete, digest-valid, and durably recovered for the run.

## Residual Risks
- Connect the handler to the actual CLI/runner semantic-result path, persist and reload its audit by run/work-order binding, and enforce task/authority path boundaries before accepting retrieval candidates; then add end-to-end and cross-task denial coverage.
