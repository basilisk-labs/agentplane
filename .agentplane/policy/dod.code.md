<!-- ap:fragment id="policy.dod.code.body.dod.code" slot="body" mutability="replaceable" -->

# DoD: code

Apply when task changes implementation/source code.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.code.check.minimum.checks" slot="check" mutability="append_only" -->

## Minimum checks

- Read the current WorkOrder verification intent and required outputs.
- Run only the checks assigned to the semantic episode and allowed by its authority.
- Return observed command, result, evidence, and residual gaps through the typed semantic result.
- Let AgentPlane persist verification and decide the next formal transition.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.code.check.verification.evidence.contract" slot="check" mutability="append_only" -->

## Verification evidence contract

Return semantic check evidence using this compact shape:

- `Command`: exact command string.
- `Result`: `pass` or `fail`.
- `Evidence`: short output summary (key lines only).
- `Scope`: what paths/behavior the check covers.

For checks that could not run, return all fields:

- `Skipped`: command not executed.
- `Reason`: concrete blocker.
- `Risk`: impact of skipping.
- `Approval`: who approved the skip.

Do not invoke verification-persistence or task-closure commands during a normal semantic episode.

<!-- /ap:fragment -->
