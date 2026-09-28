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

## Hosted and Evaluator Recovery

The native final validation on `34bf5f29ed51d6f7155fac7666e1e45e93deab8d`
passed all 20 checks. `ci:local:full` completed in 2,325,998 ms. The controller
persisted canonical completion, and the operator granted the exact `pr.open`
request under the user's release authorization. AgentPlane opened
[PR 6029](https://github.com/basilisk-labs/agentplane/pull/6029).

The subsequent native independent-review attempt stopped before obtaining a
verdict. Its supervisor journal contained a completed `EXECUTOR` operation
for `worktree.prepare`, with no pending provider intent. Evaluator startup
accepted only a ready journal or its own completed outcome. The new regression
reproduced the real `Evaluator supervisor journal is not ready` error.

The operator reused task `202609261720-KKE9ZN` under the explicit repair
override. Evaluator startup now uses the existing journal transition primitive
to advance a completed non-evaluator operation. It preserves prior operations,
result digests, telemetry, evaluator-result replay, and stopped/pending-state
guards. The fixture test also proves that `human_review` remains stopped.
The existing fixture helpers moved into their companion testkit to preserve
the test-file size limit. All 15 evaluator execution tests pass.

[Hosted Core CI 36436089308](https://github.com/basilisk-labs/agentplane/actions/runs/36436089308)
reported two real-E2E failures. The mixed-scope fixture requested documentation
and `task.verify` authority only in its Plan, outside its intake-owned contract.
Its task creation now declares the exact source, test, documentation, and
metadata paths, the required repository effects, and `task.verify` explicitly.
The authority guard remains unchanged. The hosted-close fixture passed literal
newlines through `--text`; it now supplies the same content with `--file`.
Its original failure reproduced locally, and all four hosted-close tests pass
after correction.

The qualification contract tests initially failed because seven historical
owner-task directories were absent from the sparse checkout. Git restored only
those tracked directories from the current commit without changing their
contents. All 40 contract tests then passed. Focused ESLint, root typecheck,
format checks, and `git diff --check` also passed. Packaged mixed-scope
qualification, fresh hosted CI, and the real independent verdict still require
successful execution on the repaired source. Controlled test-provider results
are not substitutes for the real review.

## Current Review and Pre-Merge Recovery

The repaired implementation at `c0b3be603d850883aae69d3117428609ce446761`
passed all six native branch checks, including install smoke, release-critical
tests, typecheck, routing validation, doctor, and full local CI. Full CI completed
in 2,409,222 ms. The actual packaged mixed-scope lifecycle also passed.

The real Codex review transport first produced an invalid evidence reference,
then timed out. A diagnostic proved that this host rejects Bubblewrap namespace
setup. No sandbox was disabled and neither failed attempt was accepted as a
review. Under the explicit operator recovery authorization, all nine frozen
evidence items were hash-checked and embedded directly in a read-only Codex
invocation. Its blocked result identified missing current workspace evidence.
After native evidence commits, both the full Git status and the implementation
diff outside task artifacts were empty. A second independent invocation received
that observation and the fresh frozen packet, and returned pass. Native
`evaluator apply` validated and recorded the unmodified result. Provider JSONL
and the current workspace observation are preserved in the task evidence.

Pre-merge closure then exposed a separate code defect: fresh verification and
review passed, but the mutation guard accepted only a review matching the old
last-WorkItem operational projection. The task's immutable Kernel completion
remained valid; the subsequent qualified repair had a different implementation
SHA and review identity. Native execution failed with the legacy-mutation refusal.

The operator reused `202609261720-KKE9ZN` for this bounded closure repair under
the user's explicit override. The closure path now permits preservation of an
already completed, digest-valid Kernel with passed final-validation evidence,
only after the existing current-SHA verification and independent-review gate.
The original operational-projection shortcut and all Kernel mutation guards
remain unchanged. The repair does not rewrite historical Kernel evidence.

The regression failed on the old code because `allowCanonicalProjection` was
false after fresh checks. All 30 related tests pass after the correction.
Negative cases cover rejected current evidence, non-pre-merge mutations,
incomplete Kernel state, failed or missing final-validation evidence, and digest
tampering. The repaired closure source still requires new full native checks,
independent review, hosted CI, and exact-SHA release qualification. The earlier
passing results do not certify this later source change or production publication.
