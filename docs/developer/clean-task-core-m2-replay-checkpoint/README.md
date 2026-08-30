# M2 persistence replay checkpoint

Task: `202608291006-2A6BJC`.

This is an implementation checkpoint, not final M2 qualification or M3 cutover approval.
The legacy production lifecycle remains authoritative.
This internal checkpoint uses the repository's existing README convention. It is not a
published documentation page.

## Implemented boundaries

- Local CAS, explicitly serialized atomic storage, and a cloud fake share the kernel adapter.
  Serialized storage reuses the existing file transaction fence. Every writer must use the same
  storage-owned fence. An uncoordinated legacy writer is not covered by this guarantee.
- Preview and execution reject authority for a different repository.
- Read-only next-action projection returns a reason code and never grants authority.
- Actual legacy Task reads and canonical reads are compared on Task ID, storage revision and
  projected status. The comparison reports the first divergent field and source identity.
  This is not equivalence between the two lifecycle command implementations.
- Review identity is derived from the current approved plan, WorkItem result and repository
  fingerprint. Operational document timestamps do not stale it. A new result does.
- A new WorkItem attempt clears the prior result, output manifests and validation. Its prior
  mutation receipts remain available for idempotent replay.

## Capture and replay

`scripts/bench/qualify-kernel-replay.mjs <exact-sha> --capture <new-file>` runs from an isolated
checkout and exports persistence observations only after the complete selected test run and
the dependency, harness and tracked-tree checks pass. It never overwrites an existing corpus.
The driver and its helpers must match the anchor. Captured fixtures contain command source
bytes, byte digests, events, receipts, aggregate and projection digests, effect states,
actual next-action codes, and normalized comparisons from both read paths.

The five Task classes run through all three storage modes. Atomic-write interruption tests
cover before-write, after-write and unknown-readback outcomes. Ledger checkpoints include
creation, planning, approval, materialization, claim, execution, result, inspection, validation,
WorkItem completion, commit, review, PR, merge, hosted close, publication, cleanup, final
validation and Task completion. Commit, review, provider and cleanup effects are explicit
fixture ledger effects. They are not real GitHub, registry, evaluator or workspace operations.
M3 must separately qualify those production adapters.

The persistence corpus is now frozen from independently qualified source anchor
`8e92d66b8671d083b9928ef04b15a49dfece4292`. Its original capture byte digest is
`sha256:976dedefa309ba4dd46656b721ded26990a2b2281faaa52bb2192d392d75bff4`.
The repository copy preserves all 15 fixture inputs and 246 expected observations.
JSON formatting may change the file digest, but command source strings and expected values
must remain unchanged. Normal tests replay those saved command bytes through actual storage
clients and compare each event history, receipt, digest, effect state and routing observation.
They never rewrite the corpus. The isolated report separately identifies the current
implementation anchor and every frozen corpus digest. All 517 replay and persistence tests
passed on Node 24 after adding this corpus. Corrupt source bytes fail before storage opens;
a changed expected event reports the first divergent field with bounded diagnostics.
This subset does not replace the complete twelve-family manifest required below.

## Qualification hardening in progress

The supervisor accepted the frozen replay checkpoint at `2c752885453a6fbeebbb407db859a34454ff63a2`.
However, its new verification record referenced the preceding run's check artifact. The artifact
writer compared only commands and exit codes before preserving an earlier successful log. That
comparison cannot establish equal source or execution identity. The writer now saves the actual
observations from each run; its existing byte-identical write suppression remains. A regression
reproduced stale evidence reuse before the fix. The complete gate must run again with this fix.

The qualification summary also rejected none of the skipped, pending or todo assertions when the
remaining counts matched. Three regressions now require incomplete execution to fail qualification.

A new canonical `begin_effect` command records `PENDING` before a provider call. A thin dispatch
adapter calls the provider only after fresh confirmed admission. A replay or uncertain admission
requires readback. Independent readback after a failed write proves durability, not exclusive
ownership of that write. An identical concurrent CAS regression produced two provider calls before
this distinction was fixed; it now permits one. This is a counted fake-provider test, not a hosted
provider or release drill. The capture harness includes 31 scenarios across local, serialized direct
and cloud-fake storage. The controlled identical-start interleaving uses the cloud fake; the other
scenarios exercise all three backends. Captures include commands, events, receipts, projections,
effect states, next actions and provider call counts.

