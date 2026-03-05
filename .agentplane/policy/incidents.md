# Policy Incidents Log

This is the single file for incident-derived and situational policy rules.

## Entry contract

- Add entries append-only.
- Every entry MUST include: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`.
- `rule` MUST be concrete and testable (`MUST` / `MUST NOT`).
- `state` values: `open`, `stabilized`, `promoted`.

## Entry template

- id: `INC-YYYYMMDD-NN`
- date: `YYYY-MM-DD`
- scope: `<affected scope>`
- failure: `<observed failure mode>`
- rule: `<new or refined MUST/MUST NOT>`
- evidence: `<task ids / logs / links>`
- enforcement: `<CI|test|lint|script|manual>`
- state: `<open|stabilized|promoted>`

## Entries

- None yet.
