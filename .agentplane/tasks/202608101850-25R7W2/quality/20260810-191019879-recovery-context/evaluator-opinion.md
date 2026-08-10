# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 5 typed finding(s).

## Findings
- High: the approved contract requires ambiguous provider identity to remain blocked, but the patch accepts the existing branch lookup result without adding a uniqueness condition. The underlying branch lookup may return one record from multiple historical PRs for the same head branch and base, so a missing recorded PR number is not yet replaced by an exact unique identity.
- Medium: the new legacy-specific tests cover not-found, unavailable, OPEN, CLOSED, base mismatch, head mismatch, and recorded-number mismatch, but do not exercise multiple matching PR records, a legacy semantic post-merge tail, or missing legacy closure evidence.
- Medium: frozen verification contains the focused suites and typecheck, but no provider-backed dry-run evidence for the four P02 candidates required by the approved plan.
- Residual risk: A repository with reused task branch names or multiple historical PR records can authorize cleanup from a provider record that was selected by response order rather than unique identity.
- Residual risk: The four concrete P02 cleanup candidates remain unqualified against live provider truth.

## Evidence
- .agentplane/tasks/202608101850-25R7W2/quality/objects/sha256/bc56bbed36eeb09837f001bd7bc933c48de9361fbb17b5caa104fc5a8f3e8727.patch

## Missing Tests
- Reject two or more valid GitHub PR records for the same legacy task branch and base when metadata has no PR number.
- Reject a legacy branch whose local head gained a semantic post-merge commit after the provider head was recorded.
- Reject legacy metadata with no exact pre-merge closure marker on the base branch.

## Hidden Assumptions
- The implementation assumes an exact GitHub branch-and-base query identifies at most one historical PR.
- The implementation assumes existing modern-metadata drift tests fully exercise the new missing-number branch.

## Residual Risks
- Require a unique valid provider PR record for missing-number cleanup, add legacy-specific ambiguity and drift/closure regressions, rerun declared checks, then perform provider-backed dry runs for the four P02 candidates without deletion.
