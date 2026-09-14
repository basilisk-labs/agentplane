#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
  cat <<'USAGE'
Usage: scripts/reinstall-global-agentplane.sh

Builds local @agentplaneorg/core and agentplane runtime bundles, installs
materialized package tarballs into the global npm prefix, and verifies that the
installed runtime was built from this checkout without linking back to it.
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

staging_dir="$(mktemp -d "${TMPDIR:-/tmp}/agentplane-global-install.XXXXXX")"
trap 'rm -rf "$staging_dir"' EXIT

package_tarball_name() {
  node -e 'const fs = require("node:fs"); const pkg = JSON.parse(fs.readFileSync(process.argv[1], "utf8")); process.stdout.write(`${pkg.name.replace(/^@/, "").replaceAll("/", "-")}-${pkg.version}.tgz`);' "$1/package.json"
}

echo "==> Packing immutable framework artifacts"
core_tarball="$(package_tarball_name "$PWD/packages/core")"
agentplane_tarball="$(package_tarball_name "$PWD/packages/agentplane")"
npm pack ./packages/core --pack-destination "$staging_dir" --silent >/dev/null
npm pack ./packages/agentplane --pack-destination "$staging_dir" --silent >/dev/null

echo "==> Installing materialized framework packages"
npm install --global "$staging_dir/$core_tarball" "$staging_dir/$agentplane_tarball"

echo "==> Verifying global install is complete and detached from the checkout"
node scripts/verify-global-agentplane-install.mjs

echo "==> Done"
agentplane --version