Task finalization now rejects unresolved optional WorkItem claims. Four regressions reproduced
premature final validation before this guard. Unclaimed optional work still does not block completion.
Additional pure-kernel vectors cover plan rejection and stale approval, dependencies and fan-out,
missing producer output, rework, duplicate and stale results, optional work and independent ready work.
The supplemental harness contains 19 deterministic kernel cases. Four real Git workspace cases
cover base checkout, selected worktree, missing frozen document and divergent HEAD. Nine evidence
cases cover metadata-only review stability, semantic review invalidation and actual missing executable
failure across all three backends. The process probe uses the existing allowlisted `node` command
with an empty fixture PATH; it does not weaken the process allowlist.

The interruption matrix now compares all 252 resumed observations against the previously frozen
branch and release journey prefixes. A shared observation owner records the actual storage read,
canonical/legacy comparison, events, receipts, aggregate and projection digests, effects and route.
The isolated driver always captures observations and validates an explicit twelve-family manifest.
Missing cases, duplicate identities, changed source bytes, wrong anchors, incomplete test execution
and expectations that differ from the frozen crash origin fail qualification before export.
Normal tests do not regenerate the saved corpus. New capture fixtures still require committed-source
capture and mandatory frozen replay in `m2-corpus-freeze`; this checkpoint does not complete that gate.

## Complete frozen qualification corpus

The isolated capture at `646305bc495692c3c6aba2835b66978ed0950a10` passed all 747 tests in eight
suites on Node 24. It validated all twelve families with no unexplained normalized read mismatch.
The durable report is [qualification-capture.json](./qualification-capture.json). It identifies
18 transitive harness files, 46 dependency mappings, the dependency manifest, the exact Git tree,
every original corpus digest and the test-report digest. Provider scenarios use explicit fakes.

| Family                               | Referenced cases |
| ------------------------------------ | ---------------: |
| Canonical state/action products      |              177 |
| Legacy lifecycle                     |                5 |
| Plans                                |                8 |
| WorkItems                            |               12 |
| Required inputs                      |                7 |
| Validation                           |               14 |
| Evaluator                            |               11 |
| Effects                              |               31 |
| Workspaces                           |                4 |
| Backend persistence and interruption |              267 |
| Task classes                         |               15 |
| Crash points                         |              252 |

Families intentionally share cases. Their counts must not be summed as distinct tests.
The new payload includes 15 persistence journeys, 19 supplemental kernel scenarios, 31 effect
scenarios, four workspace layouts, nine evidence scenarios and 252 crash cases. Earlier reviewed
kernel, migration, evidence and persistence corpora remain unchanged. Crash expectations reference
and equal the independently frozen persistence prefixes from the earlier capture.

`kernel-replay-qualification.corpus.json` records the source anchor, collection counts and both
compressed and decoded byte digests. Its adjacent `.json.gz` payload contains the exact original
24,181,476 capture bytes. Compression reduces repository storage to 1,865,695 bytes without
reformatting or regenerating observations. The decoded SHA-256 is
`11a22372c0b51e36e663c113b9ffae25b02fd00fbb635dd4d598dda6624d5c5e`.
Inspect the payload with `gzip -dc packages/agentplane/src/adapters/task-backend/kernel-replay-qualification.corpus.json.gz`.

Normal replay verifies both byte digests and each fixture source identity before opening storage.
It then executes frozen source strings, not newly generated expectations. Each comparison reports
the first divergent field and source/reproduction identity. Real Git workspace cases include canary
application, repeated migration with unchanged bytes and exact-byte rollback. Missing frozen
documents do not fall back to base. A divergent HEAD rejects stale commands.

The first full gate at this capture anchor passed `test:fast`, runtime, core and CLI checks but
failed `docs-schema`: the kernel test file grew above the existing 1,000-line budget. The two new
durable-effect admission tests now reside in the existing invariant suite. Assertions, test counts
and size limits are preserved. A complete new supervisor verification remains required after this
fixture-freeze change; the focused and isolated passes do not replace that gate.
The changed frozen replay suites passed all 692 tests on Node 24. The complete `docs-schema` group,
changed-source lint, typecheck and framework bootstrap also passed after the test relocation.

