# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- The evaluated patch expands far beyond the two declared release-tail repairs, including qualification, efficiency replay, latency, documentation artwork, compatibility baselines, and unrelated task artifacts.
- The frozen observed-checks artifact contains only a narrative verification note; declared checks, verification records, runner history, and runtime evidence are empty, so the required focused regressions and release gates are not deterministically evidenced.
- The frozen packet explicitly leaves post-merge publication and terminal-route checks outstanding, so it does not prove that npm packages, tag, GitHub Release, autonomous evidence-PR merge, and final terminal task state satisfy acceptance criteria.

## Evidence
- .agentplane/tasks/202608041322-M26FS0/quality/objects/sha256/c362c8e4a3270cc827ba7989523220b39597274d4576c021d7e6678288b962ab.patch
- .agentplane/tasks/202608041322-M26FS0/README.md
- .agentplane/policy/dod.core.md
- .agentplane/tasks/202608041322-M26FS0/quality/objects/sha256/5237e6a69749423e3d7440fadf5b6e4fb3124283b34cdeb2a52ef091f90a43bc.json
- .agentplane/policy/dod.code.md
- .agentplane/policy/workflow.release.md

## Missing Tests
- Deterministic recorded execution of the focused route regression covering evidence-only README advancement and stale verification after a real implementation change.
- Deterministic recorded execution of the publish-workflow contract covering exact closure SHA validation, failed Core CI, failed check publication, and merge timeout or closure without merge.
- Recorded ci:contract and release:prepublish command results tied to evaluated SHA 26db675800b8d2cf3e6b7160a3c744d82620f232.
- Hosted post-merge verification for all three npm packages at 0.7.3, exact tag and GitHub Release SHA, clean install, postpublish audit, autonomous evidence-PR merge, and terminal.done routing after pulling main.

## Hidden Assumptions
- The narrative TESTER note accurately represents checks whose command-level records are absent from the frozen packet.
- The extensive qualification, replay, latency, baseline, artwork, and unrelated task-artifact changes were approved despite no such expansion appearing in the frozen task scope.
- A pre-merge evaluator pass would be sufficient even though acceptance criteria explicitly require post-merge and post-publish evidence.

## Residual Risks
- Separate or explicitly re-approve the material scope expansion, then freeze deterministic command-level evidence for Verify Steps 1–3 at the evaluated SHA and complete Verify Steps 4–5 after hosted merge and publication before requesting another evaluation.
