Task: `202605191703-PYJMMV`
Title: Make maximum assimilation source-shaped and Obsidian-compatible
Canonical task record: `.agentplane/tasks/202605191703-PYJMMV/README.md`

## Summary

Make maximum assimilation source-shaped and Obsidian-compatible

Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience.

## Scope

- In scope: Update maximum-assimilation context mode so first ingest does not create the fixed starter wiki scaffold, generated CURATOR prompts require source-shaped wiki topology and Obsidian-compatible wikilinks, and EVALUATOR checks quality for structure, granularity, cross-links, coverage, and raw-deletion resilience.
- Out of scope: unrelated refactors not required for "Make maximum assimilation source-shaped and Obsidian-compatible".

## Verification

- State: ok
- Note:

```text
Command: independent quality review against the updated maximum-assimilation contract and diff.
Result: pass. Evidence: first-ingest behavior now skips fixed starter folders only when workspace
mode is maximum-assimilation while retaining the starter scaffold test for non-maximum mode;
generated CURATOR prompt requires source-shaped topology decision, granular synthesis,
Obsidian-compatible wikilinks, coverage report, raw-deletion resilience review, and EVALUATOR
review; blueprint evidence/stop rules include topology, wikilinks, and evaluator gates; docs clarify
no .obsidian config is created by default. Scope: semantic quality gate for source-shaped wiki
structure, useful wikilinks, provenance, coverage, glossary safety, and leakage risk.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T17:04:03.241Z
- Branch: task/202605191703-PYJMMV/max-assimilation-obsidian
- Head: cdffae04ff79

```text
No changes detected.
```

</details>
