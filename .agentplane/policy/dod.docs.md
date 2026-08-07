<!-- ap:fragment id="policy.dod.docs.body.dod.docs.policy" slot="body" mutability="replaceable" -->

# DoD: docs/policy

Apply when task changes docs or policy files only.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.docs.check.minimum.checks" slot="check" mutability="append_only" -->

## Minimum checks

- Read the current WorkOrder verification intent and required outputs.
- Run only the documentation, generation, routing, or link checks assigned to the semantic episode
  and allowed by its authority.
- Return observed evidence and residual gaps through the typed semantic result.
- Let AgentPlane persist verification and decide the next formal transition.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.docs.check.verification.evidence.contract" slot="check" mutability="append_only" -->

## Verification evidence contract

Return docs/policy check evidence using this template:

- `Command`: exact command string.
- `Result`: `pass` or `fail`.
- `Evidence`: short output summary.
- `Scope`: changed docs/policy paths covered by the check.
- `Links`: updated canonical docs/examples referenced by the change.

For checks that could not run, return:

- `Skipped`: command not executed.
- `Reason`: concrete blocker.
- `Risk`: impact of skipping.
- `Approval`: who approved the skip.

Do not invoke verification-persistence or task-closure commands during a normal semantic episode.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.docs.check.evidence.checklist" slot="check" mutability="append_only" -->

## Evidence checklist

- Confirm canonical links are valid.
- Confirm no duplicate/conflicting rule text remains.
- Confirm routing/load-rule examples match actual module paths and commands.
<!-- /ap:fragment -->
