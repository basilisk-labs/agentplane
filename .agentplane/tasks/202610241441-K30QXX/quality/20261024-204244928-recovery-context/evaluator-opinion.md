# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 4 typed finding(s).

## Findings
- In packages/agentplane/src/commands/task/external-agent-supervisor-recovery.ts:465-495, the new guard checks exchange identity, WorkOrder task, operation role, and effect_ref. It omits journal.task_id === opts.task_id and operation.precondition_fingerprint_digest === exchange.state_fingerprint. externalAgentIssueDigest binds the exchange and WorkOrder, but does not bind these two journal fields. A validly shaped mismatched journal can therefore satisfy the guard and be retired when its unrelated precondition differs from the current fingerprint. This conflicts with the approved exact supervisor intent identity requirement.
- The new result_digest guard test in external-agent-read-only-observation.test.ts correctly preserves an issued exchange with a recorded result digest. The running/effect_in_doubt, prepared/issued, unchanged-boundary, returned-result, mutation-capable, and interrupted-retirement cases are present.
- Native verification record 20261024204059763-1fe8d93b36de0f61 reports focused tests, lint:core, and ci:local:full passed. These checks do not cover the mismatched journal identity case. The working tree has evaluator-preparation artifacts; this read-only review did not modify source files.
- Residual risk: If identity fields mismatch, retirement can discard an unrelated unresolved supervisor intent instead of failing closed.

## Evidence
- .agentplane/tasks/202610241441-K30QXX/quality/objects/sha256/b137b4513ee77b5ff2ec3abe19dfadf41dbe47553fd0238db77b1e027abe602e.patch

## Missing Tests
- Add a regression that changes only journal.task_id or operation.precondition_fingerprint_digest while preserving exchange/WorkOrder/effect_ref, then confirms recovery rejects the mismatch without retiring the exchange or changing the journal.

## Hidden Assumptions
- The implementation assumes the journal path and effect_ref prove journal.task_id and operation.precondition_fingerprint_digest. The issue digest does not include either journal field.

## Residual Risks
- Add explicit historical journal identity checks before any exchange write or CAS in the read-only drift path. Reuse the existing assertExternalAgentSupervisorIntent requirements where appropriate. Run the focused test, lint:core, and native declared verification after the correction.
