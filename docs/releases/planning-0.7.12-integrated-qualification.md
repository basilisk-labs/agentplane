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

A third invocation on `24165f47c` was stopped during the installed-package
smoke check after a concurrent read-only CI plan inspection exposed a test
discovery race. Its native result is recorded in exchange
`28e00905684953c8438630691bae6138982478941d1613a9f7aeb0337d1e7a89`.
The plan inspection tried to scan a generated package `dist` directory while
the package build was replacing it. It failed with `ENOENT`.

The operator corrected test discovery to exclude package-root generated
`dist` directories and installed `node_modules` before traversal. The
regression test failed before the fix because generated and dependency tests
were discovered. It preserves legitimate `src/dist` directories and keeps
missing source roots as errors. This repair does not suppress filesystem
errors or remove source tests from the verification contract.

The discovery regression suite passes both tests. A comparison with the
previous traversal on the quiescent checkout finds the same 823 source test
files. `bun run vitest:projects:check` passes with 823 tests and 10 primary
routes. `node scripts/checks/run-local-ci.mjs --mode full --explain` also
passes after the repair.

The next native attempt on `8784d01ec` completed the declared implementation,
package, replay, and documentation checks. Its full CI run failed because
ESLint exhausted the Node heap near 2 GiB and received `SIGABRT`. Runtime,
docs/schema, and CLI CI groups passed. The native failure is preserved in
exchange
`2f4496d9d041d1c2b5cade5b028e12a67150fa3816423ea00e50ddfde863e28d`.

The operator increased the local Node heap ceiling to 4 GiB with
`NODE_OPTIONS=--max-old-space-size=4096` and selected two fast-test workers
with `AGENTPLANE_FAST_VITEST_MAX_WORKERS=2` for this two-CPU host. These are
local execution settings, not repository defaults or exemptions. All selected
tests, assertion criteria, and per-test deadlines remain unchanged.
`NODE_OPTIONS=--max-old-space-size=4096 bun run lint:core` subsequently
passed with exit code 0.

## Compatibility Verification

- `bun run bench:compatibility:candidate:check`: pass; candidate is current.
- `bun run bench:compatibility:check`: pass; 253 commands, 174 positional
  arguments, 849 options, and the frozen registry inventory of 3 packages and
  162 files.

M04 qualification remains not established as documented in
`docs/releases/v0.7.12-m04.md`. This update makes no new containment or
performance claim.
