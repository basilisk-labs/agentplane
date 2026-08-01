# PR Review

Created: 2026-08-01T18:07:23.250Z

## Task

- Task: `202607221854-K7799B`
- Title: Close all AgentPlane 0.7 architecture guard violations
- Status: DOING
- Branch: `task/202607221854-K7799B/close-all-agentplane-0-7-architecture-guard-viol`
- Canonical task record: `.agentplane/tasks/202607221854-K7799B/README.md`

## Verification

- State: ok
- Note: Verified commit 41212b7a1a8b: reproduced the pre-fix ap doctor --dev E_INTERNAL/ENOENT on missing src/usecases; post-fix doctor --dev passes. Focused layering regressions: 4/4 pass. Compatibility matrix (run-repository v1, evaluator legacy facade, integration queue legacy reader): 46/46 pass. Full gates: ci:contract pass; typecheck pass; guards/trust ratchet pass with 0 reviewed violations; arch check pass with 0 dependency violations; critical CLI 12/12 chunks pass. Flake classification: none; one expected stale-dist gate required framework bootstrap after source mutation and then passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T18:09:19.425Z
- Branch: task/202607221854-K7799B/close-all-agentplane-0-7-architecture-guard-viol
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/architecture/layering.imports.test.ts      | 97 ++--------------------
 .../src/commands/doctor/layering.test.ts           | 82 ++++++++++++++++++
 .../agentplane/src/commands/doctor/layering.ts     | 96 ++++++++++++++-------
 3 files changed, 154 insertions(+), 121 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
