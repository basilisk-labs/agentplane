# 0.7.12 Integrated Qualification

Task: `202609261720-KKE9ZN`.

This record supplements the accepted PL-12 handoff. It does not replace its
canonical output or claim that version 0.7.12 has been published.

## Operator Actions

The user explicitly authorized the release, required repairs, and policy
overrides. After all twelve WorkItems completed, the operator merged main
`81fc89167d9d7655bd29664849af6fa2eb4bb054` into the feature branch.
The merge commit is `87dff8943313659c15d9937aa491beca79be2eb0`.
It includes the release workflow recovery repairs from PR 6027.

The controller rejected a thirteenth qualification WorkItem because its
amendment contract does not permit changing the WorkItem set. The operator
preserved the accepted twelve-item plan and used the user's explicit override
for this narrowly scoped compatibility registry update.

The update registers only the implemented `task create --plan-file <path>`
option and its source task. It refreshes generated topology hashes and counts.
The frozen compatibility baseline, package delta attribution, and all unrelated
compatibility assertions remain unchanged.

## Interrupted Checks

The pre-merge final validation reached `bun run ci:local:full`. The operator
stopped that check to integrate the required main repair. Its native result is
recorded in exchange
`b3775d90b6b877ab662a61c5402e3ca41ac7d704759d86616628124df3f2495d`.

A post-merge advance began final validation again. The operator stopped its
broad task test subprocess to attempt the qualification plan amendment.
Its native result is recorded in exchange
`ea50db123e2707030a76af7393d0fe63c605a1f534d14cc073b2f28e921c592a`.

Neither interrupted invocation is reported as a pass or as an assertion
failure. A fresh complete final validation is required.

## Compatibility Verification

- `bun run bench:compatibility:candidate:check`: pass; candidate is current.
- `bun run bench:compatibility:check`: pass; 253 commands, 174 positional
  arguments, 849 options, and the frozen registry inventory of 3 packages and
  162 files.

M04 qualification remains not established as documented in
`docs/releases/v0.7.12-m04.md`. This update makes no new containment or
performance claim.
