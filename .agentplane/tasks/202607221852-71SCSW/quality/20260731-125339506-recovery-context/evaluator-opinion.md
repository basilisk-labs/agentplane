# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The existing queued entry references an older task head; treating any present queue entry as terminal wait would strand the newly verified head.

## Evidence
- .agentplane/tasks/202607221852-71SCSW/quality/20260731-125339506-recovery-context/evaluator-diff.patch

## Missing Tests
- Stale queued head versus current provider/task head is not covered.

## Hidden Assumptions
- none recorded

## Residual Risks
- Wait only when queue branch, head SHA, base, and PR identity match current route truth; refresh an inactive stale entry with one typed enqueue and never overwrite claimed/handoff work.
