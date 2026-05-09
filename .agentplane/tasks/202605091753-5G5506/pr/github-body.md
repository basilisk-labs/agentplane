Task: `202605091753-5G5506`
Title: Deduplicate CLI benchmark script helpers
Canonical task record: `.agentplane/tasks/202605091753-5G5506/README.md`

## Summary

Deduplicate CLI benchmark script helpers

Move shared duration statistics, suite argument parsing, config loading, interpolation, and command formatting from benchmark scripts into a script-local helper module without changing benchmark semantics.

## Scope

- In scope: Move shared duration statistics, suite argument parsing, config loading, interpolation, and command formatting from benchmark scripts into a script-local helper module without changing benchmark semantics.
- Out of scope: unrelated refactors not required for "Deduplicate CLI benchmark script helpers".

## Verification

- State: ok
- Note: Verified: extracted shared benchmark helper module; help paths, walltime smoke, perf smoke, Prettier, typecheck, clone:report, and clone:check passed. Clone metrics improved from 1546 duplicated lines / 16193 tokens after the previous task to 1465 duplicated lines / 15457 tokens, with clone count 88 -> 85.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T18:22:55.946Z
- Branch: task/202605091753-5G5506/benchmark-helpers
- Head: d25d4ae5fb95

```text
No changes detected.
```

</details>
