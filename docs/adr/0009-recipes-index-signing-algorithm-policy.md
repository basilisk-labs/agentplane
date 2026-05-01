# ADR 0009: Recipes Index Signing Algorithm Policy

## Status

Accepted

## Date

2026-04-21

## Context

The remote recipes index is verified before cached catalog data is trusted. Current signed index
payloads use an Ed25519 signature and a `key_id` that selects a trusted public key from the local
verifier keyring.

The signature envelope currently carries:

1. `schema_version`: signature envelope version.
2. `key_id`: public-key selector for the active verifier keyring.
3. `algorithm`: optional algorithm identifier; omitted means the legacy Ed25519 verifier.
4. `signature`: base64 signature over the exact index JSON text.

The envelope does not currently include `created_at`, expiry, or multiple signatures.

## Decision

Keep Ed25519 as the only implemented recipes index signing algorithm.

Route signature verification through an explicit verifier registry. The registry currently contains
only `ed25519`; unknown algorithms must fail before key lookup with a clear unsupported-algorithm
error that lists supported algorithms. This makes algorithm handling intentional without adding a
new cryptographic dependency.

Treat `key_id` as a key-selection label, not as an algorithm selector. Key rotation stays independent
from algorithm rotation: a new Ed25519 key can be added under a new `key_id` without changing the
algorithm policy.

## Key Custody And Rotation

The active production recipes index key is `2026-05`. The previous `2026-02` public key remains in
the verifier keyring only to validate older cached or archived indexes; it must not be used for new
catalog signatures.

Production private keys must not be committed, stored in `.env`, copied into release artifacts, or
kept in long-lived local filesystem paths. The only approved online storage location is the
`RECIPES_INDEX_SIGNING_PRIVATE_KEY` GitHub Actions secret in the `basilisk-labs/agentplane-recipes`
repository. Local private-key material may exist only as an ephemeral process value or temporary file
while setting that secret or performing emergency signing, and must be deleted immediately.

Rotation sequence:

1. Generate a new Ed25519 key pair and assign a new date-based `key_id`.
2. Store the private key as `RECIPES_INDEX_SIGNING_PRIVATE_KEY` in `agentplane-recipes`.
3. Commit the public key in `agentplane-recipes/keys/` and add it to AgentPlane's trusted recipes
   keyring.
4. Publish an AgentPlane CLI release that contains the new trust-root before switching the default
   remote catalog signature to the new `key_id`.
5. Re-sign `agentplane-recipes/index.json` with the new `key_id`, publish the catalog, and verify a
   clean `agentplane recipes list-remote --refresh --yes` without key overrides.
6. Keep the previous public key for one compatibility window, then remove it only in a later release
   after cached-index compatibility is no longer required.

Future signature envelope revisions should add `created_at` as signing metadata. Once present,
verifiers should reject malformed timestamps and may use them for freshness policy, but `created_at`
must not replace cryptographic verification or `key_id` lookup.

## Dual-Signature And PQC Policy

Post-quantum signing is not implemented in Agentplane today.

If a post-quantum algorithm is adopted later, it must be introduced as a dual-signature transition:

1. Add a new envelope version that can carry multiple signatures.
2. Keep Ed25519 verification required during the migration window.
3. Add the post-quantum verifier behind a named registry entry only after choosing and documenting a
   concrete algorithm, dependency, signature encoding, key format, and test-vector source.
4. Require both signatures while the migration is active, then remove Ed25519 only through a later
   ADR and release note.

No current code path should advertise PQC support until a production verifier exists and is covered
by tests.

## Consequences

### Positive

1. The existing Ed25519 behavior remains stable.
2. Unsupported algorithm values fail deterministically and explain the supported set.
3. Future algorithm rotation has a narrow extension point instead of implicit conditionals.

### Negative

1. The current signature envelope still lacks freshness metadata.
2. PQC migration remains policy-only until a concrete verifier dependency and envelope format are
   selected.

## Follow-up

Reopen this decision when one of these becomes true:

1. Recipe indexes need freshness enforcement based on `created_at` or expiry.
2. A second production signing algorithm is selected.
3. The signature envelope moves to a multi-signature schema.
