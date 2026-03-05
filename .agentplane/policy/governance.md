# Policy Governance

## Stabilization loop

When a recurring failure appears, apply this sequence:

1. Capture failure mode with concrete evidence.
2. Add or refine a MUST/MUST NOT rule.
3. Add a reference example that demonstrates the correct pattern.
4. Add or update automated enforcement (CI/test/lint/script).

## Policy budget

- `AGENTS.md` MUST remain a compact gateway (target <= 250 lines).
- Detailed procedures MUST be placed in `.agentplane/policy/*.md`.
- If a policy change needs >20 new lines in `AGENTS.md`, move detail to a module and keep only routing + hard gate in gateway.

## Rule quality

- MUST rules should be enforceable by tooling where possible.
- Non-enforceable guidance should be marked as SHOULD and kept out of hard-gate sections.
