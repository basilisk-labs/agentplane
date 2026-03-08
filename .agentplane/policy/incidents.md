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

<!-- example:start
- id: INC-20260305-01
- date: 2026-03-05
- scope: commit-msg hook in repo development mode
- failure: commit-msg rejected valid commits because stale-dist check blocked src_dirty/git_head_changed
- rule: commit-msg MUST validate subject semantics and MUST NOT block on stale dist freshness checks
- evidence: task 20260305-HOOKS-FIX, commit 9fe55c73
- enforcement: test + hook script
- state: open
example:end -->

## Entries

- None yet.