Run the report's reproduction command from its exact source checkout. The driver rejects a
working copy whose harness differs from that anchor. Subsequent qualification reports identify
the current replay implementation separately from the immutable capture origin. Final verification,
review, exact-head hosted checks and closure belong to the supervisor's Task artifacts and PR.
This capture report does not certify M3 cutover, twenty self-hosting Tasks or release drills.

## Remaining mandatory acceptance

The initial checkpoint's full `test:fast` run failed 12 tests across seven suites after
1,280 seconds. Its saved predecessor run took 253 seconds. A serial Node 24 control reran
all seven suites without code or timeout changes and passed all 104 tests. A later four-worker
control also passed those 104 tests. The cause of the full-run failure is not established.
These controls do not replace a successful complete verification run.

The next full run at `8b9a98f8b45539d01f59c73209947d74f738d4a6` also failed:
5,178 tests passed, 12 failed and one was skipped in 1,286 seconds. No additional heavy
check ran concurrently. Five failing suites overlapped the preceding run. Local Node
24.11.1 reproduced timeouts in a seven-suite control. A Node 26.8.1 control passed all
86 tests in those suites. These observations do not establish the timeout cause, and a
different-runtime control does not constitute a Node 24 verification pass.

A separate direct Node 24 control exposed a functional publication race during concurrent
effect resolution. Immutable intent, lease and resolution files were created at their final
paths before their JSON bytes were written. Another resolver could read an empty file and
raise `SyntaxError`. Three deterministic tests pause the first publisher immediately after
exclusive file creation. Effect resolution now reuses the existing staged hard-link publication
helper. Readers see a complete immutable artifact, and competing identical resolutions converge.
The three regressions failed before this change; all eleven effect-resolution tests passed on
Node 24 afterward. Existing conflict checks and independent readback remain required.

The supervisor then saved `2b787ce10` and ran with explicitly selected Node 26.8.1.
`test:fast` passed 5,193 tests across 617 suites, with one skipped test, in 301 seconds.
The full CI runtime, docs/schema, core and CLI groups also passed. The later website step
failed because this internal checkpoint was treated as a public page without a generated
social image. Moving the checkpoint to this README location follows the existing website
exclusion; no CI check or generated-asset requirement is removed. The subsequent full local CI passed at implementation
`cd3252423edf12da15d601d82fd8eb31662dac28`. Hosted Node 24 verification remains mandatory.

Migration qualification now exercises real linked Git worktrees. For each legacy status,
the selected worktree alone receives the canonical or archived record, repeat application
leaves its bytes unchanged, and rollback restores its exact original bytes. A missing
worktree document returns `missing` through the operator command. It does not fall back to
the base checkout and does not call backup or CAS. The base document remains unchanged in
all cases. All 50 migration and frozen-migration tests passed on Node 24. The complete docs
site check also passed after the internal README relocation.

Further persistence tests exposed two read-projection defects on all three backends: an
unclaimed optional WorkItem was selected after all required work completed, and a blocked
WorkItem hid independent ready work. The projection now permits final validation in the first
case and selects ready work in the second. Ready work must still pass the canonical resource
conflict rule. The projection and command admission reuse that one rule. A blocked resource
owner prevents a conflicting claim until its claim is resolved or cancelled.

1. Commit the capture implementation through the supervisor before assigning its exact source
   identity. A working-tree SHA does not identify uncommitted implementation bytes.
2. Freeze and replay the complete twelve-family manifest from the M0 specification. Preserve
   the existing reviewed kernel, migration and evidence corpora. Add missing plan, WorkItem
   dependency/fan-out, required-input, missing-executable, metadata and workspace variants.
3. Include the actual persistence/read comparisons, complete interruption matrix, canary,
   repeat migration with no byte change and exact-byte rollback under one implementation
   identity. Report every remaining mismatch or unsupported case.
4. Run full local verification, independent semantic review, exact-head hosted checks,
   supervised integration and hosted closure. None is implied by this checkpoint.

The complete frozen corpus and capture report are present. Final current-source verification and
supervised hosted delivery remain required. No legacy deletion,
repository-wide Task migration, twenty-task self-hosting claim or release drill is authorized
by this checkpoint report.
