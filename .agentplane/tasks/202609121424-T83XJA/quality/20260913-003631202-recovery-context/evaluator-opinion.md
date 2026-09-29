# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- [P1] packages/core/src/runner/supervisor-execution-episode.ts starts pairwise overlap validation at array index 1 instead of excluding the span identified by root_span_id. A direct reproduction through completeSupervisorExecutionEpisode with sibling spans at indices 0 and 1 and the valid root at index 2 was accepted, even though the siblings cover [0,8] and [2,10]. The durable schema does not specify span ordering, so callers or persisted journals can bypass the ST-13 non-overlap invariant by placing the root anywhere except index 0. Iterate all unordered pairs and skip pairs containing root_span_id, or explicitly enforce root-first ordering; add a root-last regression case.
- Residual risk: Until overlap validation is order-independent, malformed, migrated, or future caller-generated timing can bypass the durable no-double-counting contract.

## Evidence
- .agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/d4e7310d448a9bad3d139cf158f5e810d45ac42709033c920852a2bb59d7a67b.patch

## Missing Tests
- Add a canonical journal negative test with overlapping siblings before a root-last span; it must reject the record independently of array ordering.

## Hidden Assumptions
- The pairwise loop assumes timing.spans[0] is the root, but the schema identifies the root only by root_span_id and does not require array order.

## Residual Risks
- Rework is still required because sibling-overlap validation depends on the root span being the first array element.
