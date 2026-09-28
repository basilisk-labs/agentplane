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

The subsequent native full-CI attempt passed runtime, docs/schema, and CLI
groups, but the core group exhausted its 15-minute combined lint/test budget.
The native exchange is
`cc1a45e79d7167bf76f65406daedfd684ee65f79c724068dc529791d1f4901a7`.
This is an incomplete test run, not a passed suite or a reported assertion
failure. The operator selected
`AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS=2700000` for this host.
The individual 60-second test and hook deadlines remain unchanged.

With that group budget, native full CI passed all four primary groups on
`84e9cf84c96abe8c86abc21073aa848f8a67c2fd`. The core group completed in
1,875,584 ms. The later docs-site build failed on two M04 report links to
roadmap sources outside the Docusaurus docs plugin. This attempt is retained in
exchange
`4ec1946b0b9725fb4e8a262a23c069d3fffb65caaae86c63052cc07500be4d26`.

The operator replaced those links with GitHub source URLs pinned to the
report's existing candidate commit. Both target blobs were verified with
`git cat-file`. The source hashes, measurement disposition, and all measurement
claims remain unchanged. The original accepted PL-11 output remains available
in its immutable implementation commit; this is a publication-link correction,
not a new measurement result. Broken-link enforcement remains enabled.

After the link correction, `bun run docs:site:check` passed, including the
production Docusaurus build and design check. A supplemental
`bun run ci:contract` also passed before the following timeout repair.

## Prepublish Deadline Repair

The operator found that native `release:prepublish` still inherited the
ordinary 30-minute check deadline. The 0.7.8 preparation record already
documents a successful 39-minute prepublish run. The current command includes
contract checks, builds, 815 release-base test files, coverage, and release
smoke checks. This is a deadline regression risk, not an observed 0.7.12
prepublish failure.

Under the same user-authorized release repair override, the operator assigned
`release:prepublish` a bounded 150-minute default. Explicit task check limits
retain priority. Other commands and individual test/group limits are unchanged.
The regression test failed on the old implementation: it observed 1,800,000 ms
instead of the release-specific 9,000,000 ms. The test also covers an explicit
1,000 ms limit and the unchanged 30-minute `release:prepublish:fast` default.

The corrected verification suite passed all 32 tests. Focused ESLint and root
typecheck passed. The operator also ran the remaining full-CI steps:
`workflows:lint` passed, all 98 platform-critical tests passed, and all 101
guard coverage tests passed. `coverage:significant` passed its contract check
for 17 source targets. These supplemental results do not replace a complete
native final validation or hosted integration evidence.

The operator repair commit bypasses local lifecycle hooks under the explicit
user override. Native final validation remains required before integration.

## Compatibility Verification

- `bun run bench:compatibility:candidate:check`: pass; candidate is current.
- `bun run bench:compatibility:check`: pass; 253 commands, 174 positional
  arguments, 849 options, and the frozen registry inventory of 3 packages and
  162 files.

M04 qualification remains not established as documented in
`docs/releases/v0.7.12-m04.md`. This update makes no new containment or
performance claim.
