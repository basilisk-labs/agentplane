#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'USAGE'
Usage: scripts/reinstall-global-agentplane.sh

Builds and packs local @agentplaneorg/core, @agentplaneorg/recipes, and
agentplane runtime bundles, installs immutable package copies into the global
npm prefix, and verifies that the installed runtime is not coupled to this
mutable checkout.
USAGE
  exit 0
fi

if [[ ! -f "package.json" || ! -d "packages/agentplane" || ! -d "packages/core" ]]; then
  echo "error: run this script from the repository root" >&2
  exit 2
fi

echo "==> Building local packages"
bun run --filter=@agentplaneorg/core build
bun run --filter=@agentplaneorg/recipes build
bun run --filter=agentplane build:bundle

PACK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/agentplane-global-install.XXXXXX")"
trap 'find "$PACK_DIR" -depth -delete 2>/dev/null || true' EXIT

echo "==> Packing framework packages"
CORE_VERSION="$(node -p "require('./packages/core/package.json').version")"
RECIPES_VERSION="$(node -p "require('./packages/recipes/package.json').version")"
AGENTPLANE_VERSION="$(node -p "require('./packages/agentplane/package.json').version")"
CORE_TARBALL="agentplaneorg-core-$CORE_VERSION.tgz"
RECIPES_TARBALL="agentplaneorg-recipes-$RECIPES_VERSION.tgz"
AGENTPLANE_TARBALL="agentplane-$AGENTPLANE_VERSION.tgz"
npm pack ./packages/core --pack-destination "$PACK_DIR" --silent >/dev/null
npm pack ./packages/recipes --pack-destination "$PACK_DIR" --silent >/dev/null
npm pack ./packages/agentplane --pack-destination "$PACK_DIR" --silent >/dev/null
[ -f "$PACK_DIR/$CORE_TARBALL" ]
[ -f "$PACK_DIR/$RECIPES_TARBALL" ]
[ -f "$PACK_DIR/$AGENTPLANE_TARBALL" ]

echo "==> Installing immutable global framework packages"
npm install --global \
  "$PACK_DIR/$CORE_TARBALL" \
  "$PACK_DIR/$RECIPES_TARBALL" \
  "$PACK_DIR/$AGENTPLANE_TARBALL"

echo "==> Verifying global install identity and checkout independence"
node scripts/verify-global-agentplane-install.mjs

echo "==> Done"
AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane --version
