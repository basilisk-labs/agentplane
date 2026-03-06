# DoD: code

Apply when task changes implementation/source code.

## Minimum checks

- `agentplane task verify-show <task-id>` (read declared verification contract first)
- Run all checks listed in task `## Verify Steps` (or record approved skips)
- `agentplane verify <task-id> --ok|--rework --by <ROLE> --note "..."`

## Verification notes contract

Record verification in task notes using this compact template:

- `Command`: exact command string.
- `Result`: `pass` or `fail`.
- `Evidence`: short output summary (key lines only).
- `Scope`: what paths/behavior the check covers.

For skipped checks, record all fields:

- `Skipped`: command not executed.
- `Reason`: concrete blocker.
- `Risk`: impact of skipping.
- `Approval`: who approved the skip.
