# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The declared terminal-routing regression was not implemented or executed. The patch tests preservation of verification metadata during evidence application, but does not close a branch_pr task, advance main with an evidence-only README commit, query next-action for terminal.done, or prove that a real implementation commit still makes verification stale.

## Evidence
- .agentplane/tasks/202608041322-M26FS0/quality/objects/sha256/21f9f0e7d834a7229ec6244e8178eaa2816c3b5379e206b6eeae77026ab2f5ca.patch
- .agentplane/tasks/202608041322-M26FS0/verification/20260804143934380-b5263d23d37a83fe.json
- .agentplane/tasks/202608041322-M26FS0/README.md

## Missing Tests
- An end-to-end route regression that closes a branch_pr task, commits only hosted release evidence to its README on main, and asserts next-action remains terminal.done.
- A negative companion case that advances main with a real implementation change and asserts verification becomes stale rather than terminal.done.

## Hidden Assumptions
- Preserving the existing verification frontmatter during hosted-evidence application is assumed to be sufficient for next-action routing to classify the later README-only commit as non-semantic.
- The broad local CI run is assumed to cover the exact route transition even though the recorded focused command names only release-task-evidence and publish-workflow contract tests.

## Residual Risks
- Add and record the exact terminal.done and stale-verification route regressions required by Verify Step 1, then rerun the declared verification gates.
