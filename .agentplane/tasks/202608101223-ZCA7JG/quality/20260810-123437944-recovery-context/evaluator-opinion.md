# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- matchesCurrentVerification normalizes every non-string implementation_sha, including an absent or malformed field, to null before the new null-target branch; a digest-valid record without the required field can therefore satisfy verification.

## Evidence
- .agentplane/tasks/202608101223-ZCA7JG/quality/objects/sha256/c07333c02c9947371214be2c6dd32f52c6056b73030f34687f9bf83f753bb607.patch

## Missing Tests
- Reject a metadata-only verification record whose implementation_sha field is absent.

## Hidden Assumptions
- The current matcher assumes null normalization is equivalent to validating the explicit nullable schema field.

## Residual Risks
- Require record.implementation_sha === null when evaluatedSha is null, and add the missing-field regression while preserving semantic-SHA behavior.
