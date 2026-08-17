# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 3 typed finding(s).

## Findings
- A disposable init readback showed the published mapping order as clock_skew_seconds, max_ttl_minutes, trusted_issuers within approval_receipts, with quoted actor and mode fields.
- The unique indented trusted_issuers: [] line is the narrow stable mutation point; replacing only that line preserves the published policy and avoids dependence on key ordering.
- The disposable inspection fixture was removed after readback.

## Evidence
- .agentplane/tasks/202608171853-X3FD5M/quality/objects/sha256/d0fbd45a5a85d6452119a7078b1aaf77575010ac9967528648a13407e4fb3986.patch

## Missing Tests
- Clean packaged-mixed-scope-lifecycle must pass after the order-independent trust-list replacement.

## Hidden Assumptions
- The previous implementation matched saveConfig output before workflow build normalized the published frontmatter.

## Residual Risks
- Rework required. Canonical workflow publication normalizes and sorts authority keys, so the fixture should replace the unique trusted_issuers empty-list line instead of matching the pre-publication field order.
