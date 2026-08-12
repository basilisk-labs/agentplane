# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- Observed changes are compared only by effect category, not against the declaration's writable scope. A change outside authority.writable_roots is accepted when its structural effect was declared, so the compiled contract does not enforce its own path authority or detect component drift.
- The localized direct and broad branch_pr scenarios stop after planning and route readback. They execute no work, verification, evaluator, or finish path; verification_time_ms is asserted as zero. Consequently they do not provide the requested realistic end-to-end ceremony and evidence comparison, despite the verification record describing them as realistic CLI cases.

## Evidence
- .agentplane/tasks/202608112232-3NC7Y4/quality/objects/sha256/ef041548ca51db681b579a95e76aad0b1b468b8dd69dd53ab76a766298320a9f.patch
- .agentplane/tasks/202608112232-3NC7Y4/README.md
- .agentplane/tasks/202608112232-3NC7Y4/verification/20260812042023781-2f0397ef68cb6177.json

## Missing Tests
- A reconciliation test where the declaration permits source_code only under one writable root but an observed source file changes in another component; it must record a scope authority violation and return the canonical escalation or stop action.
- Full lifecycle E2Es for compatible localized direct and agent-selected broad branch_pr work, from assessment through implementation, verification, evaluator/finish boundary, with non-placeholder verification timing and explicit command, approval, transition, preservation, and recovery counts.
- A before/after assertion demonstrating that localized direct work uses fewer commands, approvals, or transitions than significant branch_pr work while still satisfying its derived required evidence.

## Hidden Assumptions
- Structural effect equality is assumed to imply writable-scope compliance.
- Planning-route integration tests are assumed to satisfy full lifecycle E2E requirements.
- Zero verification time is assumed to be a meaningful verification measurement for scenarios that never invoke verification.

## Residual Risks
- Enforce observed changed paths/components against declared writable scope, then extend the localized direct and agent-selected branch_pr scenarios through work, verification, and finish/evaluator boundaries with explicit ceremony and evidence comparisons.
