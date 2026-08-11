Task: `202608102115-7XGP97`
Title: Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate ...
Canonical task record: `.agentplane/tasks/202608102115-7XGP97/README.md`

## Summary

Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage

Implement the approved CI audit recommendations on current main: make docs, dependency review, workflow lint, and stabilized CodeQL part of fail-closed merge verification; replace binary routing with tested per-capability outputs; avoid irrelevant Windows, package-runtime, coverage, and docs jobs; reduce full-route fan-out and repeated setup/build work; reuse canonical docs and release qualification workflows; remove stale CodeQL workflow registration/configuration drift; preserve exact-SHA release evidence and post-merge safety. Keep unknown paths fail-closed and provide before/after timing evidence without weakening coverage.

## Scope

- In scope: Implement the approved CI audit recommendations on current main: make docs, dependency review, workflow lint, and stabilized CodeQL part of fail-closed merge verification; replace binary routing with tested per-capability outputs; avoid irrelevant Windows, package-runtime, coverage, and docs jobs; reduce full-route fan-out and repeated setup/build work; reuse canonical docs and release qualification workflows; remove stale CodeQL workflow registration/configuration drift; preserve exact-SHA release evidence and post-merge safety. Keep unknown paths fail-closed and provide before/after timing evidence without weakening coverage.
- Out of scope: unrelated refactors not required for "Refactor GitHub verification so the single required PR verification aggregate covers every relevant development gate while reducing full-route latency and runner usage".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T16:52:05.723Z
- Branch: task/202608102115-7XGP97/refactor-github-verification-so-the-single-requi
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
