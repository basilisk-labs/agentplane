# Security MUST Rules

- MUST NOT commit secrets, credentials, or private keys.
- MUST NOT access outside-repo files without explicit user approval.
- MUST NOT perform network actions when approval is required and not granted.
- MUST NOT modify auth/crypto/security-critical codepaths without explicit scope approval.
- MUST report security-sensitive drift immediately and stop before mutation.
