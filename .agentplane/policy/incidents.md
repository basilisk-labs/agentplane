# Policy Incidents Log

This is the single file for incident-derived and situational policy rules.

## Entry contract

- Add entries append-only.
- Every entry MUST include: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`.
- New machine-matched entries SHOULD also include: `tags`, `match`, `advice`, `source_task`, `fixability`.
- `rule` MUST be concrete and testable (`MUST` / `MUST NOT`).
- `fixability: external` means the issue cannot be removed by changing only repository code and should stay as reusable operational advice.
- `state` values: `open`, `stabilized`, `promoted`.

## Entry template

- id: `INC-YYYYMMDD-NN`
- date: `YYYY-MM-DD`
- scope: `<affected scope>`
- tags: `<comma-separated matching tags>`
- match: `<comma-separated lookup keywords>`
- failure: `<observed failure mode>`
- advice: `<reusable recovery or prevention guidance>`
- rule: `<new or refined MUST/MUST NOT>`
- evidence: `<task ids / logs / links>`
- enforcement: `<CI|test|lint|script|manual>`
- source_task: `<task id>`
- fixability: `<external>`
- state: `<open|stabilized|promoted>`

## Entries

- id: INC-20260308-01
  date: 2026-03-08
  scope: release apply internal push path
  tags: release, git, hooks
  match: release, push, pre-push, hooks
  failure: release apply re-entered local pre-push hooks and could stall after creating the local release commit and tag
  advice: keep release ref pushes inside the release orchestrator path and avoid recursively re-entering local pre-push hooks
  rule: Release orchestration MUST push its own release refs without recursively re-entering local pre-push hooks.
  evidence: task 202603061532-9Y41NM; docs/developer/cli-bug-ledger-v0-3-x.mdx entry 4
  enforcement: test + command implementation
  state: stabilized

- id: INC-20260308-02
  date: 2026-03-08
  scope: stale-dist guard in framework checkout
  tags: runtime, framework, diagnostics
  match: stale-dist, runtime, dirty-tree, diagnostics
  failure: stale-dist enforcement treated git dirtiness as stale runtime and blocked diagnostics or rebuilt checkouts incorrectly
  advice: compare stale-dist state against recorded build snapshots and let read-only diagnostics warn instead of hard-failing on dirty runtime trees
  rule: Stale-dist freshness MUST compare current runtime inputs against the recorded build snapshot, and read-only diagnostics MUST warn-and-run instead of hard-failing on dirty runtime trees.
  evidence: tasks 202603072032-2M0V8V, 202603072032-1BC7VQ, 202603072032-V9VGT2, 202603072032-4D9ASG
  enforcement: test + runtime guard
  state: stabilized

- id: INC-20260308-03
  date: 2026-03-08
  scope: framework checkout PATH resolution
  tags: runtime, framework, cli
  match: path, runtime, handoff, global-cli
  failure: contributors inside the framework repo could execute an older global agentplane binary instead of the checkout they were editing
  advice: verify the active runtime inside the framework checkout and keep PATH handoff repo-local by default unless a deliberate global override is set
  rule: Inside the framework checkout, agentplane resolved from PATH MUST hand off to the repo-local runtime by default unless an explicit global opt-out is set.
  evidence: tasks 202603071647-M0Q79C, 202603071647-Y4BZ1T, 202603071647-25WS52
  enforcement: test + wrapper logic
  state: stabilized

- id: INC-20260308-04
  date: 2026-03-08
  scope: release mutation generated surfaces
  tags: release, docs, generated
  match: release, generated-docs, versioned-docs
  failure: release apply could leave version-sensitive generated docs stale until later parity checks failed
  advice: regenerate version-sensitive generated docs inside the release mutation itself instead of deferring them to later parity checks
  rule: Release mutation MUST regenerate and stage generated docs that encode released package versions as part of the release commit itself.
  evidence: task 202603071745-T3QE04; docs/developer/cli-bug-ledger-v0-3-x.mdx entry 5
  enforcement: test + release mutation
  state: stabilized

- id: INC-20260308-05
  date: 2026-03-08
  scope: release mutation repository CLI expectation
  tags: release, cli, config
  match: release, expected-version, config
  failure: repository-owned framework.cli.expected_version could drift behind the actual released version because release apply did not persist it
  advice: keep repository CLI expectation aligned with the released package version whenever release mutation touches repository config
  rule: Release mutation MUST keep framework.cli.expected_version aligned with the released package version whenever repository config is present.
  evidence: tasks 202603081315-Y4D6AE, 202603081538-GF7P9C; docs/developer/cli-bug-ledger-v0-3-x.mdx entry 3
  enforcement: test + release mutation
  state: stabilized
