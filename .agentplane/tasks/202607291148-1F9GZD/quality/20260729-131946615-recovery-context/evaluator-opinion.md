# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- The sealing commit is not proven to descend from the packet's verified implementation SHA. The resolver verifies only that pinned evidence exists at current HEAD, then evaluates that HEAD; an unrelated or diverged HEAD can therefore carry a packet for another verified commit and become the reviewed target.
- Dependency evaluator closure accepts any referenced quality-report.json whose payload says pass, without proving that the report is the artifact represented by the leaf's current quality_review state or that its evaluated SHA matches the recorded leaf evaluation. A stale passing report can therefore substantiate a newer or different evaluator state.

## Evidence
- .agentplane/tasks/202607291148-1F9GZD/quality/20260729-131946615-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607291148-1F9GZD/README.md

## Missing Tests
- Reject a qualification evidence commit when packet.implementation_sha is not an ancestor of the sealing HEAD, including a same-repository divergent-branch case.
- Reject dependency closure when a stale passing quality report is referenced alongside a different current quality_review.evaluated_sha or quality-review episode.
- Accept the normal sealing-commit case only when the verified implementation SHA is an ancestor and every pinned artifact matches at the sealing commit.

## Hidden Assumptions
- A verification record's implementation_sha is assumed to be an ancestor of the later evidence-sealing HEAD.
- A passing quality-report.json found in quality_review.evidence_refs is assumed to represent the leaf's current evaluator state and evaluated SHA.
- Current HEAD is assumed to contain no unverified implementation changes beyond evidence sealing.

## Residual Risks
- Add an explicit ancestry check from packet.implementation_sha to the sealing HEAD, bind each dependency quality report to the leaf's current evaluated SHA and review metadata, and cover divergent-history and stale-report negative cases before rerunning focused evaluator tests and ci:contract.
