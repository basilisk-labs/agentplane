<!-- ap:fragment id="policy.dod.code.body.dod.code" slot="body" mutability="replaceable" -->

# DoD: code

Apply when task changes implementation/source code.

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.code.check.minimum.checks" slot="check" mutability="append_only" -->

## Minimum checks

- `agentplane task verify-show <task-id>` (read declared verification contract first)
- Run all checks listed in task `## Verify Steps` (or record approved skips)
- `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`

<!-- /ap:fragment -->
<!-- ap:fragment id="policy.dod.code.check.verification.evidence.contract" slot="check" mutability="append_only" -->

## Verification evidence contract

Record verification via `agentplane verify ...` and keep residual gaps or follow-ups in the task-local observation section (`Notes` in `doc_version=2`, `Findings` in `doc_version=3`) using this compact template:

- `Command`: exact command string.
- `Result`: `pass` or `fail`.
- `Evidence`: short output summary (key lines only).
- `Scope`: what paths/behavior the check covers.

For skipped checks, record all fields:

- `Skipped`: command not executed.
- `Reason`: concrete blocker.
- `Risk`: impact of skipping.
- `Approval`: who approved the skip.
<!-- /ap:fragment -->
