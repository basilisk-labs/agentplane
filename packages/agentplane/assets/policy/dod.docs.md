# DoD: docs/policy

Apply when task changes docs or policy files only.

## Minimum checks

- `node .agentplane/policy/check-routing.mjs`
- `bun run agents:check`
- Targeted lint/tests if docs generation or scripts were changed.

## Evidence

- Confirm canonical links are valid.
- Confirm no duplicate/conflicting rule text remains.
