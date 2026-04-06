# Policy Incidents Log

This is the single file for incident-derived and situational policy rules.

## Entry contract

- Add entries append-only.
- Every entry MUST include: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state`.
- New machine-matched entries SHOULD also include: `tags`, `match`, `advice`, `source_task`, `fixability`.
- `rule` MUST be concrete and testable (`MUST` / `MUST NOT`).
- `fixability: external` means the issue cannot be removed by changing only repository code and should stay as reusable operational advice.
- First auto-promoted external incidents normally enter as `open` and still participate in targeted advice lookup; recurring equivalent incidents can append later `stabilized` entries.
- `state` values: `open`, `stabilized`, `promoted`.

## Entry template: `id`, `date`, `scope`, `failure`, `rule`, `evidence`, `enforcement`, `state` are required.
`tags`, `match`, `advice`, `source_task`, `fixability` are optional machine-match fields.

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
- id: INC-20260407-01
  date: 2026-04-07
  scope: branch_pr GitHub transport helpers
  tags: workflow, github, transport, retries
  match: github, gh, graphQL, EOF, TLS, SSL_ERROR_SYSCALL, remote-checks
  failure: GitHub transport intermittently failed with GraphQL EOF, TLS handshake errors, and SSL_ERROR_SYSCALL during PR creation, remote-check waiting, and reconcile helpers
  advice: treat transient GitHub transport failures as retriable, prefer bounded polling or REST fallbacks over single-shot watch flows, and surface auth or usage failures immediately
  rule: GitHub-dependent workflow helpers MUST classify EOF/TLS/SSL transport failures as transient and retry with bounded backoff; they MUST surface auth and usage failures immediately instead of looping or failing opaquely.
  evidence: tasks 202604062101-XYXG7Y, 202604062309-QE4CX6, 202604050745-18JJ5E
  enforcement: test + workflow helper
  source_task: 202604062309-EXTXG1
  fixability: external
  state: open
- id: INC-20260407-02
  date: 2026-04-07
  scope: protected-main branch_pr closure permissions
  tags: workflow, github, permissions, protected-main
  match: github, integration, permission, protected-main, closure-pr, resource-not-accessible
  failure: hosted branch_pr closure could not create follow-up PRs when the GitHub App or Actions token lacked PR creation rights, leaving manual closure tails after the task PR was already merged
  advice: preserve deterministic closure metadata in task artifacts and complete the closure PR from an authenticated local session when hosted automation lacks create-PR permission
  rule: Protected-main branch_pr closure MUST preserve enough task metadata for deterministic manual reconciliation when hosted automation cannot create the closure PR due to external GitHub permission limits.
  evidence: tasks 202604032235-G375FB, 202604050745-18JJ5E, 202604062153-RSJFC2
  enforcement: manual + workflow
  source_task: 202604062309-EXTXG1
  fixability: external
  state: open
