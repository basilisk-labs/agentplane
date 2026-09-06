# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- P1: packages/agentplane/src/commands/task/external-agent-workflow-recovery.ts:219 compares typed.authorityRef to resolution.authority_ref, but the native workflow operation uses route:<task>:<fingerprint> while the supervisor journal uses workflow-operation:integration.run_next (shared/supervisor-execution-episode.ts:489). A legitimately captured new snapshot therefore always fails assertOriginalIdentity. The synthetic snapshot fixture masks this by assigning the journal authority string to both namespaces. Evidence: .agentplane/tasks/202609060720-NZXQ0E/quality/objects/sha256/62a42b5f83921de780b3d316bf1f1cfa892c67ad48b2ebe8a5e7133bf9a6b43b.patch
- Residual risk: The PH5N6S operator decision remains separate from code qualification; its journal must stay unchanged until the exact supported operator recovery is available.

## Evidence
- .agentplane/tasks/202609060720-NZXQ0E/quality/objects/sha256/62a42b5f83921de780b3d316bf1f1cfa892c67ad48b2ebe8a5e7133bf9a6b43b.patch

## Missing Tests
- Public task advance recovery using a durable snapshot with native route:<task>:<fingerprint> operation authority and separate workflow-operation:integration.run_next journal authority. Include exact replay after recovery.

## Hidden Assumptions
- The fixture incorrectly assumes the typed workflow operation authority reference equals the supervisor journal wrapper authority reference.

## Residual Risks
- Fix only the namespace comparison in the existing external-agent-workflow-recovery.ts owner. Preserve exact journal authority binding and validate the original typed route authority against its own task/fingerprint. Correct the synthetic fixture and add a real-Git native snapshot regression that fails before the fix and passes afterward. Retain all lease, queue, CAS, stale/foreign/effect checks. Use a fresh bounded implementation packet; request the narrow scope refinement if the packet omits this already-task-owned source path.
