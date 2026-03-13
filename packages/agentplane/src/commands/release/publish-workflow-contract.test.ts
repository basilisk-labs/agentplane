import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const PUBLISH_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/publish.yml");

describe("publish workflow contract", () => {
  it("uses workflow_run from Core CI and downloads the release-ready artifact by run id", async () => {
    const workflow = await readFile(PUBLISH_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain("workflow_run:");
    expect(workflow).toContain("- Core CI");
    expect(workflow).toContain("github.event.workflow_run.conclusion == 'success'");
    expect(workflow).toContain("actions/download-artifact@v4");
    expect(workflow).toContain("name: release-ready");
    expect(workflow).toContain("run-id: ${{ needs.detect.outputs.release_ready_run_id }}");
    expect(workflow).toContain("node scripts/resolve-release-ready-source.mjs");
  });
});
