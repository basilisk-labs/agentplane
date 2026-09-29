# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- [P1] packages/core/src/runner/supervisor-execution-episode.ts validates timing totals, identities, parent existence, and root bounds, but it does not reject overlapping non-ancestor spans. A direct reproduction through completeSupervisorExecutionEpisode persisted sibling spans [0,8] and [2,10] while partitioned_ms still claimed a reconciled total of 10. The local builder rejects this shape, but the canonical journal is a persisted trust boundary and its public completion API accepts caller-supplied lifecycle_timing. Add schema-level hierarchy, root, cycle, and sibling-overlap validation plus a negative core test so malformed or migrated journals cannot violate ST-13 acceptance.
- Residual risk: Without schema-level structural validation, corrupted, historical, or future caller-generated timing can claim reconciled partitions while its spans overlap, undermining cost and latency analysis.

## Evidence
- .agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/1a97cd233f305b740f12f26776deecf8a06c0e9bd64a878412f1ba2d89204faa.patch

## Missing Tests
- A core negative test must prove that the canonical journal validator rejects overlapping sibling lifecycle spans, invalid root coverage, cycles, and invalid nesting independently of the local timing builder.

## Hidden Assumptions
- The implementation assumes every lifecycle_timing value reaches the journal through buildMonotonicLifecycleTiming, although completeSupervisorExecutionEpisode exposes lifecycle_timing as caller-supplied input and persisted journals are independently validated.

## Residual Risks
- Rework is required because the durable lifecycle timing schema does not enforce its non-overlap invariant.
