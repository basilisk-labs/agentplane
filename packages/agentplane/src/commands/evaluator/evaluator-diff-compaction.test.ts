import { describe, expect, it } from "vitest";

import {
  ACTUAL_DIFF_FILE_LIMIT_BYTES,
  ACTUAL_DIFF_TOTAL_LIMIT_BYTES,
  compactActualDiff,
} from "./evaluator-diff-evidence.js";

const OLD = "a".repeat(40);
const NEW = "b".repeat(40);

function fileDiff(name: string, bodyBytes: number): string {
  const line = "+x\n";
  const hunks = line.repeat(Math.ceil(bodyBytes / line.length));
  return (
    `diff --git a/${name} b/${name}\n` +
    `index ${OLD}..${NEW} 100644\n` +
    `--- a/${name}\n+++ b/${name}\n@@ -0,0 +1 @@\n${hunks}`
  );
}

const reproduce = `git diff --full-index --find-renames ${OLD} ${NEW}`;

describe("evaluator actual-diff v2 compaction", () => {
  it("returns a small diff unchanged", () => {
    const diff = fileDiff("src/a.ts", 100) + fileDiff("src/b.ts", 200);
    expect(compactActualDiff(diff, { reproduce })).toBe(diff);
  });

  it("summarizes an oversized file diff and keeps its full-index header", () => {
    const small = fileDiff("src/a.ts", 100);
    const large = fileDiff("corpus.json", ACTUAL_DIFF_FILE_LIMIT_BYTES + 1);
    const compacted = compactActualDiff(small + large, { reproduce });
    expect(compacted.startsWith("# agentplane actual-diff v2: 1 file diff(s) summarized")).toBe(
      true,
    );
    expect(compacted).toContain(small);
    expect(compacted).toContain(`diff --git a/corpus.json b/corpus.json\nindex ${OLD}..${NEW}`);
    expect(compacted).toContain("file diff exceeds the per-file limit");
    expect(compacted).toContain(`${reproduce} -- "corpus.json"`);
    expect(compacted).not.toContain("+x\n+x\n+x\n+x\n+x\n+x\n+x\n+x\n+x\n+x\n".repeat(1000));
    expect(Buffer.byteLength(compacted)).toBeLessThan(4096);
  });

  it("summarizes later file diffs once the total limit is reached", () => {
    const perFile = ACTUAL_DIFF_FILE_LIMIT_BYTES - 1024;
    const count = Math.ceil(ACTUAL_DIFF_TOTAL_LIMIT_BYTES / perFile) + 2;
    const diff = Array.from({ length: count }, (_, i) => fileDiff(`f${i}.ts`, perFile)).join("");
    const compacted = compactActualDiff(diff, { reproduce });
    expect(compacted).toContain("total diff limit reached");
    expect(Buffer.byteLength(compacted)).toBeLessThanOrEqual(
      ACTUAL_DIFF_TOTAL_LIMIT_BYTES + count * 1024,
    );
    expect(compacted).toContain("diff --git a/f0.ts b/f0.ts");
  });

  it("is deterministic", () => {
    const diff = fileDiff("x.json", ACTUAL_DIFF_FILE_LIMIT_BYTES * 2);
    expect(compactActualDiff(diff, { reproduce })).toBe(compactActualDiff(diff, { reproduce }));
  });
});
