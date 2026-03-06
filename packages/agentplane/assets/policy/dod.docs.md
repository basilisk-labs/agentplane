# DoD: docs/policy

Apply when task changes docs or policy files only.

## Minimum checks

- `node .agentplane/policy/check-routing.mjs`
- `bun run agents:check`
- Targeted lint/tests if docs generation or scripts were changed.

## Verification notes contract

Record docs/policy verification in task notes using this template:

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
