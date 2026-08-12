# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The compiled contract always forbids every external effect, including declared network_read when configuration does not require network approval. The resolver may simultaneously report that no approval is required, while work-order projection grants no external authority and later observation treats the effect as unauthorized.
- The change contains no user-facing workflow documentation and no realistic E2E suite demonstrating or measuring the five required scenarios; the supplied verification record only summarizes aggregate fast-CI results without scenario-level command, approval, transition, timing, preservation, or recovery-command measurements.

## Evidence
- .agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/0bb3d05369643420ff35635cb541ea7c40e1c6c96420bd51a5f79ca7878d3db8.patch
- .agentplane/tasks/202608112232-3NC7Y4/verification/20260812032704488-c2f68cb908a493bb.json

## Missing Tests
- A contract-resolution and work-order projection test for declared network_read with require_network=false, proving that approval requirements and allowed external authority agree.
- Realistic CLI E2Es for localized direct work, broad branch_pr work, preserved-work escalation, prohibited external/destructive effects, and misleading product language, with assertions for command count, approvals, transitions, verification time, preserved changes, and recovery-command count.
- A compatibility E2E loading an existing project without manual migration and completing the canonical lifecycle.

## Hidden Assumptions
- Declaring an external effect is assumed never to grant authority, but no post-approval contract-compilation mechanism is evidenced that can grant deterministic authority when the effect is permitted.
- Aggregate fast-CI success is assumed to demonstrate the scenario-level UX and ceremony measurements required by the task.
- Existing brief/readback output is assumed sufficient documentation despite the explicit requirement to update docs.

## Residual Risks
- Align external-effect approval and authority semantics so the authoritative contract can represent permitted effects, then add the required documented, measured E2E evidence for all acceptance scenarios.
