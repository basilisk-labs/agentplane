Task: `202610070036-BXF49E`
Title: Activate maximum supported repository autonomy without canonical policy drift
Canonical task record: `.agentplane/tasks/202610070036-BXF49E/README.md`

## Summary

Activate maximum supported repository autonomy without canonical policy drift

Continue the user-authorized autonomy task 202610020153-XXZXW4 on current main after release implementation PR6053 merged. Reuse its reviewed WORKFLOW authority.mode=all configuration, actor POLICY:repository, status_commit_policy=off and bounded runner settings. Preserve branch_pr, verification and explicit protected operator boundaries. Place repository-specific standing user authorization in .agentplane/user-instructions.md, which AGENTS.md explicitly loads. Keep canonical policy templates and local copies identical. The previous A final checks failed because local dod.core.md diverged from its canonical template and old CI hit a 2GiB heap limit; preserve that failure history. Implement and independently qualify the bounded configuration, publish and integrate through native routes under the existing explicit user permission. Do not claim A DONE or edit kernel journals. Do not infer M05 paid measurement authority or measurement-debt disposition.

## Scope

- In scope: Continue the user-authorized autonomy task 202610020153-XXZXW4 on current main after release implementation PR6053 merged. Reuse its reviewed WORKFLOW authority.mode=all configuration, actor POLICY:repository, status_commit_policy=off and bounded runner settings. Preserve branch_pr, verification and explicit protected operator boundaries. Place repository-specific standing user authorization in .agentplane/user-instructions.md, which AGENTS.md explicitly loads. Keep canonical policy templates and local copies identical. The previous A final checks failed because local dod.core.md diverged from its canonical template and old CI hit a 2GiB heap limit; preserve that failure history. Implement and independently qualify the bounded configuration, publish and integrate through native routes under the existing explicit user permission. Do not claim A DONE or edit kernel journals. Do not infer M05 paid measurement authority or measurement-debt disposition.
- Out of scope: unrelated refactors not required for "Activate maximum supported repository autonomy without canonical policy drift".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-07T00:52:04.777Z
- Branch: task/202610070036-BXF49E/activate-maximum-supported-repository-autonomy-w
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md          | 14 +++++++++++++-
 .agentplane/user-instructions.md | 17 +++++++++++++++++
 2 files changed, 30 insertions(+), 1 deletion(-)
```

</details>
