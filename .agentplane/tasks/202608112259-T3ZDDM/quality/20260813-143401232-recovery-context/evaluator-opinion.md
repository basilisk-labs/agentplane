# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The comparator preserves the old extensions.implementation_commit across lifecycle-only descendants but rejects the required one-time rotation to the exact verified parent after new non-task implementation changes. Without that rotation, the next closure cannot bind current verification to the new implementation. Permit rotation only to parentSha when oldImplementation..parentSha contains non-task implementation paths; keep arbitrary ancestor substitution rejected.

## Evidence
- .agentplane/tasks/202608112259-T3ZDDM/quality/objects/sha256/cf2af8647ed2afb0c512d69c5b7d4f51549eef0b05539bca2a12a19896c37ec5.patch

## Missing Tests
- A lifecycle closure immediately after a new implementation commit whose parent README still declares an older implementation identity.

## Hidden Assumptions
- The parent of every lifecycle closure already declares itself as implementation_commit, which is false when verification and closure follow a new code commit.

## Residual Risks
- Update identity resolution to allow rotation only to exact parentSha when the range from the prior implementation identity to parentSha contains at least one non-task-artifact change; add positive rotation and negative arbitrary-ancestor/task-only tests, then repeat focused, full-fast, hosted, and evaluator evidence.
