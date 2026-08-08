# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- A future plan with only nextVersion or only nextTag is classified as valid and permits candidate preparation.
- Version ordering converts arbitrary semver numeric components to Number, so values beyond the safe-integer range can compare incorrectly.

## Evidence
- .agentplane/tasks/202608080355-G5FXDA/quality/objects/sha256/f80832943bfb517107b04fb8c0176bea60ce9b79cc5508f6c21331d9c1413f93.patch

## Missing Tests
- A future latest_plan containing nextVersion but no nextTag must request ap release plan --patch.
- A future latest_plan containing nextTag but no nextVersion must request ap release plan --patch.
- Ordering tests must cover numeric components beyond Number.MAX_SAFE_INTEGER or the parser must explicitly reject them.

## Hidden Assumptions
- Every persisted latest_plan always contains both nextVersion and nextTag, although the implementation accepts partial objects.
- Release version numeric components always fit within JavaScript's safe-integer range.

## Residual Risks
- Require complete, mutually consistent nextVersion and nextTag metadata before classifying a plan as future, use precision-safe ordering or reject unsafe numeric components, and add the corresponding negative fixtures before reevaluation.
