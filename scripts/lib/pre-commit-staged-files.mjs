const PRETTIER_EXTS = [
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".json",
  ".yml",
  ".yaml",
  ".md",
  ".mdx",
];
const ESLINT_EXTS = [".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"];
const ESLINT_EXCLUDED_SUFFIXES = [".d.ts"];
const POLICY_MIRROR_PREFIX = ".agentplane/policy/";
const POLICY_CANONICAL_PREFIX = "packages/agentplane/assets/policy/";

function hasExtension(filePath, extensions) {
  return extensions.some((ext) => filePath.endsWith(ext));
}

export function prettierTargets(files) {
  return files.filter((file) => hasExtension(file, PRETTIER_EXTS));
}

export function eslintTargets(files) {
  return files.filter((file) => {
    if (!hasExtension(file, ESLINT_EXTS)) return false;
    return !ESLINT_EXCLUDED_SUFFIXES.some((suffix) => file.endsWith(suffix));
  });
}

export function policyMirrorOnlyTargets(files) {
  const staged = new Set(files);
  return files.filter((file) => {
    if (!file.startsWith(POLICY_MIRROR_PREFIX)) return false;
    const relative = file.slice(POLICY_MIRROR_PREFIX.length);
    if (!relative) return false;
    return !staged.has(`${POLICY_CANONICAL_PREFIX}${relative}`);
  });
}
