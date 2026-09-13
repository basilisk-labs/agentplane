# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- [P1] packages/core/src/runner/supervisor-execution-episode.ts verifies that partitioned_ms sums to elapsed_ms, but it never derives category totals from the validated span hierarchy and compares them with partitioned_ms. A direct completion API reproduction supplied a 10 ms root plus a full-interval semantic_dispatch child labeled external_wait, while partitioned_ms claimed local_work: 10 and external_wait: 0; completeSupervisorExecutionEpisode accepted and persisted the contradictory record. ST-13 requires local work, USER wait, and external wait to be labeled separately, and the journal is the durable trust boundary. Recompute the non-overlapping category partition from span boundaries using the deepest active span and reject any mismatch; add negative coverage for a reconciled total assigned to the wrong category.
- Residual risk: Without category reconciliation, malformed, migrated, or future caller-generated journals can report trustworthy-looking total latency while misclassifying provider, USER, or local time.

## Evidence
- .agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/3e01e98971dc7a407b32d86adf49bb3251e465c27cbff9ee30aa68e476abf71c.patch

## Missing Tests
- Add a canonical journal negative test that supplies category totals which sum to elapsed_ms but contradict the deepest active span categories.

## Hidden Assumptions
- The implementation assumes partitioned_ms always comes from buildMonotonicLifecycleTiming, although the durable schema validates caller-supplied lifecycle_timing independently.

## Residual Risks
- The root-order overlap bypass is fixed, but rework is required because durable partition totals are not validated against span categories.
