const SEMVER_RE =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/u;

export function parseReleaseSemver(value) {
  const raw = String(value ?? "").trim();
  const match = SEMVER_RE.exec(raw);
  if (!match) return null;
  const prerelease = match[4] ? match[4].split(".") : [];
  if (prerelease.some((part) => /^\d+$/u.test(part) && part.length > 1 && part.startsWith("0"))) {
    return null;
  }
  return {
    raw,
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease,
    build: match[5] ? match[5].split(".") : [],
  };
}

function comparePrerelease(left, right) {
  if (left.length === 0 && right.length === 0) return 0;
  if (left.length === 0) return 1;
  if (right.length === 0) return -1;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    const leftPart = left[index];
    const rightPart = right[index];
    if (leftPart === undefined) return -1;
    if (rightPart === undefined) return 1;
    if (leftPart === rightPart) continue;
    const leftNumeric = /^\d+$/u.test(leftPart);
    const rightNumeric = /^\d+$/u.test(rightPart);
    if (leftNumeric && rightNumeric) return Number(leftPart) - Number(rightPart);
    if (leftNumeric) return -1;
    if (rightNumeric) return 1;
    return leftPart.localeCompare(rightPart);
  }
  return 0;
}

export function compareReleaseSemver(leftValue, rightValue) {
  const left = parseReleaseSemver(leftValue);
  const right = parseReleaseSemver(rightValue);
  if (!left || !right) {
    throw new Error(`Invalid SemVer comparison: ${leftValue} vs ${rightValue}`);
  }
  if (left.major !== right.major) return left.major - right.major;
  if (left.minor !== right.minor) return left.minor - right.minor;
  if (left.patch !== right.patch) return left.patch - right.patch;
  return comparePrerelease(left.prerelease, right.prerelease);
}

export function stableCoreVersion(value) {
  const parsed = parseReleaseSemver(value);
  if (!parsed) throw new Error(`Invalid SemVer: ${value}`);
  return `${parsed.major}.${parsed.minor}.${parsed.patch}`;
}

export function nextPatchBetaVersion(value) {
  const parsed = parseReleaseSemver(value);
  if (!parsed) throw new Error(`Invalid published SemVer: ${value}`);
  if (parsed.prerelease.length > 0) return null;
  return `${parsed.major}.${parsed.minor}.${parsed.patch + 1}-beta.1`;
}
