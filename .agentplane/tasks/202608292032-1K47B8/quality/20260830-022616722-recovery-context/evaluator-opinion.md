# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 7 typed finding(s).

## Findings
- Current effect recovery, expiry, terminal mutation and external-effect kind checks pass review. All nine frozen evidence hashes match.
- PR #5877 comment 3887810648 is reproduced: an AGENT with DELEGATED authority can approve a proposed plan using an unrelated evidence digest and becomes its approver. Bind approval to the actual USER actor, root USER authority and the exact evidence digest.
- Comment 3887810650 is partly mitigated by WorkItem state gating, but final validation still accepts unfinished WorkItems and malformed check identity. Reject premature final validation and validate its full identity before entering FINAL_VALIDATION.
- Comment 3887810657 is reproduced: amend_plan emits acceptance while current_plan is byte-identical and amendment_digest disappears. Carry typed replacement plan content, apply it canonically, retain approved authority provenance only for a demonstrably non-expanding amendment, and reject unsafe runtime changes.
- Comment 3887810661 remains: localeCompare is environment-dependent. Use fixed code-unit key ordering and test non-ASCII keys against canonical ordering.
- Comment 3887810644 is only partly addressed. WorkItem/effect definitions lack explicit execution requirements, so the reducer cannot enforce their required scope, capabilities, repository effects and resources. Represent these requirements and check the declared operation against its grant before work or effects are admitted.
- Residual risk: M2 must not consume these incomplete domain contracts.

## Evidence
- .agentplane/tasks/202608292032-1K47B8/quality/objects/sha256/3dd6f4403a5f554c55142963371a7073049d6182f7d27407b73e562303e9abce.patch

## Missing Tests
- Reject delegated self-approval, wrong USER identity and mismatched decision evidence; accept exact user-backed approval.
- Reject final validation before required WorkItem completion and reject malformed check identities.
- Apply typed plan amendment content; preserve unchanged completed runtime and reject widened authority, invalid graphs and unsafe in-flight replacement.
- Prove locale-independent canonical digest ordering.
- Reject declared WorkItem/effect capability, resource, scope and effect requirements outside the grant.

## Hidden Assumptions
- Boundary adapters cannot repair a kernel that accepts unsupported authority or drops accepted plan content.

## Residual Risks
- Address all remaining #5877 findings together inside the existing task-kernel scope. Keep the existing fixes. Add explicit typed execution requirements and enforce their subset for WorkItem execution and effect preparation. Require USER-backed approval. Reuse the completion predicate for final-validation readiness and require full validation identity. Implement a typed non-expanding amendment at a safe boundary with canonical plan/runtime updates, immutable prior-plan history and preserved original approval provenance; reject changes that would reuse invalidated completed output. Replace localeCompare with code-unit ordering. Extend existing tests, refresh qualification hashes, run focused tests, typecheck, ESLint and full CI. Do not change public CLI behavior, add provider calls or edit task state manually.
