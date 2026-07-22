Task: `202607221838-SD1W93`
Title: Define the AgentPlane 0.7 refactor execution graph
Canonical task record: `.agentplane/tasks/202607221838-SD1W93/README.md`

## Summary

Define and validate the complete executable AgentPlane 0.7 refactor graph.

The graph now contains 43 implementation/release leaves covering RF-00 through RF-27, two verified contract-drift prerequisites, six optional prerelease stabilization points, an automated 0.6.24-to-0.7 migration matrix, documentation, and the terminal 0.7.0 publication task. The human-readable roadmap is `docs/internal/v0.7-refactor-plan.md`.

## Scope

- In scope: create executable AgentPlane task artifacts for every currently valid RF-00 through RF-27 item, add the newly verified workflow/schema and CLI-contract drift to the appropriate leaves, assign one owner and acceptance boundary per leaf, encode acyclic dependencies, map compatible slices to intermediate 0.6.x releases, and define the final 0.7.0 gate.
- Evidence baseline: main at 026a4db26e7e541f36ef6652274ff3cefa1feccb and agentplane-refactoring-review-v2.md.
- Out of scope: implementation code, package publication, unrelated maintenance, and any mutation of the agentplane-loops checkout.

## Verification

- State: ok
- Note:

```text
Verified 43 executable leaves plus the planning task: RF-00 through RF-27 coverage is complete,
task-state and dependency integrity pass, roadmap/task Markdown is formatted, policy routing passes,
and doctor has no new errors. Bun is unavailable locally, so the exact task-state script was run
directly with Node; hosted PR verification must still exercise the Bun wrapper.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T18:40:32.302Z
- Branch: task/202607221838-SD1W93/define-the-agentplane-0-7-refactor-execution-gra
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221846-4CE7EG/README.md | 111 +++++++++++++++++++
 .agentplane/tasks/202607221846-4VB97J/README.md | 113 ++++++++++++++++++++
 .agentplane/tasks/202607221846-9XC1H0/README.md | 115 ++++++++++++++++++++
 .agentplane/tasks/202607221846-C2XADX/README.md | 113 ++++++++++++++++++++
 .agentplane/tasks/202607221846-SXJ75T/README.md | 111 +++++++++++++++++++
 .agentplane/tasks/202607221846-Y89CFB/README.md | 114 ++++++++++++++++++++
 .agentplane/tasks/202607221846-YGWMA2/README.md | 112 ++++++++++++++++++++
 .agentplane/tasks/202607221846-ZAENM6/README.md | 111 +++++++++++++++++++
 .agentplane/tasks/202607221848-0ZAB1F/README.md | 113 ++++++++++++++++++++
 .agentplane/tasks/202607221848-1HWR0R/README.md | 111 +++++++++++++++++++
 .agentplane/tasks/202607221848-ABG7SD/README.md | 114 ++++++++++++++++++++
 .agentplane/tasks/202607221848-ER5H6N/README.md | 111 +++++++++++++++++++
 .agentplane/tasks/202607221848-T9B3PS/README.md | 118 +++++++++++++++++++++
 .agentplane/tasks/202607221848-VBV9B1/README.md | 113 ++++++++++++++++++++
 .agentplane/tasks/202607221848-VC4VVS/README.md | 117 ++++++++++++++++++++
 .agentplane/tasks/202607221849-8YYZ9X/README.md | 115 ++++++++++++++++++++
 .agentplane/tasks/202607221849-NWVCAG/README.md | 116 ++++++++++++++++++++
 .agentplane/tasks/202607221849-TBTX8X/README.md | 118 +++++++++++++++++++++
 .agentplane/tasks/202607221850-0SFMS7/README.md | 118 +++++++++++++++++++++
 .agentplane/tasks/202607221850-8HBF4J/README.md | 119 +++++++++++++++++++++
 .agentplane/tasks/202607221850-9C9WBP/README.md | 113 ++++++++++++++++++++
 .agentplane/tasks/202607221850-DRWR0V/README.md | 115 ++++++++++++++++++++
 .agentplane/tasks/202607221850-R7WS01/README.md | 114 ++++++++++++++++++++
 .agentplane/tasks/202607221850-WM9X1G/README.md | 113 ++++++++++++++++++++
 .agentplane/tasks/202607221852-01ACZ9/README.md | 117 ++++++++++++++++++++
 .agentplane/tasks/202607221852-1KWS8Y/README.md | 114 ++++++++++++++++++++
 .agentplane/tasks/202607221852-71SCSW/README.md | 117 ++++++++++++++++++++
 .agentplane/tasks/202607221852-9T0RT3/README.md | 116 ++++++++++++++++++++
 .agentplane/tasks/202607221852-ABP0EX/README.md | 112 ++++++++++++++++++++
 .agentplane/tasks/202607221852-ADC3A5/README.md | 114 ++++++++++++++++++++
 .agentplane/tasks/202607221852-ECBY56/README.md | 118 +++++++++++++++++++++
 .agentplane/tasks/202607221852-J910P6/README.md | 112 ++++++++++++++++++++
 .agentplane/tasks/202607221852-WF8A0X/README.md | 116 ++++++++++++++++++++
 .agentplane/tasks/202607221852-YP9QCH/README.md | 112 ++++++++++++++++++++
 .agentplane/tasks/202607221854-4FNZPG/README.md | 113 ++++++++++++++++++++
 .agentplane/tasks/202607221854-87892M/README.md | 114 ++++++++++++++++++++
 .agentplane/tasks/202607221854-K7799B/README.md | 120 +++++++++++++++++++++
 .agentplane/tasks/202607221854-PGPR3J/README.md | 116 ++++++++++++++++++++
 .agentplane/tasks/202607221854-RW8CJF/README.md | 117 ++++++++++++++++++++
 .agentplane/tasks/202607221854-SDPFN0/README.md | 115 ++++++++++++++++++++
 .agentplane/tasks/202607221854-TE9ZJ5/README.md | 117 ++++++++++++++++++++
 .agentplane/tasks/202607221854-XV67TD/README.md | 118 +++++++++++++++++++++
 .agentplane/tasks/202607221854-YMYYQ8/README.md | 111 +++++++++++++++++++
 docs/internal/v0.7-refactor-plan.md             | 135 ++++++++++++++++++++++++
 44 files changed, 5062 insertions(+)
```

</details>
