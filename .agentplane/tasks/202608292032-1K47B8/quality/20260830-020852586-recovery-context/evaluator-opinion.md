# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 4 typed finding(s).

## Findings
- On EFFECT_IN_DOUBT with one uncertain effect, observe_effect APPLIED succeeds but leaves Task EFFECT_IN_DOUBT. Both transition_task resume and reconcile_effect then reject, leaving no legal recovery route. supersede_effect has the same stale task-state risk; reconciling one of several uncertain effects must not resume prematurely.
- prepare_effect accepts a COMPLETED Task. Terminal states must not acquire new work or effects. Reject new terminal mutations while preserving idempotent receipt replay.
- prepare_effect accepts effect kind pr.merge with authority.external_effects empty. Require explicit matching effect authority before preparing a provider operation.
- Residual risk: M2 would inherit an unrecoverable effect route and could schedule an ungranted provider operation.

## Evidence
- .agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/9ce711649887bc636881f16928a22670e786265ea0c117f13d2613bc1b6f5fc2.patch

## Missing Tests
- End-to-end uncertain effect observation and reconciliation to a resumable Task, including multiple unresolved effects and supersession.
- New commands on terminal Tasks reject while duplicate mutation receipt replay remains unchanged.
- Effect preparation rejects absent or mismatched external-effect authority and accepts the matching grant.

## Hidden Assumptions
- The effect-state transition table alone does not prove task-state recovery or preparation authorization.

## Residual Risks
- Keep all reviewed fixes. Add failing regressions for the three reproduced effect cases. Derive Task recovery state from remaining uncertain effects for observe, reconcile and supersede operations. Reject new terminal-state mutations after idempotency checks. Restrict effect preparation to active execution phases and an explicitly matching external-effect grant. Refresh qualification receipt source hashes and rerun focused checks and full CI. Do not add providers, modify task state manually or expand implementation paths.
