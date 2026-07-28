# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Verification-record admission does not validate the record's task_id, schema_version, or self-digest. A copied or modified JSON record can therefore be admitted as current evidence when its timestamp, verification fields, implementation SHA, scope digest, and details match, even though it was not proven to be the durable record produced for this task.

## Evidence
- .agentplane/tasks/202607282157-FT85MC/quality/20260728-230911568-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607282157-FT85MC/verification/20260728230853498-d66d9c9cbd276c1e.json

## Missing Tests
- Copy an otherwise matching verification record from another task into the current task verification directory and assert that evaluator preparation rejects or excludes it.
- Modify a persisted verification record without recomputing its digest and assert that evaluator preparation rejects or excludes it.
- Reject records with an unsupported schema_version even when all currently compared fields match.

## Hidden Assumptions
- Any JSON file located under the current task's verification directory is assumed to belong to that task without checking task_id.
- The record digest is assumed trustworthy even though admission neither recomputes nor compares it.
- Matching task verification metadata, evaluated SHA, scope digest, and formatted details is assumed sufficient proof that the supported verification command produced the record.

## Residual Risks
- Bind verification-record admission to the current task_id and supported schema_version, recompute and validate the record digest using the canonical serialization contract, add cross-task-copy and tamper regression tests, then rerun the full evaluator evidence verification set.
