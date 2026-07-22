Task: `202607221838-SD1W93`
Title: Define the AgentPlane 0.7 refactor execution graph
Canonical task record: `.agentplane/tasks/202607221838-SD1W93/README.md`

## Summary

Define and validate the complete executable AgentPlane 0.7 refactor graph.

The corrected graph contains 55 executable implementation/release nodes plus this planning task. It covers RF-00 through RF-27, verified Workflow/CLI contract drift, six executable alpha/beta/rc qualification gates, five atomic command-family vertical slices, automated final-release ancestor closure, migration/documentation gates, and terminal 0.7.0 publication.

## Scope

- In scope: create executable AgentPlane task artifacts for every currently valid RF-00 through RF-27 item, add verified Workflow/CLI contract-drift prerequisites, split mixed verification boundaries, enforce release ancestor closure and executable alpha/beta/rc qualification gates, assign one owner per leaf, and define the terminal 0.7.0 release gate.
- Release strategy: optional 0.7.0 prereleases are qualification points; isolated compatibility-safe fixes may be backported to 0.6.25+ only when useful, but no intermediate publication is mandatory.
- Evidence baseline: main at 026a4db26e7e541f36ef6652274ff3cefa1feccb and agentplane-refactoring-review-v2.md.
- Out of scope: implementation code for RF leaves, mandatory patch-release churn, unrelated maintenance, and any mutation of the agentplane-loops checkout.

## Verification

- State: ok
- Note:

```text
Verified committed graph ee24b3aec: all 56 active v0.7 records are reachable from final release,
RF-00 through RF-27 coverage is complete, Markdown is formatted, task-state and policy routing pass,
and doctor has no new errors. Bun is absent locally; the exact task-state Node target passed and
hosted CI remains required for the wrapper.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-22T18:40:32.302Z
- Branch: task/202607221838-SD1W93/define-the-agentplane-0-7-refactor-execution-gra
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221846-4CE7EG/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221846-4VB97J/README.md | 113 ++++++++++++++++++
 .agentplane/tasks/202607221846-9XC1H0/README.md | 115 ++++++++++++++++++
 .agentplane/tasks/202607221846-C2XADX/README.md | 113 ++++++++++++++++++
 .agentplane/tasks/202607221846-SXJ75T/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221846-Y89CFB/README.md | 114 ++++++++++++++++++
 .agentplane/tasks/202607221846-YGWMA2/README.md | 112 ++++++++++++++++++
 .agentplane/tasks/202607221846-ZAENM6/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221848-0ZAB1F/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221848-1HWR0R/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221848-ABG7SD/README.md | 113 ++++++++++++++++++
 .agentplane/tasks/202607221848-ER5H6N/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221848-T9B3PS/README.md | 118 +++++++++++++++++++
 .agentplane/tasks/202607221848-VBV9B1/README.md | 113 ++++++++++++++++++
 .agentplane/tasks/202607221848-VC4VVS/README.md | 117 +++++++++++++++++++
 .agentplane/tasks/202607221849-8YYZ9X/README.md | 115 ++++++++++++++++++
 .agentplane/tasks/202607221849-NWVCAG/README.md | 116 +++++++++++++++++++
 .agentplane/tasks/202607221849-TBTX8X/README.md | 118 +++++++++++++++++++
 .agentplane/tasks/202607221850-0SFMS7/README.md | 118 +++++++++++++++++++
 .agentplane/tasks/202607221850-8HBF4J/README.md | 119 +++++++++++++++++++
 .agentplane/tasks/202607221850-9C9WBP/README.md | 112 ++++++++++++++++++
 .agentplane/tasks/202607221850-DRWR0V/README.md | 113 ++++++++++++++++++
 .agentplane/tasks/202607221850-R7WS01/README.md | 114 ++++++++++++++++++
 .agentplane/tasks/202607221850-WM9X1G/README.md | 112 ++++++++++++++++++
 .agentplane/tasks/202607221852-01ACZ9/README.md | 117 +++++++++++++++++++
 .agentplane/tasks/202607221852-1KWS8Y/README.md | 114 ++++++++++++++++++
 .agentplane/tasks/202607221852-71SCSW/README.md | 121 +++++++++++++++++++
 .agentplane/tasks/202607221852-9T0RT3/README.md | 116 +++++++++++++++++++
 .agentplane/tasks/202607221852-ABP0EX/README.md | 112 ++++++++++++++++++
 .agentplane/tasks/202607221852-ADC3A5/README.md | 114 ++++++++++++++++++
 .agentplane/tasks/202607221852-ECBY56/README.md | 115 ++++++++++++++++++
 .agentplane/tasks/202607221852-J910P6/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221852-WF8A0X/README.md | 116 +++++++++++++++++++
 .agentplane/tasks/202607221852-YP9QCH/README.md | 112 ++++++++++++++++++
 .agentplane/tasks/202607221854-4FNZPG/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221854-87892M/README.md | 114 ++++++++++++++++++
 .agentplane/tasks/202607221854-K7799B/README.md | 120 +++++++++++++++++++
 .agentplane/tasks/202607221854-PGPR3J/README.md | 113 ++++++++++++++++++
 .agentplane/tasks/202607221854-RW8CJF/README.md | 115 ++++++++++++++++++
 .agentplane/tasks/202607221854-SDPFN0/README.md | 117 +++++++++++++++++++
 .agentplane/tasks/202607221854-TE9ZJ5/README.md | 117 +++++++++++++++++++
 .agentplane/tasks/202607221854-XV67TD/README.md | 116 +++++++++++++++++++
 .agentplane/tasks/202607221854-YMYYQ8/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221907-DK2CJF/README.md | 118 +++++++++++++++++++
 .agentplane/tasks/202607221908-0JP0ZZ/README.md | 116 +++++++++++++++++++
 .agentplane/tasks/202607221908-2NDXVB/README.md | 114 ++++++++++++++++++
 .agentplane/tasks/202607221908-7WV0A7/README.md | 114 ++++++++++++++++++
 .agentplane/tasks/202607221908-83Y4AF/README.md | 117 +++++++++++++++++++
 .agentplane/tasks/202607221908-9M2FBQ/README.md | 119 +++++++++++++++++++
 .agentplane/tasks/202607221908-AB2SFC/README.md | 111 ++++++++++++++++++
 .agentplane/tasks/202607221908-MR9EA9/README.md | 115 ++++++++++++++++++
 .agentplane/tasks/202607221908-PWFH5K/README.md | 110 ++++++++++++++++++
 .agentplane/tasks/202607221908-RC1DX8/README.md | 114 ++++++++++++++++++
 .agentplane/tasks/202607221908-TZTE5V/README.md | 112 ++++++++++++++++++
 .agentplane/tasks/202607221908-YD5J89/README.md | 114 ++++++++++++++++++
 docs/internal/v0.7-refactor-plan.md             | 147 ++++++++++++++++++++++++
 56 files changed, 6434 insertions(+)
```

</details>
