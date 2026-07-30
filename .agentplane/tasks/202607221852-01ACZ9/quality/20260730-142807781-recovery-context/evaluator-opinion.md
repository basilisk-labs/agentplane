# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The response token budget counts only excerpt content, while returned references, omission receipts, run metadata, blocker text, and serialization overhead are excluded; therefore a response can exceed the declared token limit while reporting itself within budget.

## Evidence
- .agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221852-01ACZ9/README.md

## Missing Tests
- Serialize a worst-case served response containing six long digest-bound references, excerpts, omissions, and run metadata; assert that the complete response remains within max_response_tokens.
- Verify budget enforcement when metadata and omission receipts consume enough tokens that another excerpt cannot safely be included.

## Hidden Assumptions
- Excerpt content is assumed to represent the complete response token cost.
- KnowledgeRef paths, digests, prepared-evidence metadata, omissions, and blocker text are assumed to have negligible token cost.

## Residual Risks
- Rework response budgeting to account for the complete serialized knowledge response, reserve deterministic overhead before adding references or excerpts, and add worst-case boundary tests covering metadata and omission receipts.
