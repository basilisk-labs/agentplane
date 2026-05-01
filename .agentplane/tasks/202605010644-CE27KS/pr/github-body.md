## Summary

AP-00: Record 0.4 refactor execution backlog

Create traceable executable tasks for the Agentplane 0.4 refactor wave without touching unrelated DESIGN.md drift.

## Scope

- In scope: Create traceable executable tasks for the Agentplane 0.4 refactor wave without touching unrelated DESIGN.md drift.
- Out of scope: unrelated refactors not required for "AP-00: Record 0.4 refactor execution backlog".

## Verification

- State: ok
- Note: Command: agentplane task list --status TODO --owner CODER; git status --short --untracked-files=no. Result: pass. Evidence: 17 dependent CODER tasks exist; tracked drift remains limited to pre-existing DESIGN.md. Scope: task graph creation.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-01T06:50:09.614Z
- Branch: task/202605010644-CE27KS/refactor-backlog
- Head: 9a2668f04b41

```text
 .agentplane/tasks/202605010644-0B48D4/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010644-1HMJJA/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010644-1YXBE7/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010644-48TFEB/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010644-6YE9F6/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-3W3EXR/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-5H9FJ5/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-B5ERD0/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-D8EM8Y/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-FD8ZPX/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-GA1SAK/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-JGXD12/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-JH4RV4/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-WG423K/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-WN3ZS8/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-YZ5WV4/README.md | 90 +++++++++++++++++++++++++
 .agentplane/tasks/202605010645-ZN3PN7/README.md | 90 +++++++++++++++++++++++++
 17 files changed, 1530 insertions(+)
```

</details>
