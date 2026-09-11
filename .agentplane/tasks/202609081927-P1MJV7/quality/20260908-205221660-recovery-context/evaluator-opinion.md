# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- P2: verification-infrastructure.ts:131 exempts every status line beginning with the task artifact prefix. A staged rename from .agentplane/tasks/<task>/README.md to source.ts begins with that prefix, so retry can run after a source change while preserving the old implementation identity. Restrict exemptions to known managed artifacts and reject rename or quoted/ambiguous status records. The frozen actual-diff artifact contains this predicate.
- Residual risk: Managed adapters still start fresh processes; resolver delta measurements are not provider-session savings.

## Evidence
- .agentplane/tasks/202609081927-P1MJV7/quality/objects/sha256/fcd00b08c0b4cf1c47f17bd7226ca020feb8f79ca5caf99afc6280cbb05c5338.patch

## Missing Tests
- A confirmed infrastructure failure with a staged rename from a managed task artifact to a source file must reject retention/retry; unknown files under the task directory must not receive a blanket metadata exemption.

## Hidden Assumptions
- The retry freshness predicate assumes a porcelain status line names only one task-owned path.

## Residual Risks
- Change only the retry source-status classification to reuse the managed-artifact allowlist, reject renames and ambiguous quoted paths, and add focused negative tests. Preserve the passing native ENOSPC replay, schema object, and context behavior. Return through a fresh executor packet.
