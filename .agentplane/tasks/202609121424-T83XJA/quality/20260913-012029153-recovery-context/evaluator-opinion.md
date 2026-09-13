# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- Unknown usage permits further paid dispatch when provider identity is absent. A read-only reproduction completed an unallocatable external episode under finite token budgets; the next evaluator episode returned started with zero charged tokens.
- Managed restart recovery reads usage from a process-local WeakMap using a deserialized saved result. That lookup returns null, so recovery records unavailable usage despite an existing durable provider observation.
- An interruption after persisting an evaluator failure receipt but before journal completion leaves its charge unreconciled. Restart recovery requires a successful typed result and success receipt; a saved failure receipt instead leads to effect_in_doubt.

## Evidence
- .agentplane/tasks/202609121424-T83XJA/quality/objects/sha256/d878ded673bee0d3e92acec00a58b3e4abf398657b1af8c6d7acc0581a600eca.patch

## Missing Tests
- Finite token budgets must reject paid dispatch after an unavailable or unallocatable episode without provider identity.
- Restart after saving a managed result but before journal completion must recover durable observed tokens exactly once.
- Restart after saving an evaluator failure receipt but before journal completion must reconcile its charge without redispatch.

## Hidden Assumptions
- Missing provider identity implies an operation need not affect token-budget admission.
- Process-local usage associations remain available after saved results are deserialized.
- Evaluator failure receipt persistence and journal completion cannot be interrupted.

## Residual Risks
- All frozen evidence digests matched, and recorded checks report success. R1 was reproduced with an in-memory read-only check; R2 and R3 follow from the recovery paths. Add restart-boundary coverage and reconcile durable observations before reconsidering admission. Preserve saved semantic outcomes and avoid repeating paid dispatch.
