#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'USAGE'
Usage: scripts/reinstall-global-agentplane.sh

Rebuilds local @agentplaneorg/core and agentplane packages,
then reinstalls global agentplane from the local checkout.
USAGE
  exit 0
fi

if [[ ! -f "package.json" || ! -d "packages/agentplane" || ! -d "packages/core" ]]; then
  echo "error: run this script from the repository root" >&2
  exit 2
fi

echo "==> Building local packages"
bun run --filter=@agentplaneorg/core build
bun run --filter=agentplane build

echo "==> Reinstalling global agentplane from local source"
npm uninstall -g agentplane >/dev/null 2>&1 || true
npm install -g ./packages/agentplane

echo "==> Done"
agentplane --version
