# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Declared read-only capabilities still resolve to the full mutable CommandContext, so capability isolation is not enforced at the returned port boundary.

## Evidence
- .agentplane/tasks/202607221908-YD5J89/quality/20260801-085548551-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221908-YD5J89/README.md
- .agentplane/tasks/202607221908-YD5J89/verification/20260801085448940-7ec1ee4f4101f389.json

## Missing Tests
- A read-only evaluator or context handler should obtain its declared read port and then attempt taskBackend or Git mutation through the returned value; the operation must fail with a typed capability denial and leave repository and task state unchanged.
- Capability tests should assert that each declared capability resolves to a capability-specific interface that does not expose undeclared task, backend, Git, approval, provider, or network operations.

## Hidden Assumptions
- Compile-time restriction of session.require is assumed to provide runtime least authority even though the resolved value is the full mutable CommandContext.
- Command handlers are assumed not to use mutation methods exposed by a CommandContext obtained through a read-only capability.

## Residual Risks
- Replace the shared CommandContext result for granular capabilities with capability-specific runtime ports or guarded wrappers, then add negative tests that attempt mutation through the value returned to a read-only handler, not only through undeclared session.require calls.
