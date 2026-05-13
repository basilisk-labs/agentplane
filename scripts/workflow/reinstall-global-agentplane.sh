#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'USAGE'
Usage: scripts/reinstall-global-agentplane.sh

Builds local @agentplaneorg/core and agentplane runtime bundles, links both
packages into the global npm prefix from this checkout, and verifies that global
agentplane resolves local framework bits.
USAGE
  exit 0
fi

if [[ ! -f "package.json" || ! -d "packages/agentplane" || ! -d "packages/core" ]]; then
  echo "error: run this script from the repository root" >&2
  exit 2
fi

echo "==> Building local packages"
bun run --filter=@agentplaneorg/core build
bun run --filter=agentplane build:bundle

echo "==> Linking global framework packages from local source"
(
  cd packages/core
  npm link
)
(
  cd packages/agentplane
  npm link
)

echo "==> Verifying global install resolves local checkout artifacts"
node scripts/verify-global-agentplane-install.mjs

echo "==> Done"
agentplane --version
