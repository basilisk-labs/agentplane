# DoD: docs/policy

Apply when task changes docs or policy files only.

## Minimum checks

- `node .agentplane/policy/check-routing.mjs`
- `agentplane doctor`
- Targeted lint/tests if docs generation or scripts were changed.

## Verification evidence contract

Record docs/policy verification via `agentplane verify ...` and keep residual deviations or follow-ups in the task-local observation section (`Notes` in `doc_version=2`, `Findings` in `doc_version=3`) using this template:

- `Command`: exact command string.
- `Result`: `pass` or `fail`.
- `Evidence`: short output summary.
- `Scope`: changed docs/policy paths covered by the check.
- `Links`: updated canonical docs/examples referenced by the change.

For skipped checks, record:

- `Skipped`: command not executed.
- `Reason`: concrete blocker.
- `Risk`: impact of skipping.
- `Approval`: who approved the skip.

## Evidence checklist

- Confirm canonical links are valid.
- Confirm no duplicate/conflicting rule text remains.
- Confirm routing/load-rule examples match actual module paths and commands.
