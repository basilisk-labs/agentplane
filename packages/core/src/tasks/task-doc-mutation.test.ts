import { describe, expect, it } from "vitest";

import { buildDefaultTaskDoc } from "./task-doc-contract.js";
import { taskDocToSectionMap } from "./task-doc.js";
import { applyTaskDocMutations, resolveTaskDocUpdatedBy } from "./task-doc-mutation.js";

describe("task doc mutation", () => {
  it("resolves doc_updated_by from explicit author, comments, existing value, and owner", () => {
    expect(
      resolveTaskDocUpdatedBy(
        {
          comments: [{ author: "DOCS" }],
          doc_updated_by: "CODER",
          owner: "OWNER",
        },
        "REVIEWER",
      ),
    ).toBe("REVIEWER");

    expect(
      resolveTaskDocUpdatedBy({
        comments: [{ author: "DOCS" }],
        doc_updated_by: "CODER",
        owner: "OWNER",
      }),
    ).toBe("DOCS");

    expect(
      resolveTaskDocUpdatedBy({
        comments: [],
        doc_updated_by: "CODER",
        owner: "OWNER",
      }),
    ).toBe("CODER");

    expect(
      resolveTaskDocUpdatedBy({
        comments: [],
        doc_updated_by: "agentplane",
        owner: "OWNER",
      }),
    ).toBe("OWNER");
  });

  it("replaces docs through the canonical section renderer", () => {
    const replacement = "## Summary\none\n## Summary\ntwo\n";
    const result = applyTaskDocMutations(
      {
        comments: [],
        doc: buildDefaultTaskDoc(3),
        doc_updated_by: "CODER",
        doc_version: 3,
        owner: "CODER",
      },
      [{ kind: "replace-doc", doc: replacement }],
      { now: "2026-04-01T00:00:00.000Z" },
    );

    expect(result.doc).toBeTruthy();
    expect(result.sections).toEqual(taskDocToSectionMap(result.doc));
    expect(result.doc_updated_at).toBe("2026-04-01T00:00:00.000Z");
    expect(result.doc_updated_by).toBe("CODER");
    expect(result.touched).toBe(true);
  });

  it("applies set-section and touch-doc-meta in one mutation sequence", () => {
    const result = applyTaskDocMutations(
      {
        comments: [{ author: "DOCS" }],
        doc: buildDefaultTaskDoc(3),
        doc_updated_by: "CODER",
        doc_version: 3,
        owner: "CODER",
      },
      [
        {
          kind: "set-section",
          section: "Findings",
          text: "- shared contract extracted",
          requiredSections: [
            "Summary",
            "Scope",
            "Plan",
            "Verify Steps",
            "Verification",
            "Rollback Plan",
            "Findings",
          ],
        },
        {
          kind: "touch-doc-meta",
          updatedBy: "REVIEWER",
          version: 3,
        },
      ],
      { now: "2026-04-01T00:00:01.000Z" },
    );

    expect(result.sections.Findings).toBe("- shared contract extracted");
    expect(result.doc_version).toBe(3);
    expect(result.doc_updated_at).toBe("2026-04-01T00:00:01.000Z");
    expect(result.doc_updated_by).toBe("REVIEWER");
  });

  it("touches doc metadata without rewriting the body", () => {
    const doc = buildDefaultTaskDoc(3);
    const result = applyTaskDocMutations(
      {
        comments: [],
        doc,
        doc_updated_by: "agentplane",
        doc_version: 3,
        owner: "CODER",
      },
      [{ kind: "touch-doc-meta", version: 2 }],
      { now: "2026-04-01T00:00:02.000Z" },
    );

    expect(result.doc).toBe(doc);
    expect(result.doc_version).toBe(2);
    expect(result.doc_updated_by).toBe("CODER");
    expect(result.doc_updated_at).toBe("2026-04-01T00:00:02.000Z");
  });
});
